import { Client, networks } from "contract-client";
import { signTransaction } from "@stellar/freighter-api";

const client = new Client({
  ...networks.testnet,
  rpcUrl: "https://soroban-testnet.stellar.org",

  signTransaction: async (xdr, options) => {
    const result = await signTransaction(xdr, {
      networkPassphrase: options.networkPassphrase,
    });

    return {
      signedTxXdr: result.signedTxXdr,
      signerAddress: result.signerAddress,
    };
  },
});

export async function getTotal() {
  const tx = await client.get_total();
  return Number(tx.result);
}

export async function donate(donor, amount) {
  const tx = await client.donate(
    {
      donor,
      amount: BigInt(amount),
    },
    {
      publicKey: donor,
    }
  );

  return await tx.signAndSend();
}