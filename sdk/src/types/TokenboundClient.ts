import { WalletClient } from "./walletClient";

export interface TokenboundClientOptions {
    chainId: string // 'SN_MAIN' | 'SN_GOERLI'
    walletClient: WalletClient
    registryAddress?: string
    implementationAddress?: string
}