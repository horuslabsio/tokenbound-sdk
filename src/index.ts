import { TokenboundClient } from "./TokenboundClient"

import {
    TokenboundClientOptions, 
    GetAccountOptions, 
    CreateAccountOptions, 
    AccountStatus, 
    Call, 
    GetOwnerOptions, 
    ERC20TransferOptions, 
    NFTTransferOptions,
    GetHasPermissionOptions,
    SetPermissionOptions,
    UpgradeOptions,
    LockAccountOptions,
    GetIsLockedOptions,
} from "./types/TokenboundClient"

import { TBAChainID, TBAVersion } from "./constants"
import { WalletClient } from "./types/walletClient"

export {
    TokenboundClient,
    TBAChainID,
    TBAVersion
}

export type {
    WalletClient,
    TokenboundClientOptions, 
    GetAccountOptions, 
    CreateAccountOptions, 
    AccountStatus, 
    Call, 
    GetOwnerOptions, 
    ERC20TransferOptions, 
    NFTTransferOptions,
    GetHasPermissionOptions,
    SetPermissionOptions,
    UpgradeOptions,
    LockAccountOptions,
    GetIsLockedOptions,
    
}