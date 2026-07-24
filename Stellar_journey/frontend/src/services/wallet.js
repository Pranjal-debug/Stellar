import {
  isConnected,
  requestAccess,
  getAddress,
} from "@stellar/freighter-api";

export async function connectWallet() {
  const connected = await isConnected();

  if (!connected.isConnected) {
    await requestAccess();
  }

  let { address } = await getAddress();

  // Wallet is authorized but locked
  if (!address) {
    await requestAccess();

    ({ address } = await getAddress());
  }

  if (!address) {
    throw new Error("Unable to unlock Freighter.");
  }

  return address;
}

export async function getWalletAddress() {
  const { address } = await getAddress();

  return address || null;
}