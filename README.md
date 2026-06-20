# Stellar Wallet Dashboard

A simple React-based Stellar dApp that allows users to connect their Freighter wallet, view their XLM balance, and send XLM transactions on the Stellar Testnet.

## Features

### Wallet Integration

* Connect Freighter Wallet
* Disconnect Wallet
* Display connected wallet address

### Balance Handling

* Fetch XLM balance from Stellar Testnet
* Display wallet balance in real time
* Refresh balance after successful transactions

### Transaction Functionality

* Send XLM to another Stellar account
* Sign transactions securely using Freighter
* Submit transactions to Stellar Testnet
* Display transaction status
* Display transaction hash
* Copy transaction hash to clipboard
* View transaction on Stellar Explorer

### User Experience

* Responsive UI
* Input validation
* Transaction feedback (Success / Failed / Submitting)
* Modern dashboard design

---

## Tech Stack

### Frontend

* React
* Vite

### Blockchain

* Stellar SDK
* Stellar Horizon API
* Stellar Testnet

### Wallet

* Freighter Wallet

---

## Project Structure

```text
src/
│
├── services/
│   ├── stellar.js
│   └── sendPayment.js
│
├── App.jsx
├── App.css
└── main.jsx
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

## Required Packages

```bash
npm install @stellar/stellar-sdk
npm install @stellar/freighter-api
```

---

## How It Works

### 1. Connect Wallet

The application connects to the user's Freighter wallet using:

```javascript
requestAccess()
```

The wallet address is then stored in React state.

---

### 2. Fetch Balance

The app loads account data from Stellar Horizon:

```javascript
server.loadAccount(publicKey)
```

The native XLM balance is extracted and displayed in the UI.

---

### 3. Build Transaction

A payment transaction is created using:

```javascript
new StellarSdk.TransactionBuilder(...)
```

The transaction includes:

* Sender account
* Destination account
* Amount
* Network configuration
* Base fee

---

### 4. Sign Transaction

The transaction is converted to XDR and signed using Freighter:

```javascript
signTransaction(xdr)
```

The private key never leaves the wallet.

---

### 5. Submit Transaction

The signed transaction is submitted to Stellar Testnet:

```javascript
server.submitTransaction(...)
```

A transaction hash is returned after successful submission.

---

## Security

This application never accesses or stores user private keys.

Transaction signing is handled entirely by Freighter Wallet.

Security flow:

```text
React App
    ↓
Build Transaction
    ↓
Freighter Wallet
    ↓
User Approval
    ↓
Transaction Signed
    ↓
Submit to Stellar
```

---

## Validation

The application validates:

* Wallet connection
* Destination address
* Transaction amount

Example:

```javascript
if (!publicKey) {
  alert("Connect wallet first");
  return;
}
```

---

## Stellar Testnet

This project uses Stellar Testnet for development and testing.

Testnet Horizon Endpoint:

```text
https://horizon-testnet.stellar.org
```

---

## Learning Outcomes

During development of this project, the following blockchain concepts were implemented and understood:

* Public Key vs Private Key
* Wallet Authentication
* Stellar Accounts
* Sequence Numbers
* Replay Protection
* Transaction Building
* XDR Serialization
* Digital Signatures
* Transaction Submission
* Blockchain State Updates

---

## Future Improvements

* Automatic wallet reconnection
* Transaction history
* Support for custom Stellar assets
* Soroban smart contract integration
* Dark / Light theme toggle
* Multi-wallet support

---

## Author

Pranjal Gupta

Built as part of a Stellar blockchain development learning project using React, Stellar SDK, and Freighter Wallet.
