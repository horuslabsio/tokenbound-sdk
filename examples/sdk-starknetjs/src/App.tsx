import React, { useEffect, useState } from "react";
import "./App.css";
import { num } from "starknet";
import {
  TokenboundClient,
  WalletClient,
  Call,
  TBAChainID,
  TBAVersion
} from "starknet-tokenbound-sdk-v3";

function App() {

  const [account, setAccount] = useState("");
  const [deployStatus, setDeployStatus] = useState<boolean>();
  const [accountClassHash, setAccountClassHash] = useState<string>();
  const [owner, setOwner] = useState<string>("");
  const [nftOwner, setNftOwner] = useState<string>();
  const [nftOwnerId, setNftOwnerId] = useState<string>();
  const [txHash, setTxHash] = useState<string>("");
  const [lockStatus, setLockStatus] = useState<boolean>();
  const [timeUntilUnlocks, setTimeUntilUnlocks] = useState<number>();

  const walletClient: WalletClient = {
    address:
      "0x05662997723d56add3da71a86105788cb29b4e4e55325c2cc61fb600ac975d80",
    privateKey: process.env.REACT_APP_PRIVATE_KEY!,
  };

  const registryAddress: string =
    "0x23a6d289a1e5067d905e195056c322381a78a3bc9ab3b0480f542fad87cc580";

  const implementationAddress: string =
    "0x29d2a1b11dd97289e18042502f11356133a2201dd19e716813fb01fbee9e9a4";

  const options = {
    walletClient: walletClient,
    registryAddress: registryAddress,
    implementationAddress: implementationAddress,
    chain_id: TBAChainID.sepolia,
    version: TBAVersion.V3,
    jsonRPC: `https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
  };
  const tokenbound = new TokenboundClient(options);

  //  replace with a sample NFT your account owns on seepolia
  const tokenContract =
    "0x0604ad6c09792f7bed48433d72dede4e0338c777332722930fda8aa7e8633dce";
  const tokenId = "4";


  const url = `https://sepolia.starkscan.co/contract/${account}`;

  const deployAccount = async () => {
    try {
      const result = await tokenbound.createAccount({
        tokenContract: tokenContract,
        tokenId: tokenId,
        salt: "4000000000",
      });

      console.log(result)
      setTxHash(result.transaction_hash.toString());
      setAccount(result.account);
      alert("Account deployed successfully");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

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

  const transferERC20 = async () => {
    const ETH_CONTRACT =
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

    const recipient =
      "0x07da6cca38Afcf430ea53581F2eFD957bCeDfF798211309812181C555978DCC3";

    try {
      await tokenbound.transferERC20({
        tbaAddress: account,
        contractAddress: ETH_CONTRACT,
        recipient,
        amount: "150000000000000",
      });

      alert("Transfer was successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const transferNFT = async () => {
    const NFT_CONTRACT =
      "0x0604ad6c09792f7bed48433d72dede4e0338c777332722930fda8aa7e8633dce";

    const TOKEN_ID = "4";

    const recipient =
      "0x05662997723d56add3da71a86105788cb29b4e4e55325c2cc61fb600ac975d80";

    try {
      await tokenbound.transferNFT({
        tbaAddress: account,
        contractAddress: NFT_CONTRACT,
        tokenId: TOKEN_ID,
        sender: account as string,
        recipient,
      });

      alert("Transfer was successfully");
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
      });

      setAccount(num.toHex(account));
    };



    // get deployment status
    const getDeploymentStatus = async () => {
      const status = await tokenbound.checkAccountDeployment({
        tokenContract,
        tokenId,
        salt: "4000000000",
      });


      setDeployStatus(status?.deployed);
      setAccountClassHash(status?.classHash);
    };



    getAccount();
    getDeploymentStatus();
  }, [tokenContract]);

  const getAccountOwner = async () => {
    const nftowner = await tokenbound.getOwner({
      tokenContract: tokenContract,
      tokenId: tokenId,
      tbaAddress: account,
    });
    setOwner(num.toHex(nftowner));
  };

  const getNFTOwner = async () => {
    const nftowner = await tokenbound.getOwnerNFT(account as string);
    setNftOwner(num.toHex(nftowner[0]));
    setNftOwnerId(nftowner[1].toString());
  };





  useEffect(() => {
    const getAccountStatus = async () => {
      const isLocked = await tokenbound.isLocked({
        tbaAddress: account,
      });
      console.log(isLocked, "isLocled")
    };

    getAccountStatus();
  }, [tokenContract]);


  if (deployStatus) {
    getAccountOwner();
    getNFTOwner();
  }

  return (
    <div className="">
      <section className="App-header py-10">
        <h1 className="my-2 text-gray-300">Testing Token bound SDK</h1>
        <p className="text-[18px]">NFT Contract: <span className="text-[20px]">{tokenContract}</span></p>
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

        <div className="grid grid-cols-4 gap-4">

          <button
            onClick={deployAccount}
            className="bg-blue-400 text-sm rounded-lg px-2 mr-5 py-1"
          >
            Deploy
          </button>

          <button
            onClick={execute}
            className="bg-green-400 text-sm rounded-lg px-2 mr-5 py-2"
          >
            execute txn
          </button>
          <button
            onClick={transferERC20}
            className="bg-blue-800 text-sm rounded-lg px-2 mr-5 py-2"
          >
            send ERC20
          </button>
          <button
            onClick={transferNFT}
            className="bg-yellow-500 text-sm rounded-lg px-2 py-2"
          >
            send NFT
          </button>


          <button
            onClick={() => { }}
            className="bg-blue-400 text-sm rounded-lg px-2 mr-5 py-2"
          >
            Lock
          </button>


          <button
            onClick={() => { }}
            className="bg-blue-400 text-sm rounded-lg px-2 mr-5 py-2"
          >
            Set Permissions
          </button>


          <button
            onClick={() => { }}
            className="bg-blue-400 text-sm rounded-lg px-2 mr-5 py-2"
          >
            Get Permission
          </button>

          <button
            onClick={() => { }}
            className="bg-blue-400 text-sm rounded-lg px-2 mr-5 py-2"
          >
            Upgrade
          </button>
        </div>
        <br />
      </section>
    </div>
  );
}

export default App;
