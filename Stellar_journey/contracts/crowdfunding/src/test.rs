#![cfg(test)]
extern crate std;
use soroban_sdk::{
    testutils::{Address as _, Ledger},
    Address, Env, String,
};
use crate::{
    types::{Campaign, CampaignStatus},
    CrowdfundingContract, CrowdfundingContractClient,
};
// Import compiled contracts for inter-contract testing
mod treasury {
    soroban_sdk::contractimport!(
        file = "../../target/wasm32v1-none/release/treasury.wasm"
    );
}
mod token {
    soroban_sdk::contractimport!(
        file = "../../target/wasm32v1-none/release/token.wasm"
    );
}
#[test]
fn test_create_and_get_campaign() {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register(CrowdfundingContract, ());
    let client = CrowdfundingContractClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    let token_id = Address::generate(&env);
    let treasury_id = Address::generate(&env);
    client.initialize(&admin, &token_id, &treasury_id);
    let creator = Address::generate(&env);
    let title = String::from_str(&env, "Build Solar App");
    let description = String::from_str(&env, "Solar energy crowdfunding");
    let goal: i128 = 1000;
    let deadline: u64 = env.ledger().timestamp() + 3600;