import { StellarWalletsKit, WalletNetwork } from "stellar-wallets-kit";

export const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
});

export async function connectWallet() {
  try {
    const result = await kit.openModal();

    return {
      address: result.address,
      walletName: result.name,
    };
  } catch (err) {
    throw new Error("WALLET_NOT_FOUND");
  }
}