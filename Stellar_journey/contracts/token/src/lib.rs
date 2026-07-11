#![no_std]

mod admin;
mod errors;
mod events;
mod storage;
mod token;
mod types;

use soroban_sdk::{
    contract,
    contractimpl,
    Address,
    Env,
};

#[contract]
pub struct TokenContract;

#[contractimpl]
impl TokenContract {
    pub fn initialize(
        env: Env,
        admin: Address,
    ) -> Result<(), errors::ContractError> {
        admin::initialize(
            env,
            admin,
        )
    }

    pub fn mint(
        env: Env,
        to: Address,
        amount: i128,
    ) -> Result<(), errors::ContractError> {
        token::mint(
            env,
            to,
            amount,
        )
    }

    pub fn transfer(
        env: Env,
        from: Address,
        to: Address,
        amount: i128,
    ) -> Result<(), errors::ContractError> {
        token::transfer(
            env,
            from,
            to,
            amount,
        )
    }

    pub fn balance(
        env: Env,
        owner: Address,
    ) -> i128 {
        token::balance(
            env,
            owner,
        )
    }

    pub fn total_supply(
        env: Env,
    ) -> i128 {
        token::total_supply(env)
    }
}