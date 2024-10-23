import erc6551AccountAbiV2 from "../abis/v2/account.abi.json"
import erc6551RegistryAbiV2 from "../abis/v2/registry.abi.json"
import erc6551AccountV3ABI from "../abis/v3/account.abi.json"
import erc6551RegistryV3ABI from "../abis/v3/registry.abi.json"
import { Abi } from "starknet"

type Standard6551Deployment = {
  ADDRESS: string;
  ABI: Abi;
};

type NetworkDeployment = {
  IMPLEMENTATION: Standard6551Deployment;
  REGISTRY: Standard6551Deployment;
};

type Standard6551Deployments = {
  [network: string]: {
    [version: string]: NetworkDeployment;
  };
};

export const ERC_6551_DEPLOYMENTS: Standard6551Deployments = {
  SN_MAIN: {
    V2: {
      IMPLEMENTATION: {
        ADDRESS: '0x45d67b8590561c9b54e14dd309c9f38c4e2c554dd59414021f9d079811621bd',
        ABI: erc6551AccountAbiV2 as Abi,
      },
      REGISTRY: {
        ADDRESS: '0x7f63abcad960f980c12d650b2cc4c27a8f63ee1f6eb36ea8286a946a2330c1b',
        ABI: erc6551RegistryAbiV2 as Abi,
      },
    },
    V3: {
      IMPLEMENTATION: {
        ADDRESS: '0x2389b82277263019260d42e6b7461d4112051a09047051ebd105b127d5a4dce',
        ABI: erc6551AccountV3ABI as Abi,
      },
      REGISTRY: {
        ADDRESS: '0x572a25dbc65462ca99f8f1ea906879a8de3abaeadd2fb935fdb59950c767516',
        ABI: erc6551RegistryV3ABI as Abi,
      },
    },
  },

  SN_SEPOLIA: {
    V2: {
      IMPLEMENTATION: {
        ADDRESS: '0x45d67b8590561c9b54e14dd309c9f38c4e2c554dd59414021f9d079811621bd',
        ABI: erc6551AccountAbiV2 as Abi,
      },
      REGISTRY: {
        ADDRESS: '0x4101d3fa033024654083dd982273a300cb019b8cb96dd829267a4daf59f7b7e',
        ABI: erc6551RegistryAbiV2 as Abi,
      },
    },
    V3: {
      IMPLEMENTATION: {
        ADDRESS: '0x29d2a1b11dd97289e18042502f11356133a2201dd19e716813fb01fbee9e9a4',
        ABI: erc6551AccountV3ABI as Abi,
      },
      REGISTRY: {
        ADDRESS: '0x23a6d289a1e5067d905e195056c322381a78a3bc9ab3b0480f542fad87cc580',
        ABI: erc6551RegistryV3ABI as Abi,
      },
    },
  },
};