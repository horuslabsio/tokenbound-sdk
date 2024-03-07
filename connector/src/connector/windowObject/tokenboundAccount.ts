import {
    Account,
    AccountInterface,
    ProviderInterface,
    Call,
    CallData,
    RawArgs
} from "starknet";

 export class TokenboundAccount extends Account implements AccountInterface {
    constructor(
        provider: ProviderInterface,
        public address: string,
        public parentAccount: AccountInterface
    ) {
        super(provider, address, parentAccount.signer);
    }

    override execute = async (
        calls: Call[]
    ) => {
        try{
            const transactions = Array.isArray(calls) ? calls : [calls];
            
            const txns = transactions.map((call) => ({
                contractAddress: call.contractAddress,
                entrypoint: call.entrypoint,
                calldata: Array.isArray(call.calldata) && '__compiled__' in call.calldata
                ? call.calldata
                : CallData.compile(call.calldata as RawArgs)
            }))

            let callToBeExecuted: Call = {
                contractAddress: this.address,
                entrypoint: '__execute__',
                calldata: CallData.compile({ txns })
            }

            return await this.parentAccount.execute(callToBeExecuted)
        }
        catch(error) {
            console.log(error);
            throw new Error("Error while executing a transaction");
        }
    }
}
