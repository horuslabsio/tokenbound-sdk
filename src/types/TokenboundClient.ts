import { WalletClient } from "./walletClient";

export interface TokenboundClientOptions {
    walletClient: WalletClient
    registryAddress: string
    implementationAddress: string
}

export interface GetAccountOptions {
    tokenContract: string
    tokenId: string
    salt?: string
}

export interface CreateAccountOptions {
    tokenContract: string
    tokenId: string
    salt?: string
}

export interface AccountStatus {
    deployed: boolean
    classHash: string
}