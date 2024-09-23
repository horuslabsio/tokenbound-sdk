import { Account } from "starknet"
import { getProvider } from "./provider"
import { WalletClient } from "../types/walletClient"

export function accountClient(
    jsonRPC: string, 
    walletClient?: WalletClient
): Account {
    const account = new Account(getProvider(jsonRPC), walletClient!.address, walletClient!.privateKey)
    return account
} 