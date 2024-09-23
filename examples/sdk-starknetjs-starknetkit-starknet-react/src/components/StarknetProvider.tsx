import React from "react";
import { mainnet } from "@starknet-react/chains";
import { StarknetConfig, publicProvider, useInjectedConnectors, argent, braavos, starkscan } from "@starknet-react/core";

function StarknetProvider({ children }: any) {
    const { connectors: injected } = useInjectedConnectors({
      recommended: [argent(), braavos()],
      includeRecommended: 'always',
    })
  
    const connectors = [
      ...injected,
    ]
  
    return (
      <StarknetConfig
        connectors={connectors}
        chains={[mainnet]}
        provider={publicProvider()}
        explorer={starkscan}
        autoConnect
      >
        {children}
      </StarknetConfig>
    )
  }

  export default StarknetProvider;