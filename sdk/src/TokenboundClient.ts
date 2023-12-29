import { AccountInterface, Contract, num, BigNumberish } from "starknet"
import { accountClient } from "./utils/account"
import { AccountStatus, CreateAccountOptions, GetAccountOptions, TokenboundClientOptions } from "./types/TokenboundClient"
import { getProvider } from "./utils/provider"
import { WalletClient } from "./types/walletClient"

import registryAbi from "@/abis/registry.abi.json"

class TokenboundClient {
    private account: AccountInterface
    private walletClient: WalletClient
    private registryAddress: string
    private implementationAddress: string
    public isInitialized: boolean = false

    constructor(options: TokenboundClientOptions) {
        const { walletClient, registryAddress, implementationAddress} = options
        
        if(!walletClient) {
            throw new Error('walletClient is required!')
        }

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
            const address: BigNumberish = await contract.get_account(
                this.implementationAddress,
                tokenContract,
                tokenId,
                salt
            )
            return address
        }
        catch(error) {
            throw error
        }
    }

    public async createAccount(params: CreateAccountOptions) {
        const { tokenContract, tokenId, salt } = params
        const contract = new Contract(registryAbi, this.registryAddress, this.account)

        try {
            await contract.create_account(
                this.implementationAddress,
                tokenContract,
                tokenId,
                salt ? salt : tokenId
            )

            let getAccountParams: GetAccountOptions = {
                tokenContract,
                tokenId,
                salt
            }
            return await this.getAccount(getAccountParams)
        }
        catch(error) {
            throw error
        }
    }

    public async checkAccountDeployment(params: GetAccountOptions) {
        const { tokenContract, tokenId, salt } = params
        const provider = getProvider(this.walletClient.jsonRPC)
        let getAccountParams: GetAccountOptions = {
            tokenContract,
            tokenId,
            salt
        }
        let address = await this.getAccount(getAccountParams)

        try {
            const classHash = await provider.getClassHashAt(address)
            if(classHash) {
                return { deployed: true, classHash }
            }
        }
        catch (error) {
            throw error
        }
    }
}

// pending methods (checkAccountDeployment, execute, isValidSigner, isLocked, getOwnerNFT, transferETH, transferERC20, transferNFT, signMessage)