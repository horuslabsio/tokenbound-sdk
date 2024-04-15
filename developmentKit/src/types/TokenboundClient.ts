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

export interface MultiCall {
    contractAddress: string,
    entrypoint: string,
    calldata: any,
}

export interface Call {
    to: string
    selector: string
    calldata: any[]
}

export interface LockOptions {
    tbaAddress: string
    duration_in_sec: number
}

export interface LockStatus {
    locked: boolean
    time_until_unlocks: number
}

export interface GetOwnerOptions {
    tbaAddress: string
    tokenContract: string
    tokenId: string
}

export interface ERC20TransferOptions {
    tbaAddress: string
    contractAddress: string
    recipient: string
    amount: string
}

export interface NFTTransferOptions {
    tbaAddress: string
    contractAddress: string
    tokenId: string
    sender: string
    recipient: string
}