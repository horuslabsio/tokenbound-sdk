import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import { TokenboundConnector } from "../src/connector/index"
import { ConnectedStarknetWindowObject } from 'get-starknet-core'

export default function MyModal({ closeModal, isOpen }: any) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [value, setValue] = useState<string>('')
  const options = ['argentX', 'braavos'];
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject>()

  const handleChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  const handleChangeInput = (e: any) => {
    setValue(e.target.value)
  }

  const tokenbound = new TokenboundConnector({
    tokenboundAddress: value,
    parentAccountId: selectedOption
  })

  const connectTBA = async () => {
    const result = await tokenbound.connect();
    console.log(result);
    console.log('connected:', await result.isConnected);
    
    
    if (result && (await result).isConnected) {
      setConnection(connection)
    }

  }

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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Connect with tokenbound
                  </Dialog.Title>

                  <div className="w-64">
                    <input
                      type="text"
                      value={value}
                      onChange={handleChangeInput}
                      placeholder="TBA ADDRESS"
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
                    />
                    <select
                      value={selectedOption}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select an option</option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button onClick={connectTBA} className='text-black border-gray-500'>Connect</button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
