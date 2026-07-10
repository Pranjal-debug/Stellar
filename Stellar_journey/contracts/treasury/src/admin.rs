use crate::events::Withdrawn;

use soroban_sdk::{
    token,
    Address,
    Env,
};

use crate::{
    errors::ContractError,
    storage,
    types::Treasury,
};

use crate::events::AdminChanged;

pub fn initialize(
    env: Env,
    admin: Address,
    token: Address,
) -> Result<(), ContractError> {
    if storage::get_admin(&env).is_some() {
        return Err(ContractError::AlreadyInitialized);
    }

    admin.require_auth();

    storage::set_admin(&env, &admin);
    storage::set_token(&env, &token);

    storage::save_treasury(
        &env,
        &Treasury {
            balance: 0,
            total_received: 0,
            total_distributed: 0,
        },
    );

    Ok(())
}

pub fn deposit(
    env: Env,
    from: Address,
    amount: i128,
) -> Result<(), ContractError> {
    from.require_auth();

    if amount <= 0 {
        return Err(ContractError::InvalidAmount);
    }

    let token_address = storage::get_token(&env).unwrap();

    let token = token::Client::new(
        &env,
        &token_address,
    );

    token.transfer(
        &from,
        &env.current_contract_address(),
        &amount,
    );

    let mut treasury = storage::get_treasury(&env).unwrap();

    treasury.balance += amount;
    treasury.total_received += amount;

    storage::save_treasury(
        &env,
        &treasury,
    );

    Ok(())
}

pub fn withdraw(
    env: Env,
    to: Address,
    amount: i128,
) -> Result<(), ContractError> {

    let admin = storage::get_admin(&env).unwrap();

    admin.require_auth();

    if amount <= 0 {
        return Err(ContractError::InvalidAmount);
    }

    let mut treasury = storage::get_treasury(&env).unwrap();

    if treasury.balance < amount {
        return Err(ContractError::InsufficientBalance);
    }

    let token_address = storage::get_token(&env).unwrap();

    let token = token::Client::new(
        &env,
        &token_address,
    );

    token.transfer(
        &env.current_contract_address(),
        &to,
        &amount,
    );

    treasury.balance -= amount;
    treasury.total_distributed += amount;

    storage::save_treasury(
        &env,
        &treasury,
    );

    Withdrawn {
        to,
        amount,
    }
    .publish(&env);

    Ok(())
}

pub fn change_admin(
    env: Env,
    new_admin: Address,
) -> Result<(), ContractError> {
    let old_admin = storage::get_admin(&env).unwrap();

    old_admin.require_auth();

    storage::set_admin(
        &env,
        &new_admin,
    );

    AdminChanged {
        old_admin,
        new_admin,
    }
    .publish(&env);

    Ok(())
}

pub fn get_treasury(
    env: Env,
) -> Treasury {
    storage::get_treasury(&env).unwrap()
}

