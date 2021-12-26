# Fitness / Gym practice task

Creates a simple smart contract that allows:

1. Paying for a training / booking it for a particular day
2. Checking if a client is able to train on a particular day

## Instructions

## Mnemonic

`https://iancoleman.io/bip39/`

Mnemonic from there:

```
depth fever bounce butter neck embrace range remember there silent online abuse
```

## Infura register

Project: `wss://rinkeby.infura.io/ws/v3/00f1373393ee451eb7bfc800cf9eaa19`

### Deployment

First step is `yarn compile`

Second one is to run `yarn deploy`

### Marking a day as a unavailable one

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

---

password for a wallet: j2nvKXR5ig7CT22
pass prase: depth fever bounce butter neck embrace range remember there silent online abuse

gym.pay(1640611368, { from: '0x8CfA10aff69cbc9B9e64F7272AB34fD0eE9227A0' })
