import { AccountInterface } from "starknet";
import { WalletClient } from "./walletClient";

export interface TokenboundClientOptions {
    walletClient?: WalletClient
    account?: AccountInterface
    jsonRPC: string
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

export interface Call {
    to: string
    selector: string
    calldata?: string[]
}

export interface LockOptions {
    tbaAddress: string
    duration: number
}