/**
 * Donations are handled through the crowdfunding smart contract.
 * This file exists only to avoid import errors.
 */

export async function createPaymentTransaction() {
  throw new Error(
    "Direct XLM payments are no longer supported. Use donate() from crowdfunding.js."
  );
}