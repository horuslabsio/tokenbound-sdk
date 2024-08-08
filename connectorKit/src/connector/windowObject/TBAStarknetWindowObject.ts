import type {
  AccountChangeEventHandler,
  ConnectedStarknetWindowObject,
  StarknetWindowObject,
  WalletEvents,
} from 'get-starknet-core';

import { AccountInterface, ProviderInterface, RpcProvider } from 'starknet';

import { TokenboundAccount } from './tokenboundAccount';
import { mapChainToNodeUrl } from '../helpers/mapChainToNodeUrl';

export const userEventHandlers: WalletEvents[] = [];
export interface TokenboundStarknetWindowObject {
  id: string;
  icon: string;
  name: string;
  version: string;
}

export const getTokenboundStarknetWindowObject = (
  options: TokenboundStarknetWindowObject,
  tokenboundAddress: string,
  parentAccount: AccountInterface,
  provider?: ProviderInterface,
): StarknetWindowObject => {
  const nodeUrl = mapChainToNodeUrl('SN_MAIN');
  const defaultProvider = provider ?? new RpcProvider({ nodeUrl });

  const wallet: StarknetWindowObject = {
    ...options,
    isConnected: false,
    provider,

    async request() {
      throw new Error('not implemented');
    },

    async enable(ops) {
      if (ops?.starknetVersion !== 'v4') {
        throw Error('not implemented');
      }
      try {
        await updateStarknetWindowObject(
          wallet,
          defaultProvider,
          tokenboundAddress,
          parentAccount,
        );
        return [tokenboundAddress];
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error('Unknown error on enable wallet');
      }
    },

    async isPreauthorized() {
      throw new Error('not implemented');
    },

    on: (event, handleEvent) => {
      if (event === 'accountsChanged') {
        userEventHandlers.push({
          type: event,
          handler: handleEvent as AccountChangeEventHandler,
        });
      } else {
        throw new Error(`Unknown event: ${event}`);
      }
    },

    off: (event, handleEvent) => {
      if (event !== 'accountsChanged' && event !== 'networkChanged') {
        throw new Error(`Unknown event: ${event}`);
      }

      const eventIndex = userEventHandlers.findIndex(
        (userEvent) =>
          userEvent.type === event && userEvent.handler === handleEvent,
      );

      if (eventIndex >= 0) {
        userEventHandlers.splice(eventIndex, 1);
      }
    },
  };
  return wallet;
};

async function updateStarknetWindowObject(
  wallet: StarknetWindowObject,
  provider: ProviderInterface,
  tokenboundAddress: string,
  parentAccount: AccountInterface,
): Promise<ConnectedStarknetWindowObject> {
  const chainId = await provider.getChainId();

  const valuesToAssign: Pick<
    ConnectedStarknetWindowObject,
    | 'id'
    | 'name'
    | 'icon'
    | 'version'
    | 'isConnected'
    | 'chainId'
    | 'selectedAddress'
    | 'account'
    | 'provider'
  > = {
    id: 'TBA',
    name: 'Tokenbound Account',
    icon: 'https://tokenbound.org/_next/image?url=%2Ftb-mark.svg&w=96&q=75',
    version: '1.0.0',
    isConnected: true,
    chainId,
    selectedAddress: tokenboundAddress,
    account: new TokenboundAccount(provider, tokenboundAddress, parentAccount),
    provider,
  };

  return Object.assign(wallet, valuesToAssign);
}
