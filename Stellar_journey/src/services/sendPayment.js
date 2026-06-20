import * as StellarSdk from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";

const server = new StellarSdk.Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

export async function createPaymentTransaction(
  sender,
  destination,
  amount
) {
  const account = await server.loadAccount(sender);

  console.log(account);

  const transaction =
  new StellarSdk.TransactionBuilder(
    account,
    {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase:
        StellarSdk.Networks.TESTNET,
    }
  )
    .addOperation(
      StellarSdk.Operation.payment({
        destination,
        asset: StellarSdk.Asset.native(),
        amount,
      })
    )
    .setTimeout(30)
    .build();

    const xdr = transaction.toXDR();
    const signedXdr = await signTransaction(
  xdr,
  {
    networkPassphrase:
      StellarSdk.Networks.TESTNET,
  }
);

const signedTransaction =
  StellarSdk.TransactionBuilder
    .fromXDR(
      signedXdr.signedTxXdr,
      StellarSdk.Networks.TESTNET
    );

const response =
  await server.submitTransaction(
    signedTransaction
  );

console.log(response);

return response;
}