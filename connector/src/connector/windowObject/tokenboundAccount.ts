import { 
    Signature,
    Account,
    AccountInterface,
    ProviderInterface,
    SignerInterface,
    Call,
    CallData,
    typedData
} from "starknet";

class UnimplementedSigner implements SignerInterface {
    async getPubKey(): Promise<string> {
        throw new Error("Method not implemented");
    }

    async signMessage(): Promise<Signature> {
        throw new Error("Method not implemented");
    }

    async signTransaction(): Promise<Signature> {
        throw new Error("Method not implemented");
    }

    async signDeclareTransaction(): Promise<Signature> {
        throw new Error("Method not implemented");
    }

    async signDeployAccountTransaction(): Promise<Signature> {
        throw new Error("Method not implemented");
    }
}

 export class TokenboundAccount extends Account implements AccountInterface {
    public signer = new UnimplementedSigner();

    constructor(
        provider: ProviderInterface,
        public address: string,
        public parentAccount: AccountInterface
    ) {
        super(provider, address, new UnimplementedSigner);
    }

    override execute = async (
        calls: Call[]
    ) => {
        try {
            let call: Call = {
                contractAddress: this.address,
                entrypoint: '__execute__',
                calldata: CallData.compile({
                    calls
                })
            }
            return await this.parentAccount.execute(call)
        }
        catch(error) {
            console.log(error)
            throw new Error("Error while executing a transaction");
        }
    }
}