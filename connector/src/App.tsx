import Dapp from "./example/Dapp"; // import the Dapp component
import { useState } from "react";
import { TokenBoundModal } from "../src/connector/index";
import { TokenboundConnector } from "../src/connector/index";
import { ConnectedStarknetWindowObject } from "get-starknet-core";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleChangeInput = (event: any) => {
    setValue(event.target.value);
  };
  const closeModal = () => {
    setIsOpen(!isOpen);
  };

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
    }
  };

  return (
    <>
    <div className="App">
      <Dapp />
      <button
        className="text-white bg-[#0C0C4F] text-center border-gray-500 outline-none p-2"
        onClick={closeModal}
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
