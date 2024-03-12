import { useState } from "react";
import "./Dapp.css";
import { TokenboundConnector } from "../connector/index";
import { Contract, RpcProvider } from "starknet";
import { TokenBoundModal } from "../../src/connector/index";
import { ConnectedStarknetWindowObject } from "get-starknet-core";
import { useTokenBoundModal } from "../../src/connector/hooks";

import { ABI } from "./abis/abi";
const contractAddress =
  "0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300";

function Dapp() {
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject>();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState("");
  const [retrievedValue, setRetrievedValue] = useState("");

  const {
    isOpen,
    openModal,
    closeModal,
    value,
    selectedOption,
    handleChange,
    handleChangeInput,
    resetInputValues,
  } = useTokenBoundModal();
  console.log('open',isOpen)

  const tokenbound = new TokenboundConnector({
    tokenboundAddress: value,
    parentAccountId: selectedOption,
  });

  const connector = async () => {
    const connection = await tokenbound.connect();
    console.log(connection);
    if (connection && connection.isConnected) {
      setConnection(connection);
      setAccount(connection.account);
      setAddress(connection.selectedAddress);
    }
  };

  const disconnector = async () => {
    await tokenbound.disconnect();
    setConnection(undefined);
    setAccount(undefined);
    setAddress("");
  };

  const increaseCounter = async () => {
    try {
      const contract = new Contract(ABI, contractAddress, account).typedv2(ABI);
      await contract.increment();
      alert("you successfully increased the counter");
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseCounter = async () => {
    try {
      const contract = new Contract(ABI, contractAddress, account).typedv2(ABI);
      await contract.decrement();
      alert("you sucessfully decreased the counter");
    } catch (error) {
      console.log(error);
    }
  };

  const getCounter = async () => {
    const provider = new RpcProvider({
      nodeUrl: "https://starknet-mainnet.public.blastapi.io",
    });
    try {
      const contract = new Contract(ABI, contractAddress, provider).typedv2(
        ABI
      );
      const counter = await contract.get_current_count();
      setRetrievedValue(counter.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const connectTBA = async () => {
    const result = await tokenbound.connect();
    console.log(result);
    console.log("connected:", await result.isConnected);

    if (result && (await result).isConnected) {
      setConnection(connection);
      closeModal();
      resetInputValues();
    }
  };

  return (
    <div className="">
      <header className="">
        {connection ? (
          <button className="button" onClick={disconnector}>
            Disconnect
          </button>
        ) : (
          <button className="button" onClick={connector}>
            Connect wallet
          </button>
        )}
        <p>{address ? address : ""}</p>

        <div className="card">
          <p>Increase/Decrease Counter &rarr;</p>
          <div className="cardForm">
            <input
              type="submit"
              className="button"
              value="Increase"
              onClick={increaseCounter}
            />
            <input
              type="submit"
              className="button"
              value="Decrease"
              onClick={decreaseCounter}
            />
          </div>

          <hr />
          <div className="cardForm">
            <input
              type="submit"
              className="button"
              value="Get Counter"
              onClick={getCounter}
            />
            <p>{retrievedValue}</p>
          </div>
        </div>
      </header>

      {connection ? (
        <button
          className="text-white bg-[#0C0C4F] text-center border-gray-500 outline-none p-2"
          onClick={openModal}
        >
          Open Modal
        </button>
      ) : (
        <button className="text-white bg-[#0C0C4F] text-center border-gray-500 outline-none p-2">
          Connected
        </button>
      )}

      {isOpen && (
        <TokenBoundModal
          isOpen={isOpen}
          closeModal={closeModal}
          value={value}
          selectedOption={selectedOption}
          handleChange={handleChange}
          handleChangeInput={handleChangeInput}
          onConnect={connectTBA}
        />
      )}
    </div>
  );
}

export default Dapp;
