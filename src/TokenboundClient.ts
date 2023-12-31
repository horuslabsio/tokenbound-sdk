import { AccountInterface, Contract, BigNumberish, CallData } from "starknet"
import { accountClient } from "./utils/account"
import { LockOptions, Call, CreateAccountOptions, GetAccountOptions, TokenboundClientOptions, GetOwnerOptions, ERC20TransferOptions, NFTTransferOptions } from "./types/TokenboundClient"
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
            return true
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
            let { lock_status, time_until_unlocks } = await contract.is_locked()
            return { lock_status, time_until_unlocks}
        }
        catch (error) {
            throw error
        }
    }

    public async getOwner(options: GetOwnerOptions) {
        let { tbaAddress, tokenContract, tokenId } = options
        const contract = new Contract(accountAbi, tbaAddress, this.account)

        try {
            let owner = await contract.owner(tokenContract, tokenId)
            return owner
        }
        catch (error) {
            throw error
        }
    }
    
    public async getOwnerNFT(tbaAddress: string) {
        const contract = new Contract(accountAbi, tbaAddress, this.account)

        try {
            let ownerNFT = await contract.token()
            return ownerNFT
        }
        catch (error) {
            throw error
        }
    }

    public async transferERC20(options: ERC20TransferOptions) {
        const { contractAddress, recipient, amount} = options

        let call: Call = {
            to: contractAddress,
            selector: 'transfer',
            calldata: [recipient, amount]
        }

        try {
            return await this.execute(call)
        }
        catch (error) {
            throw error
        }
    }

    public async transferNFT(options: NFTTransferOptions) {
        const { contractAddress, tokenId, sender, recipient} = options

        let call: Call = {
            to: contractAddress,
            selector: 'transferFrom',
            calldata: [sender, recipient, tokenId]
        }

        try {
            return await this.execute(call)
        }
        catch (error) {
            throw error
        }
    }
}

// pending methods (executeMulticall, signMessage)