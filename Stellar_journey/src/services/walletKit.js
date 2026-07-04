import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit/sdk";
import { defaultModules } from "@creit.tech/stellar-wallets-kit/modules/utils";

let initialized = false;

export function initializeWalletKit() {
  console.log(StellarWalletsKit);
console.log(Object.getOwnPropertyNames(StellarWalletsKit));
  if (initialized) return;

  StellarWalletsKit.init({
    modules: defaultModules(),
  });

  initialized = true;
}