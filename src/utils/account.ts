import { Account } from "starknet"
import { getProvider } from "./provider"
import { WalletClient } from "../types/walletClient"

export function accountClient(walletClient: WalletClient): Account {
    const account = new Account(getProvider(walletClient.jsonRPC), walletClient.address, walletClient.privateKey)
    return account
} 