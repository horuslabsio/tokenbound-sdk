import React, { useEffect, useState } from "react";
import "./App.css";
import { num } from "starknet";
import {
  TokenboundClient,
  WalletClient,
  Call,
} from "starknet-tokenbound-sdk-v3";

function App() {
  
  const [account, setAccount] = useState("");
  const [deployStatus, setDeployStatus] = useState<boolean>();
  const [accountClassHash, setAccountClassHash] = useState<string>();
  const [owner, setOwner] = useState<string>("");
  const [nftOwner, setNftOwner] = useState<string>();
  const [nftOwnerId, setNftOwnerId] = useState<string>();
  const [lockStatus, setLockStatus] = useState<boolean>();
  const [timeUntilUnlocks, setTimeUntilUnlocks] = useState<number>();


  const walletClient: WalletClient = {
    address:
      "0x0617D13Db952a2965580ebAc9DF602debFa12d0eAFB7c1a79D9dA03321169286",
    privateKey: process.env.REACT_APP_PRIVATE_KEY!,
  };


  const registryAddress: string =
    "0x23a6d289a1e5067d905e195056c322381a78a3bc9ab3b0480f542fad87cc580";

  const implementationAddress: string =
    "0x011bc9fabead984d714cf82ec46ffa23f4558f27ae73561542fed9fa8fb510ae";

  const options = {
    walletClient: walletClient,
    registryAddress: registryAddress,
    implementationAddress: implementationAddress,
    jsonRPC: `https://starknet-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
  };
  const tokenbound = new TokenboundClient(options);

  // replace with a sample NFT your account owns on mainnet
  const tokenContract =
    "0x042e7815d9e90b7ea53f4550f74dc12207ed6a0faaef57ba0dbf9a66f3762d82";

  const tokenId = "5866077281322167718";

  // url to starkscan
  const url = `https://starkscan.co/contract/${account}`;

  // deploy account
  const deployAccount = async () => {
    try {
      await tokenbound.createAccount({
        tokenContract: tokenContract,
        tokenId: tokenId,
        salt: "3000000000",
        chain_id: "SN_SEPOLIA",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // execute
  const execute = async () => {
    const call1: Call = {
      to: "0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300",
      selector:
        "0x7a44dde9fea32737a5cf3f9683b3235138654aa2d189f6fe44af37a61dc60d",
      calldata: [],
    };
    const call2: Call = {
      to: "0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300",
      selector:
        "0x03a0b04fad2d45d81641f40c55ee13e701dacd4a99cbf4d6ed1e231d717b3e4e",
      calldata: [],
    };
    try {
      await tokenbound.execute(account as string, [call1, call2]);
    } catch (error) {
      console.log(error);
    }
  };

  // transfer erc20
  const transferERC20 = async () => {
    const ETH_CONTRACT =
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
    const recipient =
      "0x0538C514b0eCd0cF6446a39646618e495A190A8502416f3af4dd5Ce5dA8aCf22";
    try {
      await tokenbound.transferERC20({
        tbaAddress: account,
        contractAddress: ETH_CONTRACT,
        recipient,
        amount: "150000000000000",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // transfer nft
  const transferNFT = async () => {
    const NFT_CONTRACT =
      "0x042e7815d9e90b7ea53f4550f74dc12207ed6a0faaef57ba0dbf9a66f3762d82";
    const TOKEN_ID = "68478765892699379673";
    const recipient =
      "0x0617D13Db952a2965580ebAc9DF602debFa12d0eAFB7c1a79D9dA03321169286";
    try {
      await tokenbound.transferNFT({
        tbaAddress: account,
        contractAddress: NFT_CONTRACT,
        tokenId: TOKEN_ID,
        sender: account as string,
        recipient,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // get tokenbound account
    const getAccount = async () => {
      const account = await tokenbound.getAccount({
        tokenContract: tokenContract,
        tokenId: tokenId,
        salt: "3000000000",
        chain_id: "SN_SEPOLIA",
      });
      setAccount(num.toHex(account));
    };

    // get deployment status
    const getDeploymentStatus = async () => {
      const status = await tokenbound.checkAccountDeployment({
        tokenContract,
        tokenId,
        salt: "3000000000",
        chain_id: "SN_SEPOLIA",
      });
      setDeployStatus(status?.deployed);
      setAccountClassHash(status?.classHash);
    };

    getAccount();
    getDeploymentStatus();
  }, [tokenContract]);

  // get account owner
  const getAccountOwner = async () => {
    const nftowner = await tokenbound.getOwner({
      tokenContract: tokenContract,
      tokenId: tokenId,
      tbaAddress: account,
    });
    setOwner(num.toHex(nftowner));
  };

  // get NFT owner
  const getNFTOwner = async () => {
    const nftowner = await tokenbound.getOwnerNFT(account as string);
    setNftOwner(num.toHex(nftowner[0]));
    setNftOwnerId(nftowner[1].toString());
  };

  // check if deploy status is true before getting owners
  if (deployStatus) {
    getAccountOwner();
    getNFTOwner();
  }

  return (
    <div className="App">
      <section className="App-header">
        <h1 className="my-2 text-gray-300">Testing Token bound SDK</h1>
        <p>NFT Contract: {tokenContract}</p>
        <p>Token ID: {tokenId}</p>
        <br />
        <a className="App-link" href={url} target="_blank">
          <p>Tokenbound Account: {account}</p>
        </a>
        <br />
        <p>
          Deployed: [Status: {deployStatus?.toString()}, ClassHash:{" "}
          {accountClassHash}]
        </p>
        <br />
        <p>
          Locked Status: [Status: {lockStatus?.toString()}, Time until unlocks:{" "}
          {timeUntilUnlocks} secs]
        </p>
        <br />
        <p>Account Owner: {owner}</p>
        <br />
        <p>
          NFT Owner: [Contract: {nftOwner}, ID: {nftOwnerId} ]
        </p>
        <br />

        <div>
          <button
            disabled={deployStatus}
            onClick={deployAccount}
            className="bg-blue-400 rounded-lg px-2 mr-5 py-2"
          >
            Deploy token
          </button>
          <button
            onClick={execute}
            className="bg-green-400 rounded-lg px-2 mr-5 py-2"
          >
            execute txn
          </button>
          <button
            onClick={transferERC20}
            className="bg-blue-800 rounded-lg px-2 mr-5 py-2"
          >
            send ERC20
          </button>
          <button
            onClick={transferNFT}
            className="bg-yellow-500 rounded-lg px-2 py-2"
          >
            send NFT
          </button>
        </div>
        <br />
      </section>
    </div>
  );
}

export default App;
