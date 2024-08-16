import type { StarknetWindowObject } from 'get-starknet-core';
import type { Connector, ConnectorIcons } from './connector';
import { WALLET_API } from '@starknet-io/types-js';

export type StoreVersion = 'chrome' | 'firefox' | 'edge';

export type ModalWallet = {
  name: string;
  id: string;
  icon: ConnectorIcons;
  download?: string;
  subtitle?: string;
  title?: string;
  connector: Connector;
};

export type ModalResult = {
  connector: Connector;
  wallet?: StarknetWindowObject | null;
};

export type ValidWallet = {
  wallet: WALLET_API.StarknetWindowObject;
  isValid: boolean;
};

export type IModal = {
  isOpen: boolean;
  closeModal: () => void;
  value: string;
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onConnect: () => void;
  walletSWO: WALLET_API.StarknetWindowObject | null;
  handleWalletChange: (wallet: WALLET_API.StarknetWindowObject) => void;
};
