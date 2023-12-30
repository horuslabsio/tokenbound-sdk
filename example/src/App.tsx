import React, { useEffect, useState } from 'react';
import './App.css';
import { num } from 'starknet';
import { TokenboundClient, WalletClient } from 'starknet-tokenbound-sdk';

function App() {
  const [ account, setAccount ] = useState('')
  const [ deployStatus, setDeployStatus ] = useState<boolean>()
  const [ accountClassHash, setAccountClassHash ] = useState<string>()

  const walletClient: WalletClient = {
    address: "0x0617D13Db952a2965580ebAc9DF602debFa12d0eAFB7c1a79D9dA03321169286",
    privateKey: process.env.REACT_APP_PRIVATE_KEY!,
    jsonRPC: `https://starknet-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
  }
  const registryAddress: string = "0x1b0ef7a47d9db8652f8a9010ecaf3e6537442bfab3afed13449b571fa1da37a"
  const implementationAddress: string = "0x011bc9fabead984d714cf82ec46ffa23f4558f27ae73561542fed9fa8fb510ae"

  const tokenbound = new TokenboundClient({
    walletClient: walletClient,
    registryAddress: registryAddress,
    implementationAddress: implementationAddress
  })

  // replace with a sample NFT your account owns on mainnet
  const tokenContract = "0x07606CAC9053e9b8B573a4b0A0CE608880F64869e24B8a605210D7a85Bb6e5F1"
  const tokenId = "2915851"

  // // get account
  useEffect(() => {
    const getAccount = async() => {
      const account = await tokenbound.getAccount({
        tokenContract: tokenContract,
        tokenId: tokenId,
        salt: "3000000000"
      })
      setAccount(num.toHex(account))
    }

    const getDeploymentStatus = async() => {
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
  }, [tokenContract])

  // deploy account
  const deployAccount = async() => {
    const account = await tokenbound.createAccount({
      tokenContract: tokenContract,
      tokenId: tokenId,
      salt: "3000000000"
    })
    console.log(account)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>NFT Contract: { tokenContract }</p>
        <p>Token ID: { tokenId }</p>
        <p>Deployed Status: { deployStatus?.toString() }</p>
        <p>Deployed ClassHash: { accountClassHash }</p>
        <p><b>Tokenbound Account: </b></p>
        <a
          className="App-link"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>{ account }</p>
        </a>
      </header>
    </div>
  );
}

export default App;
