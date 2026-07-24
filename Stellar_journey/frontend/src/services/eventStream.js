import { Server } from "@stellar/stellar-sdk/rpc";
import { CONTRACTS } from "../config/contracts";

export const RPC_URL = "https://soroban-testnet.stellar.org";
const rpcServer = new Server(RPC_URL);

/**
 * Polls Soroban RPC for real-time contract events emitted by the Crowdfunding contract.
 * @param {Function} onEvent Callback function invoked with parsed event objects.
 * @param {number} intervalMs Polling frequency in milliseconds.
 * @returns {Function} Unsubscribe function to stop listening.
 */
export function subscribeToContractEvents(onEvent, intervalMs = 4000) {
  let isSubscribed = true;
  let startLedger = 0;

  async function pollEvents() {
    if (!isSubscribed) return;

    try {
      if (startLedger === 0) {
        const latestLedger = await rpcServer.getLatestLedger();
        startLedger = Math.max(1, latestLedger.sequence - 100);
      }

      const response = await rpcServer.getEvents({
        startLedger,
        filters: [
          {
            type: "contract",
            contractIds: [CONTRACTS.crowdfunding],
          },
        ],
        limit: 20,
      });

      if (response.events && response.events.length > 0) {
        for (const event of response.events) {
          onEvent(event);
        }
        const maxLedger = Math.max(...response.events.map((e) => e.ledger));
        startLedger = maxLedger + 1;
      }
    } catch (err) {
      console.warn("Event streaming poll warning:", err.message || err);
    }

    if (isSubscribed) {
      setTimeout(pollEvents, intervalMs);
    }
  }

  pollEvents();

  return () => {
    isSubscribed = false;
  };
}
