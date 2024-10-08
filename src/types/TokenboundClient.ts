import { AccountInterface } from "starknet";
import { WalletClient } from "./walletClient";

export interface TokenboundClientOptions {
  walletClient?: WalletClient;
  account?: AccountInterface;
  jsonRPC: string;
  registryAddress?: string;
  implementationAddress?: string;
  chain_id: string;
  version: string;
}

export interface GetAccountOptions {
  tokenContract: string;
  tokenId: string;
  salt?: string;
}

export interface CreateAccountOptions {
  tokenContract: string;
  tokenId: string;
  salt?: string;
}

export interface AccountResult {
  transaction_hash: string;
  account: string;
}

export interface AccountStatus {
  deployed: boolean;
  classHash: string;
}

export interface MultiCall {
  contractAddress: string;
  entrypoint: string;
  calldata: any;
}

export interface Call {
  to: string;
  selector: string;
  calldata: any[];
}

export interface GetOwnerOptions {
  tbaAddress: string;
}

export interface GetHasPermissionOptions {
  owner: string;
  tbaAddress: string;
  permissionedAddress: string;
}


export interface SetPermissionOptions {
  tbaAddress: string;
  permissionedAddresses: string[];
  permissions: boolean[];
}


export interface ERC20TransferOptions {
  tbaAddress: string;
  contractAddress: string;
  recipient: string;
  amount: string;
}

export interface NFTTransferOptions {
  tbaAddress: string;
  contractAddress: string;
  tokenId: string;
  sender: string;
  recipient: string;
}

export interface GetIsLockedOptions {
  tbaAddress: string;
}

export interface LockAccountOptions {
  tbaAddress: string;
  lockUntill: number;
}


export interface UpgradeOptions {
  tbaAddress: string;
  newClassHash: string;
}