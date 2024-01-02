import React, { useEffect, useState } from 'react';
import { num } from 'starknet';
import { TokenboundClient, Call } from 'starknet-tokenbound-sdk';
import { useAccount, useConnect } from '@starknet-react/core';

function Home() {
  const [tbaAccount, setTBAAccount] = useState('')
  const [deployStatus, setDeployStatus] = useState<boolean>()
  const [accountClassHash, setAccountClassHash] = useState<string>()
  const [owner, setOwner] = useState<string>("")
  const [nftOwner, setNftOwner] = useState<string>()
  const [nftOwnerId, setNftOwnerId] = useState<string>()

  const { connect, connectors } = useConnect()
  const { account } = useAccount()


  const registryAddress: string = "0x1b0ef7a47d9db8652f8a9010ecaf3e6537442bfab3afed13449b571fa1da37a"
  const implementationAddress: string = "0x011bc9fabead984d714cf82ec46ffa23f4558f27ae73561542fed9fa8fb510ae"

  const options = {
    account: account,
    registryAddress: registryAddress,
    implementationAddress: implementationAddress,
    jsonRPC: `https://starknet-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
  }
  // const tokenbound = new TokenboundClient(options)

  // replace with a sample NFT your account owns on mainnet
  const tokenContract = "0x042e7815d9e90b7ea53f4550f74dc12207ed6a0faaef57ba0dbf9a66f3762d82"
  const tokenId = "5866077281322167718"

  // url to starkscan
  const url = `https://starkscan.co/contract/${tbaAccount}`

  // // deploy account
  // const deployAccount = async () => {
  //   try {
  //     await tokenbound.createAccount({
  //       tokenContract: tokenContract,
  //       tokenId: tokenId,
  //       salt: "3000000000"
  //     })
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }

  // // execute
  // const execute = async() => {
  //   const call1: Call = {
  //     to: "0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300",
  //     selector: "0x7a44dde9fea32737a5cf3f9683b3235138654aa2d189f6fe44af37a61dc60d",
  //     calldata: []
  //   }
  //   const call2: Call = {
  //     to: "0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300",
  //     selector: "0x03a0b04fad2d45d81641f40c55ee13e701dacd4a99cbf4d6ed1e231d717b3e4e",
  //     calldata: []
  //   }
  //   try {
  //     await tokenbound.execute(tbaAccount as string, [call1, call2])
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   // get tokenbound account
  //   const getAccount = async () => {
  //     const account = await tokenbound.getAccount({
  //       tokenContract: tokenContract,
  //       tokenId: tokenId,
  //       salt: "3000000000"
  //     })
  //     setTBAAccount(num.toHex(account))
  //   }

  //   // get deployment status
  //   const getDeploymentStatus = async () => {
  //     const status = await tokenbound.checkAccountDeployment({
  //       tokenContract,
  //       tokenId,
  //       salt: "3000000000"
  //     })
  //     setDeployStatus(status?.deployed)
  //     setAccountClassHash(status?.classHash)
  //   }

  //   getAccount()
  //   getDeploymentStatus()
  // }, [tokenContract])

  // // get account owner
  // const getAccountOwner = async () => {
  //   const nftowner = await tokenbound.getOwner({
  //     tokenContract: tokenContract,
  //     tokenId: tokenId,
  //     tbaAddress: tbaAccount

  //   })
  //   setOwner(num.toHex(nftowner))
  // }

  // // get NFT owner
  // const getNFTOwner = async () => {
  //   const nftowner = await tokenbound.getOwnerNFT(tbaAccount as string)
  //   setNftOwner(num.toHex(nftowner[0]))
  //   setNftOwnerId(nftowner[1].toString())
  // }

  // // check if deploy status is true before getting owners
  // if(deployStatus) {
  //   getAccountOwner()
  //   getNFTOwner()
  // }

  return (
    <div className="App">
      <section className="App-header">
        <h1 className='my-2 text-gray-300'>Testing Tokenbound SDK</h1>
        {/* connect button */}
        <div>
          {
            connectors.map((connector) => (
              <button className='bg-blue-400 rounded-md px-2 mr-5 py-2' onClick={(() => connect({ connector }))}>
                Connect {connector.id}
              </button>
            ))
          }
        </div>
        <br />

        <p>NFT Contract: {tokenContract}</p>
        <p>Token ID: {tokenId}</p>
        <br />
        <a
          className="App-link"
          href={url}
          target="_blank"
        >
          <p>Tokenbound Account: {tbaAccount}</p>
        </a>
        <br />
        <p>Deployed: [Status: {deployStatus?.toString()}, ClassHash: {accountClassHash}]</p>
        <br />
        <p>Account Owner: {owner}</p>
        <br />
        <p>NFT Owner: [Contract: {nftOwner}, ID: {nftOwnerId} ]</p>
        <br />

        {/* <div>
          <button disabled={deployStatus} onClick={deployAccount} className='bg-blue-400 rounded-lg px-2 mr-5 py-2'>Deploy token</button>
          <button onClick={execute} className='bg-green-400 rounded-lg px-2 mr-5 py-2'>execute txn</button>
        </div>  */}
        <br />
      </section>
    </div>
  );
}

export default Home;