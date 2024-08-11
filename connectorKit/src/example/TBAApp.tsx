import { useState } from 'react';
import './App.css';
import { Contract, defaultProvider, RpcProvider } from 'starknet';
// import { ConnectedStarknetWindowObject } from 'get-starknet-core';
import {
  TokenboundConnector,
  TokenBoundModal,
  useTokenBoundModal,
} from '../index';

import { TBAABI } from './abis/abi';
import { ConnectedStarknetWindowObject } from 'get-starknet-core';
const contractAddress =
  '0x078630231fdd7406826aec40211263b7fa2533070cacf66ff7a729f7b1e16c59';

export const myProviderUrl = "https://starknet-sepolia.public.blastapi.io"; // Mainnet


function TBAApp() {
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject>();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState('');
  const [retrievedValue, setRetrievedValue] = useState('');

  const provider = new RpcProvider({
    nodeUrl: myProviderUrl,
  });

  const {
    isOpen,
    openModal,
    closeModal,
    value,
    selectedOption,
    handleChange,
    handleChangeInput,
    resetInputValues,
    handleWalletChange,
    walletSWO,
  } = useTokenBoundModal();

  const tokenbound = new TokenboundConnector({
    tokenboundAddress: value,
    walletSWO: walletSWO,
    provider: provider,
  });

  const connectTBA = async () => {
    const connection = await tokenbound.connect();
    closeModal();
    resetInputValues();
    if (connection && connection.isConnected) {
      setConnection(connection);
      setAccount(connection.account);
      setAddress(connection.selectedAddress);
    }
  };

  const disconnectTBA = async () => {
    await tokenbound.disconnect();
    setConnection(undefined);
    setAccount(undefined);
    setAddress('');
  };



  const lock = async () => {
    try {
      const contract = new Contract(TBAABI, contractAddress, account)
      console.log(account, "account")
      await contract.lock("78888888888");
      alert('locked');
    } catch (error) {
      console.log(error);
    }
  };

  const getOwner = async () => {

    try {
      const contract = new Contract(TBAABI, contractAddress, provider)
      const counter = await contract.owner();
      setRetrievedValue(counter.toString(16));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <header className="">
        {
          address && <p>
            <b>Address: {address ? address : ''}</b>
          </p>

        }
        <div className="card">
          <p>TBA Test &rarr;</p>
          <div className="cardForm">

            <input
              type="submit"
              className="button"
              value="Lock"
              onClick={lock}
            />
          </div>

          <hr />
          <div className="cardForm">
            <input
              type="submit"
              className="button"
              value="Get Owner"
              onClick={getOwner}
            />
            <p>{retrievedValue}</p>
          </div>
        </div>
      </header>

      {!connection ? (
        <button
          className="text-white bg-[#0C0C4F] text-center border-gray-500 outline-none p-2 mt-3"
          onClick={openModal}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className="text-white bg-[#0C0C4F] text-center border-gray-500 outline-none p-2 mt-3"
          onClick={disconnectTBA}
        >
          Disconnect
        </button>
      )}

      {isOpen && (
        <TokenBoundModal
          isOpen={isOpen}
          closeModal={closeModal}
          value={value}
          selectedOption={selectedOption}
          handleChange={handleChange}
          handleWalletChange={handleWalletChange}
          handleChangeInput={handleChangeInput}
          onConnect={connectTBA}
          walletSWO={walletSWO}
        />
      )}
    </div>
  );
}

export default TBAApp;
