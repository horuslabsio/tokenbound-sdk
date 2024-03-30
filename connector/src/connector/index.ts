import { connect } from "starknetkit"
import { InjectedConnector } from "starknetkit/injected"
import { WebWalletConnector } from "starknetkit/webwallet"
import { ArgentMobileConnector } from "starknetkit/argentMobile"

import {
    AccountChangeEventHandler,
    StarknetWindowObject,
    Permission,
    StarknetChainId
} from "get-starknet-core"

import {
    Connector,
    ConnectorData,
    type ConnectorIcons
} from "./types/connector"

import {
    ConnectorNotConnectedError,
    ConnectorNotFoundError,
    UserRejectedRequestError,
} from "./constants"

import { tokenbound_icon } from "./constants"
import { TokenboundStarknetWindowObject } from "./windowObject/TBAStarknetWindowObject"

let _wallet: StarknetWindowObject | null = null

interface TokenboundConnectorOptions {
    tokenboundAddress: string,
    parentAccountId: string,
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
        const permissions = await this._wallet.request({
            type: "wallet_getPermissions",
        })

        return permissions.includes(Permission.Accounts)
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

    async connect(): Promise<ConnectorData> {
        await this.ensureWallet()
        
        if(!this._wallet) {
            throw new ConnectorNotFoundError()
        }

        let accounts: string[]

        try {
            accounts = await this._wallet.request({
                type: "wallet_requestAccounts",
                params: { silentMode: false },
            })
        }
        catch {
            throw new UserRejectedRequestError()
        }

        const chainId = await this.chainId()
        return {
            account: accounts[0],
            chainId,
        }
    }

    async disconnect(): Promise<void> {
        if(!this.available() && !this._wallet) {
            throw new ConnectorNotFoundError()
        }

        _wallet = null
        this._wallet = _wallet
    }

    async account(): Promise<string | null> {
        this._wallet = _wallet
        
        if(!this._wallet) {
            throw new ConnectorNotConnectedError()
        }

        const [account] = await this._wallet.request({
            type: "wallet_requestAccounts",
            params: { silentMode: true },
        })

        return account ?? null
    }

    async chainId(): Promise<StarknetChainId> {
        if (!this._wallet) {
            throw new ConnectorNotConnectedError()
          }
      
        return this._wallet.request({
            type: "wallet_requestChainId"
        })
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

    private async connectParentWallet(id: string): Promise<StarknetWindowObject> {
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

        return parentWallet!
    }

    private async ensureWallet(): Promise<void> {
        const tokenboundAddress = this._options.tokenboundAddress
        const parentWallet = await this.connectParentWallet(this._options.parentAccountId)

        const wallet = await TokenboundStarknetWindowObject(
            tokenboundAddress,
            parentWallet
        )

        _wallet = wallet ?? null
        this._wallet = _wallet
    }
}