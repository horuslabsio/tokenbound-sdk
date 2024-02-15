import { RpcProvider } from "starknet";

export function getProvider(jsonRPC: string) {
    const provider = new RpcProvider({
        nodeUrl: jsonRPC
    })
    return provider
}