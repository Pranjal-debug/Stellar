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

    client.create_campaign(&creator, &title, &description, &goal, &deadline);

    assert_eq!(client.get_campaign_count(), 1);

    let campaign: Campaign = client.get_campaign(&1).unwrap();
    assert_eq!(campaign.id, 1);
    assert_eq!(campaign.goal, 1000);
    assert_eq!(campaign.raised, 0);
}

#[test]
fn test_close_campaign_by_creator() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(CrowdfundingContract, ());
    let client = CrowdfundingContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token_id = Address::generate(&env);
    let treasury_id = Address::generate(&env);

    client.initialize(&admin, &token_id, &treasury_id);

    let creator = Address::generate(&env);
    let deadline = env.ledger().timestamp() + 3600;

    client.create_campaign(
        &creator,
        &String::from_str(&env, "Tech Startup"),
        &String::from_str(&env, "Next-gen tech"),
        &5000,
        &deadline,
    );

    client.close_campaign(&creator, &1);

    let campaign = client.get_campaign(&1).unwrap();
    assert_eq!(campaign.status, CampaignStatus::Closed);
}

#[test]
fn test_inter_contract_flow_donate_and_withdraw() {
    let env = Env::default();
    env.mock_all_auths();

    // Register Token contract
    let token_admin = Address::generate(&env);
    let token_id = env.register(token::WASM, ());
    let token_client = token::Client::new(&env, &token_id);
    token_client.initialize(&token_admin);

    // Register Treasury contract
    let treasury_admin = Address::generate(&env);
    let treasury_id = env.register(treasury::WASM, ());
    let treasury_client = treasury::Client::new(&env, &treasury_id);
    treasury_client.initialize(&treasury_admin, &token_id);

    // Register Crowdfunding contract
    let crowdfunding_id = env.register(CrowdfundingContract, ());
    let crowdfunding_client = CrowdfundingContractClient::new(&env, &crowdfunding_id);
    crowdfunding_client.initialize(&treasury_admin, &token_id, &treasury_id);

    // Set crowdfunding contract as treasury admin so it can trigger withdraws
    treasury_client.change_admin(&crowdfunding_id);

    // Setup Donor & Creator
    let donor = Address::generate(&env);
    let creator = Address::generate(&env);

    // Mint tokens to Donor
    token_client.mint(&donor, &2000);
    assert_eq!(token_client.balance(&donor), 2000);

    // Create Campaign with 1000 goal
    let deadline = env.ledger().timestamp() + 3600;
    crowdfunding_client.create_campaign(
        &creator,
        &String::from_str(&env, "Clean Ocean"),
        &String::from_str(&env, "Cleanup project"),
        &1000,
        &deadline,
    );

    // Donate 1000 to campaign
    crowdfunding_client.donate(&donor, &1, &1000);

    let campaign = crowdfunding_client.get_campaign(&1).unwrap();
    assert_eq!(campaign.raised, 1000);
    assert_eq!(campaign.status, CampaignStatus::Successful);
    assert_eq!(treasury_client.get_campaign_balance(&1), 1000);

    // Creator withdraws funds
    crowdfunding_client.withdraw(&creator, &1);

    let campaign_after = crowdfunding_client.get_campaign(&1).unwrap();
    assert_eq!(campaign_after.status, CampaignStatus::Withdrawn);
    assert_eq!(token_client.balance(&creator), 1000);
}