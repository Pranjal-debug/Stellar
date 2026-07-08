use soroban_sdk::{
    token,
    Address,
    Env,
};

use crate::{
    storage::DataKey,
    types::{Campaign, CampaignStatus},
};

pub fn donate(
    env: Env,
    donor: Address,
    campaign_id: u32,
    amount: i128,
) {
    donor.require_auth();

    let token_address: Address = env
    .storage()
    .persistent()
    .get(&DataKey::Token)
    .expect("Token not initialized");

    let token = token::Client::new(&env, &token_address);

    let mut campaign: Campaign = env
        .storage()
        .persistent()
        .get(&DataKey::Campaign(campaign_id))
        .unwrap();

    if campaign.status != CampaignStatus::Active {
        panic!("Campaign is closed");
    }

    token.transfer(
        &donor,
        &env.current_contract_address(),
        &amount,
    );

    campaign.raised += amount;

    env.storage()
        .persistent()
        .set(&DataKey::Campaign(campaign_id), &campaign);

    let key = DataKey::Donation((campaign_id, donor.clone()));

    let donated: i128 = env
        .storage()
        .persistent()
        .get(&key)
        .unwrap_or(0);

    env.storage()
        .persistent()
        .set(&key, &(donated + amount));
}

pub fn get_donation(
    env: Env,
    campaign_id: u32,
    donor: Address,
) -> i128 {

    env.storage()
        .persistent()
        .get(&DataKey::Donation((campaign_id, donor)))
        .unwrap_or(0)
}

pub fn withdraw(
    env: Env,
    creator: Address,
    campaign_id: u32,
) {
    creator.require_auth();

    let token_address: Address = env
        .storage()
        .persistent()
        .get(&DataKey::Token)
        .unwrap();

    let token = token::Client::new(&env, &token_address);

    let mut campaign: Campaign = env
        .storage()
        .persistent()
        .get(&DataKey::Campaign(campaign_id))
        .unwrap();

    if creator != campaign.creator {
        panic!("Not campaign creator");
    }

    if campaign.status == CampaignStatus::Active {
        panic!("Campaign is still active");
    }

    if campaign.status == CampaignStatus::Withdrawn {
    panic!("Funds already withdrawn");
    }

    if campaign.raised <= 0 {
        panic!("No funds available");
    }

    token.transfer(
        &env.current_contract_address(),
        &creator,
        &campaign.raised,
    );

    campaign.status = CampaignStatus::Withdrawn;

    env.storage()
        .persistent()
        .set(&DataKey::Campaign(campaign_id), &campaign);
}