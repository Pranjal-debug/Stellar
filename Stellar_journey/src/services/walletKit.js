import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit/sdk";
import { defaultModules } from "@creit.tech/stellar-wallets-kit/modules/utils";
import { Networks } from "@creit.tech/stellar-wallets-kit";

StellarWalletsKit.init({
  modules: defaultModules(),
  network: Networks.TESTNET,
});

export default StellarWalletsKit;