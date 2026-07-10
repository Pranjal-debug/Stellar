use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Eq, PartialEq)]
#[repr(u32)]
pub enum ContractError {
    Unauthorized = 1,
    CampaignNotFound = 2,
    CampaignClosed = 3,
    CampaignExpired = 4,
    AlreadyWithdrawn = 5,
    NoFundsAvailable = 6,
    AlreadyInitialized = 7,
    InvalidDeadline = 8,
    MinimumDonationNotMet = 9,
    GoalAlreadyReached = 10,
    Overflow = 11,
    InvalidGoal = 12,
    CampaignNotClosed = 13,
}