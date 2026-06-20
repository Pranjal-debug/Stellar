import * as StellarSdk from "@stellar/stellar-sdk";

const server = new StellarSdk.Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

export async function getBalance(publicKey) {
  const account = await server.loadAccount(publicKey);

  const xlmBalance = account.balances.find(
    (asset) => asset.asset_type === "native"
  );

  return xlmBalance.balance;
}