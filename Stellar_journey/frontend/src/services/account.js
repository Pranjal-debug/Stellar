import { server } from "../config/stellar";

export async function getBalance(publicKey) {
  const account = await server.loadAccount(publicKey);

  const native = account.balances.find(
    (b) => b.asset_type === "native"
  );

  return native?.balance ?? "0";
}