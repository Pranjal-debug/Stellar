import { Horizon } from "@stellar/stellar-sdk";

const server = new Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

export async function getBalance(publicKey) {
  try {
    const account = await server.loadAccount(publicKey);

    const nativeBalance = account.balances.find(
      (balance) => balance.asset_type === "native"
    );

    return nativeBalance ? nativeBalance.balance : "0";
  } catch (error) {
    console.error("Error fetching balance:", error);
    return "0";
  }
}

export async function getAccount(publicKey) {
  return server.loadAccount(publicKey);
}

export { server };