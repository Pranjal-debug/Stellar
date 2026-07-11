use crate::events::{
    DonationReceived,
    GoalReached,
};
use crate::events::FundsWithdrawn;
use crate::errors::ContractError;

use soroban_sdk::{
    token,
    Address,
    Env,
};

use crate::{
    storage::{self, DataKey},
    types::{Campaign, CampaignStatus},
};

use crate::treasury::TreasuryClient;

pub fn donate(
    env: Env,
    donor: Address,
    campaign_id: u32,
    amount: i128,
) -> Result<(), ContractError> {
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

    let now = env.ledger().timestamp();

    if now > campaign.deadline {
        campaign.status = CampaignStatus::Expired;
        
        storage::save_campaign(&env, &campaign);
        
        return Err(ContractError::CampaignExpired);
    }

    if campaign.status != CampaignStatus::Active {
        return Err(ContractError::CampaignClosed);
    }

    let treasury_address = storage::get_treasury(&env).unwrap();

    let treasury = TreasuryClient::new(
        &env,
        &treasury_address,
    );

    treasury.deposit(
        &campaign_id,
        &donor,
        &amount,
    );

    campaign.raised += amount;

    if campaign.raised >= campaign.goal {
        campaign.status = CampaignStatus::Successful;
        
        GoalReached {
            campaign_id,
            creator: campaign.creator.clone(),
            total_raised: campaign.raised,
        }
        .publish(&env);
    }

   storage::save_campaign(&env, &campaign);

    let donated = storage::get_donation(
        &env,
        campaign_id,
        donor.clone(),
    );

    storage::save_donation(
        &env,
        campaign_id,
        donor.clone(),
        donated + amount,
    );

        DonationReceived {
            campaign_id,
            donor: donor.clone(),
            amount,
        }
        .publish(&env);

    Ok(())
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
) -> Result<(), ContractError> {
    creator.require_auth();

    let token_address = storage::get_token(&env).unwrap();

    let token = token::Client::new(&env, &token_address);

    let mut campaign: Campaign = env
        .storage()
        .persistent()
        .get(&DataKey::Campaign(campaign_id))
        .unwrap();

    if creator != campaign.creator {
        return Err(ContractError::Unauthorized);
    }

    if campaign.status != CampaignStatus::Successful
    && campaign.status != CampaignStatus::Closed
    {
        return Err(ContractError::CampaignNotClosed);
    }

    if campaign.status == CampaignStatus::Withdrawn {
        return Err(ContractError::AlreadyWithdrawn);
    }

    if campaign.raised <= 0 {
        return Err(ContractError::NoFundsAvailable);
    }

    let treasury_address = storage::get_treasury(&env).unwrap();

    let treasury = TreasuryClient::new(
        &env,
        &treasury_address,
    );
    
    treasury.withdraw(
        &campaign_id,
        &creator,
        &campaign.raised,
    );

    campaign.status = CampaignStatus::Withdrawn;

    storage::save_campaign(&env, &campaign);

    FundsWithdrawn {
        campaign_id,
        creator: creator.clone(),
        amount: campaign.raised,
    }
    .publish(&env);

    Ok(())
}