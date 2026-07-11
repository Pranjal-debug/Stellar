use soroban_sdk::{
    Address,
    Env,
};

use crate::{
    errors::ContractError,
    storage,
};

pub fn initialize(
    env: Env,
    admin: Address,
) -> Result<(), ContractError> {

    if storage::get_admin(&env).is_some() {
        return Err(ContractError::AlreadyInitialized);
    }

    admin.require_auth();

    storage::set_admin(
        &env,
        &admin,
    );

    storage::set_total_supply(
        &env,
        0,
    );

    Ok(())
}