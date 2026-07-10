use crate::events::CampaignClosed;

use soroban_sdk::{
    Address,
    Env,
};

use crate::{
    storage::{self, DataKey},
    types::{Campaign, CampaignStatus},
};

use crate::errors::ContractError;

pub fn initialize(
    env: Env,
    admin: Address,
    token: Address,
    treasury: Address,
) -> Result<(), ContractError> {

    if storage::get_admin(&env).is_some() {
        return Err(ContractError::AlreadyInitialized);
    }

    admin.require_auth();

    storage::set_admin(&env, &admin);
    storage::set_token(&env, &token);
    storage::set_treasury(&env, &treasury);
    storage::set_campaign_count(&env, 0);

    Ok(())
}

    pub fn close_campaign(
    env: Env,
    creator: Address,
    campaign_id: u32,
) -> Result<(), ContractError> {
    creator.require_auth();

    let mut campaign: Campaign = env
        .storage()
        .persistent()
        .get(&DataKey::Campaign(campaign_id))
        .unwrap();

    if campaign.creator != creator {
        return Err(ContractError::Unauthorized);
    }

    if campaign.status != CampaignStatus::Active {
    return Err(ContractError::CampaignClosed);
    }

    campaign.status = CampaignStatus::Closed;

    env.storage()
        .persistent()
        .set(&DataKey::Campaign(campaign_id), &campaign);

    CampaignClosed {
        campaign_id,
    }
    .publish(&env);

    Ok(())
}