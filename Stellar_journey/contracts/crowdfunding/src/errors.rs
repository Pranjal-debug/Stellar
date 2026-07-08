use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Eq, PartialEq)]
#[repr(u32)]
pub enum ContractError {
    InternalError = 1,
}