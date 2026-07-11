use soroban_sdk::{
    Address,
    Env,
};

use crate::{
    errors::ContractError,
    events::{Minted, Transfer},
    storage,
};

pub fn mint(
    env: Env,
    to: Address,
    amount: i128,
) -> Result<(), ContractError> {

    let admin = storage::get_admin(&env).unwrap();

    admin.require_auth();

    if amount <= 0 {
        return Err(ContractError::InvalidAmount);
    }

    let balance = storage::get_balance(
        &env,
        &to,
    );

    storage::set_balance(
        &env,
        &to,
        balance + amount,
    );

    let supply = storage::get_total_supply(&env);

    storage::set_total_supply(
        &env,
        supply + amount,
    );

    Minted {
        to,
        amount,
    }
    .publish(&env);

    Ok(())
}

pub fn transfer(
    env: Env,
    from: Address,
    to: Address,
    amount: i128,
) -> Result<(), ContractError> {

    from.require_auth();

    if amount <= 0 {
        return Err(ContractError::InvalidAmount);
    }

    let sender_balance = storage::get_balance(
        &env,
        &from,
    );

    if sender_balance < amount {
        return Err(ContractError::InsufficientBalance);
    }

    let receiver_balance = storage::get_balance(
        &env,
        &to,
    );

    storage::set_balance(
        &env,
        &from,
        sender_balance - amount,
    );

    storage::set_balance(
        &env,
        &to,
        receiver_balance + amount,
    );

    Transfer {
        from,
        to,
        amount,
    }
    .publish(&env);

    Ok(())
}

pub fn balance(
    env: Env,
    owner: Address,
) -> i128 {
    storage::get_balance(
        &env,
        &owner,
    )
}

pub fn total_supply(
    env: Env,
) -> i128 {
    storage::get_total_supply(&env)
}