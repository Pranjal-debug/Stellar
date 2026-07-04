export function getReadableError(error) {
  const message = error?.message || "";

  if (message.includes("User declined"))
    return "Transaction was rejected.";

  if (message.includes("insufficient"))
    return "Insufficient balance.";

  if (message.includes("wallet"))
    return "Wallet not found.";

  return "Something went wrong.";
}