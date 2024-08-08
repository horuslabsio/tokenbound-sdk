import { getRandomPublicRPCNode } from './RPCNodes';

export function mapChainToNodeUrl(chainId: string): string {
  const PublicRpcNode = getRandomPublicRPCNode();
  if (chainId == 'SN_MAIN') {
    return PublicRpcNode.mainnet;
  } else {
    return PublicRpcNode.testnet;
  }
}
