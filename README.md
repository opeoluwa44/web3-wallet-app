Web3 Wallet App

A Sepolia wallet dashboard built with React, TypeScript, wagmi v3, and viem.

## Status

**Working today**

- Wallet connection with four states: connecting, reconnecting, connected, disconnected
- Handling for rejected connections and for browsers with no wallet
- Balance reading with loading, error, and refresh states

**Next**

- Sending ETH on Sepolia
- Transaction receipt tracking and failure states
- Unsupported-network detection

> Runs on the **Sepolia testnet only**. Never use a wallet that holds real funds.

## Tech stack

- React 19, TypeScript, Vite
- wagmi v3 and viem v2
- TanStack Query v5
- Vitest for unit tests

## Run locally

Requires Node.js and a browser wallet extension (for example MetaMask) set to Sepolia.

    npm install
    npm run dev
    npm test

## Learning log

I'm documenting what I build and learn in [DEVLOG.md](./docs/DEVLOG.md).
