import registryAbi from "@/abis/registry.abi.json"
import accountAbi from "@/abis/account.abi.json"

import {
    TokenboundClientOptions,
    GetAccountOptions,
    CreateAccountOptions,
    AccountStatus,
} from "./types/TokenboundClient"
import { WalletClient } from "./types/walletClient"

import { TokenboundClient } from "./TokenboundClient"

export {
    TokenboundClient,
    registryAbi,
    accountAbi
}

export type {
    WalletClient,
    TokenboundClientOptions,
    GetAccountOptions,
    CreateAccountOptions,
    AccountStatus,
}