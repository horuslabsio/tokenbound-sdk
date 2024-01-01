import React, { useEffect, useState } from 'react';
import './App.css';
import { num } from 'starknet';
import { TokenboundClient, WalletClient } from 'starknet-tokenbound-sdk';

function App() {
  const [account, setAccount] = useState('')
  const [deployStatus, setDeployStatus] = useState<boolean>()
  const [accountClassHash, setAccountClassHash] = useState<string>()
  const [owner, setOwner] = useState<string>("")
  const [nftOwner, setNftOwner] = useState<string>()
  const [nftOwnerId, setNftOwnerId] = useState<string>()
  const [lockStatus, setLockStatus] = useState<boolean>()
  const [timeUntilUnlocks, setTimeUntilUnlocks] = useState<number>()


  const walletClient: WalletClient = {
    address: "0x0617D13Db952a2965580ebAc9DF602debFa12d0eAFB7c1a79D9dA03321169286",
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
  const tokenId = "5866077281322167718"

  // url to starkscan
  const url = `https://starkscan.co/contract/${account}`

  // deploy account
  const deployAccount = async () => {
    try {
      await tokenbound.createAccount({
        tokenContract: tokenContract,
        tokenId: tokenId,
        salt: "3000000000"
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  // lock account
  const lockAccount = async() => {
    try{
      await tokenbound.lock({
        tbaAddress: account as string,
        duration_in_sec: 300
      })
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // get tokenbound account
    const getAccount = async () => {
      const account = await tokenbound.getAccount({
        tokenContract: tokenContract,
        tokenId: tokenId,
        salt: "3000000000"
      })
      setAccount(num.toHex(account))
    }

    // get deployment status
    const getDeploymentStatus = async () => {
      const status = await tokenbound.checkAccountDeployment({
        tokenContract,
        tokenId,
        salt: "3000000000"
      })
      setDeployStatus(status?.deployed)
      setAccountClassHash(status?.classHash)
    }

    // const getLockStatus = async() => {
    //   const lockStatus = await tokenbound.is_locked()
    //   console.log(lockStatus)
    //   setLockStatus(lockStatus.lock_status)
    //   setTimeUntilUnlocks(lockStatus.time_until_unlocks)
    // }

    getAccount()
    getDeploymentStatus()
    // getLockStatus()
  }, [tokenContract])

  // get account owner
  const getAccountOwner = async () => {
    const nftowner = await tokenbound.getOwner({
      tokenContract: tokenContract,
      tokenId: tokenId,
      tbaAddress: account

    })
    setOwner(num.toHex(nftowner))
  }

  // get NFT owner
  const getNFTOwner = async () => {
    const nftowner = await tokenbound.getOwnerNFT(account as string)
    setNftOwner(num.toHex(nftowner[0]))
    setNftOwnerId(nftowner[1].toString())
  }

  // check if deploy status is true before getting owners
  if(deployStatus) {
    getAccountOwner()
    getNFTOwner()
  }

  return (
    <div className="App">
      <section className="App-header">
        <h2 className='my-2 text-gray-300'>Testing Token bound SDK</h2>
        <p>NFT Contract: {tokenContract}</p>
        <p>Token ID: {tokenId}</p>
        <br />
        <a
          className="App-link"
          href={url}
          target="_blank"
        >
          <p>Tokenbound Account: {account}</p>
        </a>
        <br />
        <p>Deployed: [Status: {deployStatus?.toString()}, ClassHash: {accountClassHash}]</p>
        <br />
        <p>Account Owner: {owner}</p>
        <br />
        <p>NFT Owner: [Contract: {nftOwner}, ID: {nftOwnerId} ]</p>
        <br />
        <div>
        <button disabled={deployStatus} onClick={deployAccount} className='bg-blue-400 rounded-lg px-2 mr-5 py-2'>Deploy token</button>
        <button disabled={lockStatus} onClick={lockAccount} className='bg-red-700 rounded-lg px-2 py-2'>Lock Account</button>
        </div> 
      </section>
    </div>
  );
}

export default App;

// functions left: { execute, is_locked, transfer_erc20, transfer_nft}