import { AccountInterface, Contract, BigNumberish, CallData } from "starknet"
import { accountClient } from "./utils/account"
import { LockOptions, Call, CreateAccountOptions, GetAccountOptions, TokenboundClientOptions } from "./types/TokenboundClient"
import { getProvider } from "./utils/provider"

import registryAbi from "./abis/registry.abi.json"
import accountAbi from "./abis/account.abi.json"

export class TokenboundClient {
    private account: AccountInterface
    private jsonRPC: string
    private registryAddress: string
    private implementationAddress: string
    public isInitialized: boolean = false

    constructor(options: TokenboundClientOptions) {
        const { walletClient, account, jsonRPC, registryAddress, implementationAddress} = options
        
        if(account && walletClient) {
            throw new Error('only one of `account` or `walletClient` is required!')
        }

        account ? this.account = account : this.account = accountClient(jsonRPC, walletClient)

        this.jsonRPC = jsonRPC
        this.registryAddress = registryAddress
        this.implementationAddress = implementationAddress
    }

    public async getAccount(params: GetAccountOptions) {
        const { tokenContract, tokenId, salt } = params
        const provider = getProvider(this.jsonRPC)
        const contract = new Contract(registryAbi, this.registryAddress, provider)

        try{
            const address: BigNumberish = await contract.get_account(
                this.implementationAddress,
                tokenContract,
                tokenId,
                salt ? salt : tokenId
            )
            return address
        }
        catch (error) {
            throw error
        }
    }

    public async createAccount(params: CreateAccountOptions) {
        const { tokenContract, tokenId, salt } = params
        const contract = new Contract(registryAbi, this.registryAddress, this.account)

        let salt_arg = salt ? salt : tokenId
        try {
            await contract.create_account(
                this.implementationAddress,
                tokenContract,
                tokenId,
                salt_arg
            )

            return await this.getAccount({
                tokenContract,
                tokenId,
                salt: salt_arg
            })
        }
        catch (error) {
            throw error
        }
    }

    public async checkAccountDeployment(params: GetAccountOptions) {
        const { tokenContract, tokenId, salt } = params
        const provider = getProvider(this.jsonRPC)

        let salt_arg = salt ? salt : tokenId
        let address = await this.getAccount({
            tokenContract,
            tokenId,
            salt: salt_arg
        })

        try {
            const classHash = await provider.getClassHashAt(address)
            if(classHash) {
                return { deployed: true, classHash }
            }
        }
        catch (error) {
            return { deployed: false, classHash: ''}
        }
    }

    public async execute(call: Call) {
        const { to, selector, calldata } = call
        const provider = getProvider(this.jsonRPC)

        try {
            const result = await this.account.execute({
                contractAddress: to,
                entrypoint: selector,
                calldata: CallData.compile({
                    ...calldata
                })
            })
            await provider.waitForTransaction(result.transaction_hash)
        }
        catch (error) {
            throw error
        }
    }

    public async lock(option: LockOptions) {
        const { tbaAddress, duration_in_sec } = option
        const contract = new Contract(accountAbi, tbaAddress, this.account)

        try {
            await contract.lock(duration_in_sec)
        }
        catch (error) {
            throw error
        }
    }

    public async is_locked(option: LockOptions) {
        const { tbaAddress } = option
        const contract = new Contract(accountAbi, tbaAddress, this.account)

        try {
            let { lock_status, time_until_unlocks } = contract.is_locked()
            return { locked: lock_status, time_until_unlocks}
        }
        catch (error) {
            throw error
        }
    }

    
}

// pending methods (isLocked, getOwnerNFT, transferETH, transferERC20, transferNFT, signMessage)