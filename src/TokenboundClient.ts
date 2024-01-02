import { AccountInterface, Contract, BigNumberish, CallData, cairo } from "starknet"
import { accountClient } from "./utils/account"
import { LockOptions, Call, CreateAccountOptions, GetAccountOptions, TokenboundClientOptions, GetOwnerOptions, ERC20TransferOptions, NFTTransferOptions, MultiCall } from "./types/TokenboundClient"
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

    public async execute(tbaAddress: string, calls: Call[]) {
        const provider = getProvider(this.jsonRPC)

        let call: MultiCall = {
            contractAddress: tbaAddress,
            entrypoint: '__execute__',
            calldata: CallData.compile({
                calls
            })
        }

        try {
            const result = await this.account.execute(call)
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

    public async is_locked(tbaAddress: string) {
        const provider = getProvider(this.jsonRPC)
        const contract = new Contract(accountAbi, tbaAddress, provider)

        try {
            let lock_status = await contract.is_locked()
            return lock_status
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
        const { tbaAddress, contractAddress, recipient, amount} = options

        let call: Call = {
            to: contractAddress,
            selector: "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e",
            calldata: [recipient, cairo.uint256(amount)]
        }

        try {
            return await this.execute(tbaAddress, [call])
        }
        catch (error) {
            throw error
        }
    }

    public async transferNFT(options: NFTTransferOptions) {
        const { tbaAddress, contractAddress, tokenId, sender, recipient} = options

        let call: Call = {
            to: contractAddress,
            selector: "0x41b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
            calldata: [sender, recipient, cairo.uint256(tokenId)]
        }

        try {
            return await this.execute(tbaAddress, [call])
        }
        catch (error) {
            throw error
        }
    }
}

// pending methods (signMessage)