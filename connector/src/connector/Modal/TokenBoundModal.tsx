import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react';
import { IModal } from '../types/modal';

export default function TokenBoundModal({ closeModal, isOpen,value, selectedOption, handleChange, handleChangeInput, onConnect }: IModal) {
  const options = ['argentX', 'braavos'];
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
                  <div className='flex items-center justify-between mb-4'>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Connect with tokenbound
                  </Dialog.Title>

                  <div onClick={closeModal} className='text-black cursor-pointer'>X</div>
                  </div>
                  <div className="w-full">
                    <label className='text-black mb-2 block' htmlFor="tba-address">Token bound address</label>
                    <input
                      type="text"
                      placeholder="TBA ADDRESS"
                      id='tba-address'
                      value={value}
                      onChange={handleChangeInput}
                      className="w-full border border-gray-300 bg-white text-black rounded px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
                    />
                    <select
                    onChange={handleChange}
                    value={selectedOption}
                      className="w-full border border-gray-300 bg-white text-black rounded px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
                    >
                      <option value="id">Select parent wallet</option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button onClick={onConnect} className='w-full text-white bg-[#0C0C4F] border-gray-500 outline-none p-2'>Connect with tokenbound account</button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
