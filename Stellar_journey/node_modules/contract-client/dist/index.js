import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from "@stellar/stellar-sdk/contract";
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
        contractId: "CDDFPLKR62ILTYEP3XQTQN4FD23UQ2LAWSL53BHTE7MU6KEPN3F7OB6G",
    }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAFVG9rZW4AAAAAAAAAAAAAAAAAAAVUb3RhbAAAAAAAAAEAAAAAAAAACERvbmF0aW9uAAAAAQAAABM=",
            "AAAAAAAAAAAAAAAGZG9uYXRlAAAAAAACAAAAAAAAAAVkb25vcgAAAAAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAAJZ2V0X3RvdGFsAAAAAAAAAAAAAAEAAAAL",
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAA",
            "AAAAAAAAAAAAAAAMZ2V0X2RvbmF0aW9uAAAAAQAAAAAAAAAFZG9ub3IAAAAAAAATAAAAAQAAAAs="]), options);
        this.options = options;
    }
    fromJSON = {
        donate: (this.txFromJSON),
        get_total: (this.txFromJSON),
        initialize: (this.txFromJSON),
        get_donation: (this.txFromJSON)
    };
}
