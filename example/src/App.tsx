import React, { useEffect, useState } from 'react';
import './App.css';
import { num } from 'starknet';
import { TokenboundClient, WalletClient } from 'starknet-tokenbound-sdk';

function App() {
  const [account, setAccount] = useState('')
  const [deployStatus, setDeployStatus] = useState<boolean>()
  const [accountClassHash, setAccountClassHash] = useState<string>()
  const [owner, setOwner] = useState<string>("")
  const [nftOwner, setNftOwner] = useState<string>("")


  const walletClient: WalletClient = {
    address: "0x05cebd1b2100bb326c77114233d9a670693d2e5ee5c2eac2809bc814f1247cf7",
    privateKey: process.env.REACT_APP_PRIVATE_KEY!,
  }
  const registryAddress: string = "0x1b0ef7a47d9db8652f8a9010ecaf3e6537442bfab3afed13449b571fa1da37a"
  const implementationAddress: string = "0x011bc9fabead984d714cf82ec46ffa23f4558f27ae73561542fed9fa8fb510ae"

  const options = {
    walletClient: walletClient,
    registryAddress: registryAddress,
    implementationAddress: implementationAddress,
    jsonRPC: `https://starknet-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`

  }
  const tokenbound = new TokenboundClient(options)

  // replace with a sample NFT your account owns on mainnet
  const tokenContract = "0x042e7815d9e90b7ea53f4550f74dc12207ed6a0faaef57ba0dbf9a66f3762d82"
  const tokenId = "64624414684603644991"


  // // get account
  useEffect(() => {
    const getAccount = async () => {
      const account = await tokenbound.getAccount({
        tokenContract: tokenContract,
        tokenId: tokenId,
        salt: "3000000000"
      })
      setAccount(num.toHex(account))
    }

    // getOwner
    const getOwnerTBA = async () => {
      const nftowner = await tokenbound.getOwner({
        tokenContract: tokenContract,
        tokenId: tokenId,
        tbaAddress: account

      })
      setOwner(num.toHex(nftowner))
    }
// did not work
    const getNFTOwner = async () => {
      const nftowner = await tokenbound.getOwnerNFT(account as string)
      setNftOwner(num.toHex(nftowner))
    }

    const getDeploymentStatus = async () => {
      const status = await tokenbound.checkAccountDeployment({
        tokenContract,
        tokenId,
        salt: "3000000000"
      })
      setDeployStatus(status?.deployed)
      setAccountClassHash(status?.classHash)
    }

    getAccount()
    getDeploymentStatus()
    getOwnerTBA()
  }, [tokenContract])

  // deploy account
  const deployAccount = async () => {
    try {
      const account = await tokenbound.createAccount({
        tokenContract: tokenContract,
        tokenId: tokenId,
        salt: "3000000000"
      })
    } catch (error) {
      console.log(error)
    }

  }




  return (
    <div className="App">
      <section className="App-header">
        <h2 className='my-2 text-gray-300'>Testing Token bound SDK</h2>
        <p>NFT Contract: {tokenContract}</p>
        <p>Token ID: {tokenId}</p>
        <p>Deployed Status: {deployStatus?.toString()}</p>
        <p>Deployed ClassHash: {accountClassHash}</p>
        <p><b>Tokenbound Account: </b></p>
        <a
          className="App-link"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Account:{account}</p>
          <p>Token Bound Owner: {owner}</p>
          {/* <p>NFT Owner: {nftOwner}</p> */}
        </a>
        <button disabled={deployStatus} onClick={deployAccount} className='bg-blue-400 rounded-lg px-2 py-2'>Deploy token</button>

      </section>
    </div>
  );
}

export default App;
