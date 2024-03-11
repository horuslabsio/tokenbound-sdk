import Dapp from "./example/Dapp"; // import the Dapp component
import { useState } from "react";
import { TokenBoundModal } from "../src/connector/index";
import { TokenboundConnector } from "../src/connector/index";
import { ConnectedStarknetWindowObject } from "get-starknet-core";
import {useTokenBoundModal} from '../src/connector/hooks'
function App() {
  const { isOpen, openModal, closeModal, value, selectedOption, handleChange, handleChangeInput,resetInputValues } = useTokenBoundModal();


  const [connection, setConnection] = useState<ConnectedStarknetWindowObject>();

  const tokenbound = new TokenboundConnector({
    tokenboundAddress: value,
    parentAccountId: selectedOption,
  });

  const connectTBA = async () => {
    const result = await tokenbound.connect();
    console.log(result);
    console.log("connected:", await result.isConnected);

    if (result && (await result).isConnected) {
      setConnection(connection);
      closeModal();
      resetInputValues()
    }
  };

  return (
    <>
    <div className="App">
      <Dapp />
      <button
        className="text-white bg-[#0C0C4F] text-center border-gray-500 outline-none p-2"
        onClick={openModal}
      >
        Open Modal
      </button>
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
    </>
    
  );
}

export default App;
