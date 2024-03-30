import { connect } from "starknetkit"
import { InjectedConnector } from "starknetkit/injected"
import { WebWalletConnector } from "starknetkit/webwallet"
import { ArgentMobileConnector } from "starknetkit/argentMobile"

import type {
    AccountChangeEventHandler,
    StarknetWindowObject,
} from "get-starknet-core"

import type {
    AccountInterface,
    ProviderInterface,
} from "starknet"

import {
    Connector,
    type ConnectorIcons
} from "./types/connector"

import {
    ConnectorNotConnectedError,
    ConnectorNotFoundError,
    UserRejectedRequestError,
} from "./constants"

import { tokenbound_icon } from "./constants"
import { getTokenboundStarknetWindowObject } from "./windowObject/TBAStarknetWindowObject"

let _wallet: StarknetWindowObject | null = null

interface TokenboundConnectorOptions {
    tokenboundAddress: string,
    parentAccountId: string,
    provider?: ProviderInterface
}

export class TokenboundConnector extends Connector {
    private _wallet: StarknetWindowObject | null = null
    private _options: TokenboundConnectorOptions

    constructor(options: TokenboundConnectorOptions) {
        super()
        this._options = options
    }

    available(): boolean {
        return true
    }

    async ready(): Promise<boolean> {
        if(!_wallet) {
            this._wallet = null
            return false
        }

        this._wallet = _wallet
        return this._wallet.isPreauthorized()
    }

    get id(): string {
        this._wallet = _wallet
        return this._wallet?.id || "TBA"
    }

    get name(): string {
        this._wallet = _wallet
        return this._wallet?.name || "Tokenbound Account"
    }

    get icon(): ConnectorIcons {
        return {
            light: tokenbound_icon,
            dark: tokenbound_icon
        }
    }

    get wallet(): StarknetWindowObject {
        if(!this._wallet) {
            throw new ConnectorNotConnectedError()
        }
        return this._wallet
    }

    get subtitle(): string {
        return "Powered by Starknet Africa"
    }

    async connect(): Promise<StarknetWindowObject> {
        await this.ensureWallet()
        
        if(!this._wallet) {
            throw new ConnectorNotFoundError()
        }

        try {
            await this._wallet.enable({ starknetVersion: "v4" })
        }
        catch {
            throw new UserRejectedRequestError()
        }

        if(!this._wallet.isConnected) {
            throw new UserRejectedRequestError()
        }

        return this._wallet
    }

    async disconnect(): Promise<void> {
        if(!this.available() && !this._wallet) {
            throw new ConnectorNotFoundError()
        }

        _wallet = null
        this._wallet = _wallet
    }

    async account(): Promise<AccountInterface> {
        this._wallet = _wallet
        
        if(!this._wallet || !this._wallet.account) {
            throw new ConnectorNotConnectedError()
        }

        return this._wallet.account as unknown as AccountInterface
    }

    async chainId(): Promise<bigint> {
        if (!this._wallet || !this.wallet.account || !this._wallet.provider) {
            throw new ConnectorNotConnectedError()
          }
      
        const chainIdHex = await this._wallet.provider.getChainId()
        const chainId = BigInt(chainIdHex)
        return chainId
    }

    async initEventListener(accountChangeCb: AccountChangeEventHandler) {
        this._wallet = _wallet
        if (!this._wallet) {
          throw new ConnectorNotConnectedError()
        }
    
        this._wallet.on("accountsChanged", accountChangeCb)
    }
    
    async removeEventListener(accountChangeCb: AccountChangeEventHandler) {
        this._wallet = _wallet
        if (!this._wallet) {
          throw new ConnectorNotConnectedError()
        }
    
        this._wallet.off("accountsChanged", accountChangeCb)
    
        _wallet = null
        this._wallet = null
    }

    private async connectParentAccount(id: string): Promise<AccountInterface> {
        let parentWallet

        if(id == "argentMobile") {
            const { wallet } = await connect({
                connectors: [
                    new ArgentMobileConnector()
                ]
            })
            parentWallet = wallet
        }
        else if(id == "argentWebWallet") {
            const { wallet } = await connect({
                connectors: [
                    new WebWalletConnector({
                        url: "https://web.argent.xyz"
                    })
                ]
            })
            parentWallet = wallet
        }
        else {
            const { wallet } = await connect({
                connectors: [
                    new InjectedConnector({
                        options: {id: id}
                    })
                ]
            })
            parentWallet = wallet
        }

        return parentWallet?.account as AccountInterface
    }

    private async ensureWallet(): Promise<void> {
        const tokenboundAddress = this._options.tokenboundAddress
        const parentAccount = await this.connectParentAccount(this._options.parentAccountId)
        const provider = this._options.provider

        const wallet = await getTokenboundStarknetWindowObject(
            {
                id: "TBA",
                icon: tokenbound_icon as string,
                name: "Tokenbound Account",
                version: "1.0.0"
            },
            tokenboundAddress,
            parentAccount,
            provider
        )

        _wallet = wallet ?? null
        this._wallet = _wallet
    }
}