import React, { useEffect, useState } from "react";
import "./App.css";
import { cairo, num } from "starknet";
import {
  TokenboundClient,
  WalletClient,
  Call,
  TBAChainID,
  TBAVersion
} from "starknet-tokenbound-sdk";
import FormatAddress from "./Address";

function App() {

  const [account, setAccount] = useState("");
  const [deployStatus, setDeployStatus] = useState<boolean>();
  const [accountClassHash, setAccountClassHash] = useState<string>();
  const [owner, setOwner] = useState<string>("");
  const [nftOwner, setNftOwner] = useState<string>();
  const [nftOwnerId, setNftOwnerId] = useState<string>();
  const [txHash, setTxHash] = useState<string>("");
  const [lockStatus, setLockStatus] = useState<boolean>();
  const [permissionStatus, setPermissionStatus] = useState<boolean | null>();
  const [timeUntilUnlocks, setTimeUntilUnlocks] = useState<string>();

  const walletClient: WalletClient = {
    address: "0x07da6cca38Afcf430ea53581F2eFD957bCeDfF798211309812181C555978DCC3",
    privateKey: process.env.REACT_APP_PRIVATE_KEY!,
  };

  const V2_SALT = "240000000000"

  const testPermissionedAddr: string = "0x05662997723d56add3da71a86105788cb29b4e4e55325c2cc61fb600ac975d80"

  const options = {
    walletClient: walletClient,
    chain_id: TBAChainID.sepolia,
    version: TBAVersion.V3,
    jsonRPC: `https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
  };
  const tokenbound = new TokenboundClient(options);

  const tokenContract = "0x004dca9ec1ed78ce5cddbbcec63d3620514ae66bc73a3942d48a011bad452ff";
  const tokenId = "90";
  const url = `https://sepolia.starkscan.co/contract/${account}`;


  const deployAccount = async () => {
    try {
      const result = await tokenbound.createAccount({
        tokenContract: tokenContract,
        tokenId: tokenId,
        salt: V2_SALT,
      });

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
        amount: "1000000000000000",
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

  const lockAccount = async () => {
    try {
      await tokenbound.lock({
        tbaAddress: account,
        lockUntill: 1728057939
      });
      alert("Account was locked successfully");
    } catch (error) {
      console.log(error, "lock");
    }
  };

  const upgradeAccount = async () => {
    try {
      await tokenbound.upgrade({
        newClassHash: "",
        tbaAddress: account
      });
      alert("Account was upgraded successfully");
    } catch (error) {
      console.log(error);
    }
  };


  const setPermissions = async () => {
    try {
      await tokenbound.setPermission({
        tbaAddress: account,
        permissionedAddresses: [testPermissionedAddr],
        permissions: [true]
      });
      alert("Permissions added successfully");
    } catch (error) {
      console.log(error);
    }
  };


 useEffect(() => {
 if(account && deployStatus){
  const getAccountOwner = async () => {
    const nftowner = await tokenbound.getOwner({
      tbaAddress: account,
    });
    setOwner(num.toHex(nftowner));
  };
  const getNFTOwner = async () => {
    const nftowner = await tokenbound.getOwnerNFT(account as string);
    setNftOwner(num.toHex(nftowner[0]));
    setNftOwnerId(nftowner[1].toString());
  };

  getAccountOwner()
  getNFTOwner()
 }
 }, [account, deployStatus])

  useEffect(() => {
    if (account && deployStatus) {
      const getLockStatus = async () => {
        const isLocked = await tokenbound.isLocked({
          tbaAddress: account,
        });
        setLockStatus(Boolean(isLocked[0]))
        setTimeUntilUnlocks(isLocked[1].toString())
      };
      const getAccountPermissions = async () => {
        const permission = await tokenbound.getPermission({
          tbaAddress: account,
          owner: owner,
          permissionedAddress: testPermissionedAddr
        });

        if (permission != null) {
          setPermissionStatus(permission)
        }
      }
      getAccountPermissions();
      getLockStatus();

    };
  }, [account, owner, deployStatus]);


  useEffect(() => {
    const getAccount = async () => {
      const account = await tokenbound.getAccount({
        tokenContract: tokenContract,
        tokenId: tokenId,
        salt: V2_SALT,
      });
      
      setAccount(num.toHexString(account));

      console.log(account, "account")
    };

    const getDeploymentStatus = async () => {
      const status = await tokenbound.checkAccountDeployment({
        tokenContract,
        tokenId,
        salt: V2_SALT,
      });

      setDeployStatus(status?.deployed);
      setAccountClassHash(status?.classHash);
    };

    getAccount();
    getDeploymentStatus();
  }, [tokenContract]);





  return (
    <div className="">
      <section className="App-header py-10">
        <h1 className="my-2 text-gray-300">Testing Token bound SDK</h1>
        <div className="space-y-4 py-10">
          <div className=" flex gap-2">
            <p className="text-[18px]" >NFT Contract:</p>
            <FormatAddress address={tokenContract} />

          </div>

          <p className="text-lg">Token ID: <span className="text-bold">{tokenId}</span></p>
          <div className="flex items-center gap-2"  >
            <p className="text-lg ">Tokenbound Account: </p>
            <a className="text-[#61dafb]" href={url} target="_blank"> <FormatAddress address={account} /></a>
          </div>
          <p className="text-lg">
            Deployed: [Status: {deployStatus?.toString()}]
          </p>
          <div className="flex items-center gap-2">
            <p className="text-lg"> ClassHash:</p>
            <FormatAddress address={accountClassHash} />
          </div>
          <p className="text-lg">
            Locked Status: [Status: {lockStatus?.toString()}, Time until unlocks:{" "}
            {timeUntilUnlocks} secs]
          </p>
          <p className="text-lg">
            Permission Status: [Status: {permissionStatus?.toString()}]

          </p>
          <div className="flex items-center gap-2">
            <p className="text-lg">Account Owner:</p>
            <FormatAddress address={owner} />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-lg">NFT Owner Contract:</p>
            <FormatAddress address={nftOwner} />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-lg">NFT Owner ID:</p>
            <FormatAddress address={nftOwnerId} />
          </div>


        </div>

        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={deployAccount}
            className="bg-blue-400 text-medium  rounded-lg px-2 mr-5 py-1"
          >
            Deploy
          </button>

          <button
            onClick={execute}
            className="bg-green-400 text-medium  rounded-lg px-2 mr-5 py-2"
          >
            execute txn
          </button>
          <button
            onClick={transferERC20}
            className="bg-blue-800 text-medium  rounded-lg px-2 mr-5 py-2"
          >
            send ERC20
          </button>

          <button
            onClick={transferNFT}
            className="bg-yellow-500 text-medium rounded-lg px-2 py-2"
          >
            send NFT
          </button>


          <button
            onClick={lockAccount}
            className="bg-yellow-500 text-medium rounded-lg px-2 py-2"
          >
            Lock
          </button>


          <button
            onClick={upgradeAccount}
            className="bg-orange-500 text-medium rounded-lg px-2 py-2"
          >
            Upgrade
          </button>


          <button
            onClick={setPermissions}
            className="bg-orange-500 text-medium rounded-lg px-2 py-2"
          >
            Set Permissions
          </button>

        </div>
      </section>
    </div>
  );
}

export default App;
