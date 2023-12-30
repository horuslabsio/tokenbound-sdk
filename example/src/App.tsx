import React from 'react';
import './App.css';
import { TokenboundClient, TokenboundClientOptions, WalletClient } from 'starknet-tokenbound-sdk'

function App() {
  const walletClient: WalletClient = {
    address: "0x0617D13Db952a2965580ebAc9DF602debFa12d0eAFB7c1a79D9dA03321169286",
    privateKey: process.env.REACT_APP_PRIVATE_KEY!,
    jsonRPC: `https://starknet-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
  }
  
  const registryAddress: string = "0x1b0ef7a47d9db8652f8a9010ecaf3e6537442bfab3afed13449b571fa1da37a"
  const implementationAddress: string = "0x011bc9fabead984d714cf82ec46ffa23f4558f27ae73561542fed9fa8fb510ae"

  const options: TokenboundClientOptions = {
    walletClient,
    registryAddress,
    implementationAddress
  }
  const tokenbound = new TokenboundClient(options)


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
