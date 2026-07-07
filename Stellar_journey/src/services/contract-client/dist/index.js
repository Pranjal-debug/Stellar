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
        contractId: "CCNUZZ5RNTWA5EKKVFSLPATLET5X2VPQ34CAQLZ5L6JPF57UTBFC26AO",
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
        super(new ContractSpec(["AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABQAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAFVG9rZW4AAAAAAAAAAAAAAAAAAA1DYW1wYWlnbkNvdW50AAAAAAAAAQAAAAAAAAAIQ2FtcGFpZ24AAAABAAAABAAAAAEAAAAAAAAACERvbmF0aW9uAAAAAQAAA+0AAAACAAAABAAAABM=",
            "AAAAAQAAAAAAAAAAAAAACENhbXBhaWduAAAACQAAAAAAAAAGYWN0aXZlAAAAAAABAAAAAAAAAAdjcmVhdG9yAAAAABMAAAAAAAAACGRlYWRsaW5lAAAABgAAAAAAAAALZGVzY3JpcHRpb24AAAAAEAAAAAAAAAAEZ29hbAAAAAsAAAAAAAAAAmlkAAAAAAAEAAAAAAAAAAZyYWlzZWQAAAAAAAsAAAAAAAAABXRpdGxlAAAAAAAAEAAAAAAAAAAJd2l0aGRyYXduAAAAAAAAAQ==",
            "AAAAAAAAAAAAAAAGZG9uYXRlAAAAAAADAAAAAAAAAAVkb25vcgAAAAAAABMAAAAAAAAAC2NhbXBhaWduX2lkAAAAAAQAAAAAAAAABmFtb3VudAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAAId2l0aGRyYXcAAAACAAAAAAAAAAdjcmVhdG9yAAAAABMAAAAAAAAAC2NhbXBhaWduX2lkAAAAAAQAAAAA",
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAA",
            "AAAAAAAAAAAAAAAMZ2V0X2NhbXBhaWduAAAAAQAAAAAAAAACaWQAAAAAAAQAAAABAAAD6AAAB9AAAAAIQ2FtcGFpZ24=",
            "AAAAAAAAAAAAAAAMZ2V0X2RvbmF0aW9uAAAAAgAAAAAAAAALY2FtcGFpZ25faWQAAAAABAAAAAAAAAAFZG9ub3IAAAAAAAATAAAAAQAAAAs=",
            "AAAAAAAAAAAAAAANZ2V0X2NhbXBhaWducwAAAAAAAAAAAAABAAAD6gAAB9AAAAAIQ2FtcGFpZ24=",
            "AAAAAAAAAAAAAAAOY2xvc2VfY2FtcGFpZ24AAAAAAAIAAAAAAAAAB2NyZWF0b3IAAAAAEwAAAAAAAAALY2FtcGFpZ25faWQAAAAABAAAAAA=",
            "AAAAAAAAAAAAAAAPY3JlYXRlX2NhbXBhaWduAAAAAAUAAAAAAAAAB2NyZWF0b3IAAAAAEwAAAAAAAAAFdGl0bGUAAAAAAAAQAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAAAAAARnb2FsAAAACwAAAAAAAAAIZGVhZGxpbmUAAAAGAAAAAA==",
            "AAAAAAAAAAAAAAASZ2V0X2NhbXBhaWduX2NvdW50AAAAAAAAAAAAAQAAAAQ="]), options);
        this.options = options;
    }
    fromJSON = {
        donate: (this.txFromJSON),
        withdraw: (this.txFromJSON),
        initialize: (this.txFromJSON),
        get_campaign: (this.txFromJSON),
        get_donation: (this.txFromJSON),
        get_campaigns: (this.txFromJSON),
        close_campaign: (this.txFromJSON),
        create_campaign: (this.txFromJSON),
        get_campaign_count: (this.txFromJSON)
    };
}
