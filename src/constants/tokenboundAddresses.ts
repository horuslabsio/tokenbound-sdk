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
        ADDRESS: '0x2d25602551487c3f3354dd80d76d54383a243358',
        ABI: erc6551AccountAbiV2 as Abi,
      },
      REGISTRY: {
        ADDRESS: '0x02101dfB77FDE026414827Fdc604ddAF224F0921',
        ABI: erc6551RegistryAbiV2 as Abi,
      },
    },
    V3: {
      IMPLEMENTATION: {
        ADDRESS: '0x41C8f39463A868d3A88af00cd0fe7102F30E44eC',
        ABI: erc6551AccountV3ABI as Abi,
      },
      REGISTRY: {
        ADDRESS: '0x000000006551c19487814612e58FE06813775758',
        ABI: erc6551RegistryV3ABI as Abi,
      },
    },
  },
  
  SN_SEPOLIA: {
    V2: {
      IMPLEMENTATION: {
        ADDRESS: '0xYourSepoliaV2ImplementationAddress',
        ABI: erc6551AccountAbiV2 as Abi,
      },
      REGISTRY: {
        ADDRESS: '0xYourSepoliaV2RegistryAddress',
        ABI: erc6551RegistryAbiV2 as Abi,
      },
    },
    V3: {
      IMPLEMENTATION: {
        ADDRESS: '0xYourSepoliaV3ImplementationAddress',
        ABI: erc6551AccountV3ABI as Abi,
      },
      REGISTRY: {
        ADDRESS: '0xYourSepoliaV3RegistryAddress',
        ABI: erc6551RegistryV3ABI as Abi,
      },
    },
  },
};