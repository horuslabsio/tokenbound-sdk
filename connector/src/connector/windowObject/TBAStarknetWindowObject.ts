import type {
    AccountChangeEventHandler,
    StarknetWindowObject,
    WalletEvents,
  } from "get-starknet-core"

export const userEventHandlers: WalletEvents[] = []

export interface tokenboundWindowObject {
    id: string
    icon: string
    name: string
    version: string
}

const getTokenboundWindowObject = (
    options: tokenboundWindowObject,
    tokenboundAddress: string, 
    parentWallet: StarknetWindowObject,
): StarknetWindowObject => {
    const wallet: StarknetWindowObject = {
        ...options,

        async request(call) {
            switch(call.type) {
                case "wallet_requestAccounts": {
                    return [tokenboundAddress]
                }
                case "wallet_getPermissions": {
                    return parentWallet.request({
                        type: "wallet_getPermissions"
                    })
                }
                case "wallet_requestChainId": {
                    return parentWallet.request({
                        type: "wallet_requestChainId"
                    })
                }
                default:
                    throw new Error("not implemented")
            }
        },

        on: (event, handleEvent) => {
            if(event === "accountsChanged") {
                userEventHandlers.push({
                    type: event,
                    handler: handleEvent as AccountChangeEventHandler
                })
            } else {
                throw new Error(`Unknown event: ${event}`)
            }
        },

        off: (event, handleEvent) => {
            if(event !== "accountsChanged" && event !== "networkChanged") {
                throw new Error(`Unknown event: ${event}`)
            }

            const eventIndex = userEventHandlers.findIndex(
                (userEvent) => userEvent.type === event && userEvent.handler === handleEvent,
            )

            if (eventIndex >= 0) {
                userEventHandlers.splice(eventIndex, 1)
            }
        },
    }
    return wallet
}

export const TokenboundStarknetWindowObject = async (
    tokenboundAddress: string,
    parentWallet: StarknetWindowObject
): Promise<StarknetWindowObject> => {
    const starknetWindowObject = getTokenboundWindowObject(
        {
            id: "TBA",
            name: "Tokenbound Account",
            icon: "https://tokenbound.org/_next/image?url=%2Ftb-mark.svg&w=96&q=75",
            version: "1.0.0"
        },
        tokenboundAddress,
        parentWallet
    )

    return starknetWindowObject
}