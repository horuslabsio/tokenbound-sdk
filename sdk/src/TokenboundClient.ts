import { AccountInterface, Contract, RpcProvider } from "starknet"
import { accountClient } from "./utils/account"
import { TokenboundClientOptions } from "./types/TokenboundClient"

import TBAcontractAbi from "@/abis/registry.abi.json"
import { TBAMainnetRegistry, TBAMainnetImplementation, TBATestnetRegistry, TBATestnetImplementation } from "./constants/constants"

class TokenboundClient {
    private chainId: string
    private account: AccountInterface
    private registryAddress?: string
    private implementationAddress?: string
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
        if(chainId == "SN_MAIN") {
            this.registryAddress = TBAMainnetRegistry
            this.implementationAddress = TBAMainnetImplementation
        }
        else if(chainId == "SN_SEPOLIA") {
            this.registryAddress = TBATestnetRegistry
            this.implementationAddress = TBATestnetImplementation
        }
        else {
            this.registryAddress = registryAddress
            this.implementationAddress = implementationAddress
        }
    }
}