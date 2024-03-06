import { useState } from 'react';
import './Dapp.css';
import { TokenboundConnector } from '../connector'
import { Contract, RpcProvider } from 'starknet'
import { ConnectedStarknetWindowObject } from 'get-starknet-core'

import contractAbi from './abis/abi.json'
const contractAddress = "0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300"

function Dapp() {
  const [ connection, setConnection ] = useState<ConnectedStarknetWindowObject>()
  const [account, setAccount] = useState()
  const [address, setAddress] = useState('')
  const [retrievedValue, setRetrievedValue] = useState('')

  const tokenbound = new TokenboundConnector({
      tokenboundAddress: "0x3ab349247d8a1317cbb3b2d503fc50a6fd2748856a141c6379aea34b0f602f3",
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

  const disconnector = async() => {
    await tokenbound.disconnect()
    setConnection(undefined)
    setAccount(undefined)
    setAddress('')
  }

  const increaseCounter = async() => {
    try {
      const contract = new Contract(contractAbi, contractAddress, account)
      await contract.increment()
      alert("you successfully increased the counter")
    }
    catch(error) {
      console.log(error)
    }
  }

  const decreaseCounter = async() => {
    try {
      const contract = new Contract(contractAbi, contractAddress, account)
      await contract.decrement()
      alert("you sucessfully decreased the counter")
    }
    catch(error) {
      console.log(error)
    }
  }

  const getCounter = async() => {
    const provider = new RpcProvider({ nodeUrl: "https://starknet-mainnet.public.blastapi.io" })
    try {
      const contract = new Contract(contractAbi, contractAddress, provider)
      const counter = await contract.get_current_count()
      setRetrievedValue(counter.toString())
    }
    catch(error) {
      console.log(error)
    }
  } 

  return (
    <div className="App">
      <header className="App-header">
          {
            connection ? 
              <button className="button" onClick={disconnector}>Disconnect</button>
            :
              <button className="button" onClick={connector}>Connect wallet</button>
            }
        <p>{address ? address : ''}</p>

        <div className="card">
          <p>Increase/Decrease Counter &rarr;</p>
          <div className="cardForm">
            <input type="submit" className="button" value="Increase" onClick={increaseCounter} />
            <input type="submit" className="button" value="Decrease" onClick={decreaseCounter} />
          </div>

          <hr />
          <div className="cardForm">
            <input type="submit" className="button" value="Get Counter" onClick={getCounter} />
            <p>{retrievedValue}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Dapp;
