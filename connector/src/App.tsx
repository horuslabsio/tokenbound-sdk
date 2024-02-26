import { useState } from 'react'
import './App.css'
import { ConnectedStarknetWindowObject } from 'get-starknet-core'
import { TokenboundConnector } from './connector'

function App() {
    const [ connection, setConnection ] = useState<ConnectedStarknetWindowObject>()
    const [account, setAccount] = useState('')
    const [address, setAddress] = useState('')

    const tokenbound = new TokenboundConnector({
    tokenboundAddress: "0x3ab349247d8a1317cbb3b2d503fc50a6fd2748856a141c6379aea34b0f602f3", // replace with a TBA your account owns
    parentAccountId: "argentX"
    })

    const connector = async() => {
        const connection = await tokenbound.connect()
        console.log(connection)
        if(connection && connection.isConnected) {
            setConnection(connection)
            setAccount(connection.account)
            setAddress(connection.selectedAddress)
        }
    }

    console.log(account)

  return (
    <>
      <h1>Tokenbound Accounts</h1>
      <div className="card">
        <button onClick={() => connector()}>
          Connect
        </button>
        <p>Address: {connection ? 
            address : ""}</p>
      </div>
    </>
  )
}

export default App
