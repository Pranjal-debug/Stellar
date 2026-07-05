#![no_std]

use soroban_sdk::{
    contract,
    contractimpl,
    contracttype,
    token,
    Address,
    Env,
    String,
    Vec,
};

#[contracttype]
pub enum DataKey {
    Admin,
    Token,
    CampaignCount,
    Campaign(u32),
    Donation((u32, Address)),
}

#[contracttype]
#[derive(Clone)]
pub struct Campaign {
    pub id: u32,
    pub creator: Address,
    pub title: String,
    pub description: String,
    pub goal: i128,
    pub raised: i128,
    pub deadline: u64,
    pub active: bool,
}

#[contract]
pub struct CrowdfundingContract;

#[contractimpl]
impl CrowdfundingContract {

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
        .unwrap();

    let token = token::Client::new(&env, &token_address);

    let mut campaign: Campaign = env
        .storage()
        .persistent()
        .get(&DataKey::Campaign(campaign_id))
        .unwrap();

    if !campaign.active {
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

    pub fn initialize(
        env: Env,
        admin: Address,
        token: Address,
    ) {
        if env.storage().persistent().has(&DataKey::Admin) {
            panic!("Already initialized");
        }

        admin.require_auth();

        env.storage().persistent().set(&DataKey::Admin, &admin);
        env.storage().persistent().set(&DataKey::Token, &token);
        env.storage().persistent().set(&DataKey::CampaignCount, &0u32);
    }

    pub fn create_campaign(
        env: Env,
        creator: Address,
        title: String,
        description: String,
        goal: i128,
        deadline: u64,
    ) {
        creator.require_auth();

        let mut count: u32 = env
            .storage()
            .persistent()
            .get(&DataKey::CampaignCount)
            .unwrap_or(0);

        count += 1;

        let campaign = Campaign {
            id: count,
            creator: creator.clone(),
            title,
            description,
            goal,
            raised: 0,
            deadline,
            active: true,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Campaign(count), &campaign);

        env.storage()
            .persistent()
            .set(&DataKey::CampaignCount, &count);
    }

    pub fn get_campaign_count(env: Env) -> u32 {
        env.storage()
            .persistent()
            .get(&DataKey::CampaignCount)
            .unwrap_or(0)
    }

    pub fn get_campaign(env: Env, id: u32) -> Campaign {
        env.storage()
            .persistent()
            .get(&DataKey::Campaign(id))
            .unwrap()
    }

    pub fn get_campaigns(env: Env) -> Vec<Campaign> {
    let count: u32 = env
        .storage()
        .persistent()
        .get(&DataKey::CampaignCount)
        .unwrap_or(0);

    let mut campaigns = Vec::new(&env);

    let mut id: u32 = 1;

    while id <= count {
        if let Some(campaign) = env
            .storage()
            .persistent()
            .get::<_, Campaign>(&DataKey::Campaign(id))
        {
            campaigns.push_back(campaign);
        }

        id += 1;
    }

    campaigns
}
}