import { AccountInterface, Contract, num } from "starknet"
import { accountClient } from "./utils/account"
import { GetAccountOptions, TokenboundClientOptions } from "./types/TokenboundClient"
import { getProvider } from "./utils/provider"
import { WalletClient } from "./types/walletClient"

import registryAbi from "@/abis/registry.abi.json"

class TokenboundClient {
    private chainId: string
    private account: AccountInterface
    private walletClient: WalletClient
    private registryAddress: string
    private implementationAddress: string
    public isInitialized: boolean = false

    constructor(options: TokenboundClientOptions) {
        const { chainId, walletClient, registryAddress, implementationAddress} = options
        
        if(!chainId) {
            throw new Error('chain ID required!')
        }
        if(!walletClient) {
            throw new Error('walletClient is required!')
        }

        this.chainId = chainId
        this.account = accountClient(walletClient)
        this.walletClient = walletClient
        this.registryAddress = registryAddress
        this.implementationAddress = implementationAddress
    }

    public async getAccount(params: GetAccountOptions) {
        const { tokenContract, tokenId, salt } = params
        const provider = getProvider(this.walletClient.jsonRPC)
        const contract = new Contract(registryAbi, this.registryAddress, provider)

        try{
            const accountAddress = await contract.get_account(
                this.implementationAddress,
                tokenContract,
                tokenId,
                salt
            )
            return(num.toHex(accountAddress))
        }
        catch(error) {
            throw error
        }
    }
}