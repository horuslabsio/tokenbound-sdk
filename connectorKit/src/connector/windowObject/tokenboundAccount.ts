import { WALLET_API } from '@starknet-io/types-js';
import {
  ProviderInterface,
  Call,
  CallData,
  RawArgs,
  WalletAccount,
} from 'starknet';

export class TokenboundAccount extends WalletAccount {
  constructor(
    provider: ProviderInterface,
    walletSWO: WALLET_API.StarknetWindowObject,
    public tokenboundAccountAddress: string,
    public walletAccount: WalletAccount,
  ) {
    super(provider, walletSWO);
  }

  override execute = async (calls: Call[]) => {
    try {
      const transactions = Array.isArray(calls) ? calls : [calls];
      const txns = transactions.map((call) => ({
        contractAddress: call.contractAddress,
        entrypoint: call.entrypoint,
        calldata:
          Array.isArray(call.calldata) && '__compiled__' in call.calldata
            ? call.calldata
            : CallData.compile(call.calldata as RawArgs),
      }));

      let callToBeExecuted: Call = {
        contractAddress: this.tokenboundAccountAddress,
        entrypoint: '__execute__',
        calldata: CallData.compile({ txns }),
      };



      console.log(this.walletAccount)

      return await this.walletAccount.execute(callToBeExecuted);
    } catch (error) {
      console.log(error);
      throw new Error('Error while executing a transaction');
    }
  };
}
