import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IModal, ValidWallet } from '../connector/types/modal';
import { scanObjectForWallets } from '../connector/helpers/wallet';
import '../index.css';

function TokenBoundModal({
  isOpen,
  closeModal,
  value,
  walletSWO,
  handleWalletChange,
  handleChangeInput,
  onConnect,
}: IModal) {
  const [walletList, setWalletList] = useState<ValidWallet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await scanObjectForWallets(window);
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
                      className="text-lg font-medium   leading-6 text-gray-900"
                    >
                      Connect with Tokenbound Account
                    </Dialog.Title>

                    <div
                      onClick={closeModal}
                      className="text-black cursor-pointer"
                    >
                      X
                    </div>
                  </div>
                  <div className="w-full py-5">
                    <label
                      className="text-black text-sm mb-3 font-medium block"
                      htmlFor="tba-address"
                    >
                      TBA Address
                    </label>
                    <input
                      type="text"
                      placeholder="Your tokenbound account address?"
                      id="tba-address"
                      value={value}
                      onChange={handleChangeInput}
                      className="w-full border text-sm border-gray-300 bg-white text-black h-[50px] rounded-lg px-3 py-2 mb-1 focus:outline-none focus:border-blue-500"
                    />

                    <p className="text-black  py-3 font-medium text-sm">
                      Select Parent Account
                    </p>
                    <div className="space-y-4 pb-5">
                      {walletList.length > 0 &&
                        walletList.map((wallet: ValidWallet, index: number) => {
                          const iconW: string =
                            typeof wallet.wallet.icon == 'string'
                              ? wallet.wallet.icon
                              : wallet.wallet.icon.light;
                          return (
                            <div className="w-full  h-[50px]" key={index}>
                              <div
                                onClick={() =>
                                  handleWalletChange(wallet.wallet)
                                }
                                className={`${walletSWO?.id == wallet.wallet.id ? 'bg-[#0C0C4F] text-white' : 'bg-white'} flex items-center cursor-pointer h-full text-sm  gap-10 rounded-lg text-black border border-gray-300 w-full px-5 py-2 hover:text-white hover:bg-[#0C0C4F]`}
                              >
                                <img
                                  className="w-6 h-6"
                                  src={iconW}
                                  alt="img"
                                />
                                <p className="text-center font-medium">
                                  {wallet.wallet.name}{' '}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="py-5">
                    <button
                      onClick={onConnect}
                      className="w-full text-white bg-[#0C0C4F] rounded-xl h-[56px] border-gray-500 outline-none p-2"
                    >
                      Connect
                    </button>
                  </div>
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
