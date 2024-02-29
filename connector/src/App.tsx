import { useState } from 'react'
import './App.css'
import { ConnectedStarknetWindowObject } from 'get-starknet-core'
import { TokenboundConnector } from './connector'
import Modal from "./Modal"

function App() {
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject>()
  const [account, setAccount] = useState('')
  const [address, setAddress] = useState('')

  const tokenbound = new TokenboundConnector({
    tokenboundAddress: "0x3ab349247d8a1317cbb3b2d503fc50a6fd2748856a141c6379aea34b0f602f3", // replace with a TBA your account owns
    parentAccountId: "argentX"
  })

  const connector = async () => {
    const connection = await tokenbound.connect()
    console.log(connection)
    if (connection && connection.isConnected) {
      setConnection(connection)
      setAccount(connection.account)
      setAddress(connection.selectedAddress)
    }
  }

  let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <h1>Tokenbound Accounts</h1>
      <div className="card">
        {/* <button>
          Connect
        </button> */}

        <div className="fixed inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
              Connect with TBA
          </button>
        </div>
        {/* <p className='text-red-500'>Address: {connection ?
          address : ""}</p> */}

        <Modal isOpen={isOpen} closeModal={closeModal} />
      </div>
    </>
  )
}

export default App
