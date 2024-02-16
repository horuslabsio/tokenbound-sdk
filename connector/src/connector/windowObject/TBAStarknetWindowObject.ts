import type { 
    ConnectedStarknetWindowObject, 
    StarknetWindowObject 
} from "get-starknet-core";

import type { 
    AccountInterface, 
    ProviderInterface 
} from "starknet";

import { TokenboundAccount } from "./tokenboundAccount";

export async function updateStarknetWindowObject(
    wallet: StarknetWindowObject,
    provider: ProviderInterface,
    tokenboundAddress: string,
    parentAccount: AccountInterface
): Promise<ConnectedStarknetWindowObject> {
    const chainId = await provider.getChainId()

    const valuesToAssign: Pick<
        ConnectedStarknetWindowObject, "id" | "name" | "icon" | "version" | "isConnected" | "chainId" | "selectedAddress" | "account" | "provider"
    > = {
        id: "TBA",
        name: "Tokenbound Account",
        icon: "https://tokenbound.org/_next/image?url=%2Ftb-mark.svg&w=96&q=75",
        version: "1.0.0",
        isConnected: true,
        chainId,
        selectedAddress: tokenboundAddress,
        account: new TokenboundAccount(provider, tokenboundAddress, parentAccount),
        provider
    } 

    return Object.assign(wallet, valuesToAssign)
}
