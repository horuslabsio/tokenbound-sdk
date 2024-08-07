	// fn to identify Starknet wallets.

import { WALLET_API } from "@starknet-io/types-js";
import { ValidWallet } from "../types/modal";

	// Can also be performed by get-starknet.
export	async function scanObjectForWallets(
		obj: Record<string, any> // Browser window object
	): Promise<ValidWallet[]> {
		const AllObjectsNames: string[] = Object.getOwnPropertyNames(obj); // names of objects of level -1 of window
		const listNames: string[] = AllObjectsNames.filter((name: string) =>
			name.startsWith("starknet")
		);
		const Wallets: WALLET_API.StarknetWindowObject[] = Object.values(
			[...new Set(listNames)].reduce<
				Record<string, WALLET_API.StarknetWindowObject>
			>((wallets, name: string) => {
				const wallet = obj[name] as WALLET_API.StarknetWindowObject;
				if (!wallets[wallet.id]) {
					wallets[wallet.id] = wallet;
				}
				return wallets;
			}, {})
		);
		const validWallets: ValidWallet[] = await Promise.all(
			Wallets.map(async (wallet: WALLET_API.StarknetWindowObject) => {
				const isValid = await checkCompatibility(wallet);
				return { wallet: wallet, isValid: isValid } as ValidWallet;
			})
		);
		return validWallets;
	}

	const checkCompatibility = async (
		myWalletSWO: WALLET_API.StarknetWindowObject
	) => {
		let isCompatible: boolean = false;
		try {
			// *** TODO : Replace this request by Wallet api version, when available in Wallets.
			// starknet_supportedSpecs for ArgentX
			// wallet_supportedSpecs for Braavos
			// wallet_supportedWalletApi in the spec
			await myWalletSWO.request({ type: "wallet_supportedSpecs" });
			isCompatible = true;
		} catch {
			() => {
				console.log("Wallet compatibility failed.");
			};
		}
		return isCompatible;
	};
