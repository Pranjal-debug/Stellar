import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CCNUZZ5RNTWA5EKKVFSLPATLET5X2VPQ34CAQLZ5L6JPF57UTBFC26AO",
  }
} as const

export type DataKey = {tag: "Admin", values: void} | {tag: "Token", values: void} | {tag: "CampaignCount", values: void} | {tag: "Campaign", values: readonly [u32]} | {tag: "Donation", values: readonly [readonly [u32, string]]};


export interface Campaign {
  active: boolean;
  creator: string;
  deadline: u64;
  description: string;
  goal: i128;
  id: u32;
  raised: i128;
  title: string;
  withdrawn: boolean;
}

export interface Client {
  /**
   * Construct and simulate a donate transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  donate: ({donor, campaign_id, amount}: {donor: string, campaign_id: u32, amount: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a withdraw transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  withdraw: ({creator, campaign_id}: {creator: string, campaign_id: u32}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({admin, token}: {admin: string, token: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_campaign: ({id}: {id: u32}, options?: MethodOptions) => Promise<AssembledTransaction<Option<Campaign>>>

  /**
   * Construct and simulate a get_donation transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_donation: ({campaign_id, donor}: {campaign_id: u32, donor: string}, options?: MethodOptions) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a get_campaigns transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_campaigns: (options?: MethodOptions) => Promise<AssembledTransaction<Array<Campaign>>>

  /**
   * Construct and simulate a close_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  close_campaign: ({creator, campaign_id}: {creator: string, campaign_id: u32}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a create_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_campaign: ({creator, title, description, goal, deadline}: {creator: string, title: string, description: string, goal: i128, deadline: u64}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_campaign_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_campaign_count: (options?: MethodOptions) => Promise<AssembledTransaction<u32>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABQAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAFVG9rZW4AAAAAAAAAAAAAAAAAAA1DYW1wYWlnbkNvdW50AAAAAAAAAQAAAAAAAAAIQ2FtcGFpZ24AAAABAAAABAAAAAEAAAAAAAAACERvbmF0aW9uAAAAAQAAA+0AAAACAAAABAAAABM=",
        "AAAAAQAAAAAAAAAAAAAACENhbXBhaWduAAAACQAAAAAAAAAGYWN0aXZlAAAAAAABAAAAAAAAAAdjcmVhdG9yAAAAABMAAAAAAAAACGRlYWRsaW5lAAAABgAAAAAAAAALZGVzY3JpcHRpb24AAAAAEAAAAAAAAAAEZ29hbAAAAAsAAAAAAAAAAmlkAAAAAAAEAAAAAAAAAAZyYWlzZWQAAAAAAAsAAAAAAAAABXRpdGxlAAAAAAAAEAAAAAAAAAAJd2l0aGRyYXduAAAAAAAAAQ==",
        "AAAAAAAAAAAAAAAGZG9uYXRlAAAAAAADAAAAAAAAAAVkb25vcgAAAAAAABMAAAAAAAAAC2NhbXBhaWduX2lkAAAAAAQAAAAAAAAABmFtb3VudAAAAAAACwAAAAA=",
        "AAAAAAAAAAAAAAAId2l0aGRyYXcAAAACAAAAAAAAAAdjcmVhdG9yAAAAABMAAAAAAAAAC2NhbXBhaWduX2lkAAAAAAQAAAAA",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAA",
        "AAAAAAAAAAAAAAAMZ2V0X2NhbXBhaWduAAAAAQAAAAAAAAACaWQAAAAAAAQAAAABAAAD6AAAB9AAAAAIQ2FtcGFpZ24=",
        "AAAAAAAAAAAAAAAMZ2V0X2RvbmF0aW9uAAAAAgAAAAAAAAALY2FtcGFpZ25faWQAAAAABAAAAAAAAAAFZG9ub3IAAAAAAAATAAAAAQAAAAs=",
        "AAAAAAAAAAAAAAANZ2V0X2NhbXBhaWducwAAAAAAAAAAAAABAAAD6gAAB9AAAAAIQ2FtcGFpZ24=",
        "AAAAAAAAAAAAAAAOY2xvc2VfY2FtcGFpZ24AAAAAAAIAAAAAAAAAB2NyZWF0b3IAAAAAEwAAAAAAAAALY2FtcGFpZ25faWQAAAAABAAAAAA=",
        "AAAAAAAAAAAAAAAPY3JlYXRlX2NhbXBhaWduAAAAAAUAAAAAAAAAB2NyZWF0b3IAAAAAEwAAAAAAAAAFdGl0bGUAAAAAAAAQAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAAAAAARnb2FsAAAACwAAAAAAAAAIZGVhZGxpbmUAAAAGAAAAAA==",
        "AAAAAAAAAAAAAAASZ2V0X2NhbXBhaWduX2NvdW50AAAAAAAAAAAAAQAAAAQ=" ]),
      options
    )
  }
  public readonly fromJSON = {
    donate: this.txFromJSON<null>,
        withdraw: this.txFromJSON<null>,
        initialize: this.txFromJSON<null>,
        get_campaign: this.txFromJSON<Option<Campaign>>,
        get_donation: this.txFromJSON<i128>,
        get_campaigns: this.txFromJSON<Array<Campaign>>,
        close_campaign: this.txFromJSON<null>,
        create_campaign: this.txFromJSON<null>,
        get_campaign_count: this.txFromJSON<u32>
  }
}