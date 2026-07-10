use soroban_sdk::contracttype;

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct Treasury {
    pub balance: i128,
    pub total_received: i128,
    pub total_distributed: i128,
}