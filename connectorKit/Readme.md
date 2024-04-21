# Tokenbound Connectkit

ERC-6551 gives NFTs unimaginable capabilities. They empower NFTs to do everything a normal wallet can do. But connecting to accounts and executing transactions might be a little bit more complex, as the `__execute__` method can only be called by the owner of the NFT bound to the Tokenbound account.

With this connectorKit, dApps can enable tokenbound accounts to seamlessly connect and use their dApps like every normal account on Starknet.

To get started:
1. Install the `tokenbound-connector` dependency:

```shell
npm install tokenbound-connector
```

2. Import all neeeded methods:

```js
import { TokenboundConnector, TokenBoundModal, useTokenBoundModal } from "../index";
```

3. import the existing methods in the `useTokenBoundModal` hook:
```js
const {
    isOpen,
    openModal,
    closeModal,
    value,
    selectedOption,
    handleChange,
    handleChangeInput,
    resetInputValues,
} = useTokenBoundModal();
```

4. Create all needed functions, then instantiate the connector:
```js
const tokenbound = new TokenboundConnector({
    tokenboundAddress: value,
    parentAccountId: selectedOption,
});
```

5. Reference the [example dapp](https://github.com/Starknet-Africa-Edu/token-bound-example) for more information.

PS: connector would be made available for easy use from starknetkit.
