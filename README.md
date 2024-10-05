# Tokenbound SDKs

<!-- logo -->
<p align="center">
  <img width='300' src="./assets/tokenbound.png">
</p>

<!-- primary badges -->
<p align="center">
  <a href="https://github.com/horuslabsio/TBA-SDK/LICENSE/">
    <img src="https://img.shields.io/badge/license-MIT-black">
  </a>
</p>

# Tokenbound SDK

This repo houses the Tokenbound SDK, a front-end library for interacting with ERC-6551 accounts on Starknet. The SDK provides an interface for interacting with tokenbound accounts, enabling operations like account creation, transaction execution, token transfers (including ERC-721, ERC-1155, and ERC-20 tokens), and message signing. Any onchain action you can perform with your EOA wallet can be done with your NFT's Tokenbound account.

Packages
`src` - SDK client for all projects, signing enabled via Starknet.js.

Examples
`examples/sdk-starknetjs` - An example app using the tokenbound SDK in a react project with starknetjs
`examples/sdk-starknetjs-starknetkit-starknet-react` - An example app using the tokenbound SDK in a react project with starknetjs, starknetkit and starknet-react

Development
Clone repository and install dependencies:
# clone the repo
```
git clone <repo>
```
# install dependencies
```
npm install
```
# build packages
```
npm run build
```
NOTE: Any local changes to SDK methods in `TokenboundClient.ts` require a rebuild to be useable in the example apps in /example

## API Reference
### TokenboundClient
The TokenboundClient class provides an interface for interacting with tokenbound accounts, enabling operations like account creation, transaction execution, token transfers (including ERC-721, ERC-1155, and ERC-20 tokens), and message signing.

The client is instantiated with an object containing two parameters:

#### Parameter	
One of `account <AccountInterface>` or `walletClient <WalletClient>` is	mandatory.

### Standard configuration with WalletClient
To configure tokenbound using walletClient:

```js
import { TokenboundClient, WalletClient } from 'starknet-tokenbound-sdk';

const walletClient: WalletClient = {
  address: "0x0617D13Db952a2965580ebAc9DF602debFa12d0eAFB7c1a79D9dA03321169286",
  privateKey: process.env.REACT_APP_PRIVATE_KEY!,
}

const options = {
  walletClient: walletClient,
  registryAddress: registryAddress,
  implementationAddress: implementationAddress,
  jsonRPC: `https://starknet-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`

}

const tokenbound = new TokenboundClient(options)
```

### Standard configuration  with Account signer
Refer to the starknet-react documentation, for notes on configuring your StarknetProvider.

```js
import { useAccount, useConnect } from '@starknet-react/core';

const options = {
  account: account,
  registryAddress: registryAddress,
  implementationAddress: implementationAddress,
  jsonRPC: `https://starknet-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
}

const tokenbound = new TokenboundClient(options)
```

For easy reference, we've prepared code examples for a few simple SDK interactions.

## TokenboundClient SDK Methods
The `TokenboundClient` enables creation of and interaction with Tokenbound accounts:

### createAccount
Creates a tokenbound account for an NFT. createAccount adds the account to the registry and initializes it for use. Prior to account creation, the address can already receive assets. Deploying the account allows the NFT's owner to interact with the account.

```js
const deployAccount = async () => {
  try {
    await tokenbound.createAccount({
      tokenContract: tokenContract,
      tokenId: tokenId,
      salt: "3000000000"
    })
  }
  catch (error) {
    console.log(error)
  }
}
```

Parameter	Description	Type
- tokenContract: The address of the token contract.	`string`
- tokenId: The token ID.	`string`
- salt:	The salt used to create a unique account address (optional)	`number`

### getAccount
Gets the tokenbound account address for an NFT.

Returns the tokenbound account address for a given token contract and token ID.

```js
const getAccount = async () => {
  const account = await tokenbound.getAccount({
    tokenContract: tokenContract,
    tokenId: tokenId,
    salt: "3000000000"
  })
}
```

Parameter	Description	Type
- tokenContract:	The address of the token contract.	string
- tokenId:	The token ID.	string
- salt:	The salt used when the account was created (optional)	number

### checkAccountDeployment
Check if the tokenbound account address has been activated using createAccount.

Returns a boolean and classHash indicating if a tokenbound account has been deployed (created) at the accountAddress

```js
const getDeploymentStatus = async () => {
  const status = await tokenbound.checkAccountDeployment({
    tokenContract,
    tokenId,
    salt: "3000000000"
  })
  setDeployStatus(status?.deployed)
  setAccountClassHash(status?.classHash)
}
```

Parameter	Description	Type
- tokenContract: The token contract address
- tokenId: The token ID
- salt

