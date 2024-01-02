import React from 'react';
import './App.css';
import StarknetProvider from "./components/StarknetProvider";
import Home from 'components/Home';

function App() {
  return (
    <StarknetProvider>
      < Home/>
    </StarknetProvider>
  );
}

export default App;