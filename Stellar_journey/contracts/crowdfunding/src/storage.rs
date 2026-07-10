use soroban_sdk::contracttype;
use soroban_sdk::{Address, Env};

use crate::types::Campaign;

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    Token,
    Treasury,
    CampaignCount,
    Campaign(u32),
    Donation((u32, Address)),
}

// ----------------------
// Admin
// ----------------------

pub fn get_admin(env: &Env) -> Option<Address> {
    env.storage().persistent().get(&DataKey::Admin)
}

pub fn set_admin(env: &Env, admin: &Address) {
    env.storage().persistent().set(&DataKey::Admin, admin);
}

// ----------------------
// Token
// ----------------------

pub fn get_token(env: &Env) -> Option<Address> {
    env.storage().persistent().get(&DataKey::Token)
}

pub fn set_token(env: &Env, token: &Address) {
    env.storage().persistent().set(&DataKey::Token, token);
}

// ----------------------
// Treasury
// ----------------------

pub fn get_treasury(env: &Env) -> Option<Address> {
    env.storage()
        .persistent()
        .get(&DataKey::Treasury)
}

pub fn set_treasury(env: &Env, treasury: &Address) {
    env.storage()
        .persistent()
        .set(&DataKey::Treasury, treasury);
}

// ----------------------
// Campaign Count
// ----------------------

pub fn get_campaign_count(env: &Env) -> u32 {
    env.storage()
        .persistent()
        .get(&DataKey::CampaignCount)
        .unwrap_or(0)
}

pub fn set_campaign_count(env: &Env, count: u32) {
    env.storage()
        .persistent()
        .set(&DataKey::CampaignCount, &count);
}

// ----------------------
// Campaign
// ----------------------

pub fn get_campaign(
    env: &Env,
    id: u32,
) -> Option<Campaign> {
    env.storage()
        .persistent()
        .get(&DataKey::Campaign(id))
}

pub fn save_campaign(
    env: &Env,
    campaign: &Campaign,
) {
    env.storage()
        .persistent()
        .set(
            &DataKey::Campaign(campaign.id),
            campaign,
        );
}

// ----------------------
// Donation
// ----------------------

pub fn get_donation(
    env: &Env,
    campaign_id: u32,
    donor: Address,
) -> i128 {
    env.storage()
        .persistent()
        .get(&DataKey::Donation((campaign_id, donor)))
        .unwrap_or(0)
}

pub fn save_donation(
    env: &Env,
    campaign_id: u32,
    donor: Address,
    amount: i128,
) {
    env.storage()
        .persistent()
        .set(
            &DataKey::Donation((campaign_id, donor)),
            &amount,
        );
}