import { StarknetWindowObject, DisconnectOptions } from 'get-starknet-core';
import { AccountInterface, ProviderInterface } from 'starknet';

export interface ConnectedStarknetWindowObject extends StarknetWindowObject {
  isConnected: boolean;
  account: AccountInterface;
  provider: ProviderInterface;
  selectedAddress: string;
  chainId: string;
}
