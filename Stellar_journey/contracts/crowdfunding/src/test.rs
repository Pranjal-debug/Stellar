#![cfg(test)]

extern crate std;

use soroban_sdk::{
    testutils::{Address as _, Ledger},
    Address,
    Env,
    String,
};

use crate::{
    CrowdfundingContract,
    CrowdfundingContractClient,
};