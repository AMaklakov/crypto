# Fitness / Gym practice task

Creates a simple smart contract that allows:

1. Paying for a training / booking it for a particular day
2. Checking if a client is able to train on a particular day

## Addresses

Token MAV: `0x0803Deb0E61F78B3E81d6c3FE2fC501F061113a8`

Gym: `0xcc8c8bB295255967E2f9D0dA448e7B4D4E68Da37`

## Accounts

```text
truffle(rinkeby)> accounts
[
  '0x3fA069D9560D85C932d2511A2a09B19De32dFA37', // owner
  '0x8CfA10aff69cbc9B9e64F7272AB34fD0eE9227A0', // client who wants to pay for a training
  '0x8E985725b45C7ef29F397E320a5384a8DBa0fbdb',
  '0xcA8dC67e2a9bfD478ea5D8770B22419c2a4b7AD9',
  '0x473071f6f6998a3c049603714bb828f3E23f7E50',
  '0x771561DdC73af4254bD7Ce83eE41396d3a50Bc0a',
  '0x62d81ba2Aa4fF5B98f549f9500B7D63Af6AAd6Ce',
  '0x87f93303E800b860Bc40A39255B66c4f67DEC555',
  '0x8fC81F1D818aA675b293b06c3eEAe8d9F4052158',
  '0x2aAcd3963f0eC92072aDee3AB684eD4e8fcf97fc'
]
```

## Example of `yarn book-training` run

Get 10 MAV tokens for 0x8CfA10aff69cbc9B9e64F7272AB34fD0eE9227A0  
Transaction hash: 0x73f697462ca2810623633b7d497c6e8ece54243682564e237d189299c589057f

Transaction for 10 MAV tokens APPROVED for 0x8CfA10aff69cbc9B9e64F7272AB34fD0eE9227A0  
Transaction hash: 0x30e11d2b05f2da03f31b4a76db32901afafa08784b9c7d67277c7220b4be4b6d

Paid 10 MAV tokens for date: 31/12/2021, 00:00:00 by client: 0x8CfA10aff69cbc9B9e64F7272AB34fD0eE9227A0  
Transaction hash: 0xf5967abed6bde58dc7701d4e3f70273f971306d1d1c7f1e414c6e15055770d30

## Verification of contracts

Thanks to https://forum.openzeppelin.com/t/how-to-verify-with-hardhat-or-truffle-a-smart-contract-using-openzeppelin-contracts/4119

```
➜  crypto git:(main) ✗ yarn truffle:verify
yarn run v1.22.17
$ ./node_modules/.bin/truffle run verify Gym --network rinkeby
Verifying Gym
Pass - Verified: https://rinkeby.etherscan.io/address/0xcc8c8bB295255967E2f9D0dA448e7B4D4E68Da37#code
Successfully verified 1 contract(s).
✨  Done in 23.34s.
```

## Subgraph

Thanks to this tutorial: https://thegraph.com/docs/en/developer/quick-start/

Deployed subgraph: https://thegraph.com/studio/subgraph/mav/

Subgraph: https://testnet.thegraph.com/subgraph?id=0x3fa069d9560d85c932d2511a2a09b19de32dfa37-1
