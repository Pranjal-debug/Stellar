use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Eq, PartialEq)]
#[repr(u32)]
pub enum ContractError {
    AlreadyInitialized = 1,
    Unauthorized = 2,
    InvalidAmount = 3,
    InsufficientBalance = 4,
}