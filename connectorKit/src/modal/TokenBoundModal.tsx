import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IModal, ValidWallet } from '../connector/types/modal';
import { scanObjectForWallets } from '../connector/helpers/wallet';
import {isWalletObj} from "get-starknet-core";
import '../index.css';

function TokenBoundModal({
  isOpen,
  closeModal,
  value,
  walletSWO,
  selectedOption,
  handleChange,
  handleWalletChange,
  handleChangeInput,
  onConnect,
}: IModal) {
	
  const [walletList, setWalletList] = useState<ValidWallet[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await scanObjectForWallets(window, isWalletObj);
      return res;
    };
    fetchData().then((wallets) => setWalletList(wallets));
    return () => {};
  }, []);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Connect with tokenbound
                    </Dialog.Title>

                    <div
                      onClick={closeModal}
                      className="text-black cursor-pointer"
                    >
                      X
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      className="text-black mb-2 block"
                      htmlFor="tba-address"
                    >
                      Token bound address
                    </label>
                    <input
                      type="text"
                      placeholder="TBA ADDRESS"
                      id="tba-address"
                      value={value}
                      onChange={handleChangeInput}
                      className="w-full border border-gray-300 bg-white text-black rounded px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
                    />

                    <p className="text-black py-3 font-bold text-sm">
                      Connect to parent wallet
                    </p>
                    <div className="space-y-4 pb-5">
                      {walletList.length > 0 &&
                        walletList.map((wallet: ValidWallet, index: number) => {
                          const iconW: string =
                            typeof wallet.wallet.icon == 'string'
                              ? wallet.wallet.icon
                              : wallet.wallet.icon.light;
                          return (
                            <div className="w-full" key={index}>
                              <button
                                onClick={() =>
                                  handleWalletChange(wallet.wallet)
                                }
                                className="flex items-center gap-5 rounded-lg bg-white text-black border border-gray-700 w-full px-5 py-2"
                              >
                                <img
                                  className="w-5 h-5"
                                  src={iconW}
                                  alt="img"
                                />
                                {wallet.wallet.name} {wallet.wallet.version}
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <button
                    onClick={onConnect}
                    className="w-full text-white bg-[#0C0C4F] border-gray-500 outline-none p-2"
                  >
                    Connect with tokenbound account
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default TokenBoundModal;
