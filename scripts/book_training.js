const CLIENT_ADDRESS = '0x8CfA10aff69cbc9B9e64F7272AB34fD0eE9227A0'
const TRAINING_DATE = new Date('2021.12.31')

const getUnixTime = (date) => Math.floor(+date / 1000)
const formatDate = (date) => date.toLocaleString()

// Example of execution:
// Get 10 MAV tokens for 0x8CfA10aff69cbc9B9e64F7272AB34fD0eE9227A0
// Transaction hash: 0xba32599b7417c195e1f8fdd8caca0813176e593ee00ced1dd286e49dcc3162a0
//
// Transaction for 10 MAV tokens APPROVED for 0x8CfA10aff69cbc9B9e64F7272AB34fD0eE9227A0
// Transaction hash: 0xf6d19f9ad6acd0dfe7555a5635ccab43861e80efa0560c904d47eda0ba6593fb
//
// Paid 10 MAV tokens for date: 31/12/2021, 00:00:00 by client: 0x8CfA10aff69cbc9B9e64F7272AB34fD0eE9227A0
// Transaction hash: 0x6ee4bcf4b82298c3aa0796bcc974b7afc64bd7b3414b1b0b99998a51a5fe75cd
//
// Can client 0x8CfA10aff69cbc9B9e64F7272AB34fD0eE9227A0 train at 31/12/2021, 00:00:00 ? Answer: true

module.exports = () => {
  async function run() {
    const token = await artifacts.require('Token').deployed()
    const gym = await artifacts.require('Gym').deployed()

    // mint tokens for client
    const faucetTransaction = await token.faucet(CLIENT_ADDRESS, BigInt(10e18))
    console.info(`Get 10 MAV tokens for ${CLIENT_ADDRESS}`)
    console.info(`Transaction hash: ${faucetTransaction.receipt.transactionHash}\n`)

    // approve transaction for 1 training
    const approveTransaction = await token.approve(gym.address, BigInt(10e18), { from: CLIENT_ADDRESS })
    console.info(`Transaction for 10 MAV tokens APPROVED for ${CLIENT_ADDRESS}`)
    console.info(`Transaction hash: ${approveTransaction.receipt.transactionHash}\n`)

    // pay for 1 training for the specified date
    const paymentTransaction = await gym.pay(getUnixTime(TRAINING_DATE), { from: CLIENT_ADDRESS })
    console.info(`Paid 10 MAV tokens for date: ${formatDate(TRAINING_DATE)} by client: ${CLIENT_ADDRESS}`)
    console.info(`Transaction hash: ${paymentTransaction.receipt.transactionHash}\n`)

    // check if a client really can train on the date
    const canTrainTomorrow = await gym.canTrainAtDate(CLIENT_ADDRESS, getUnixTime(TRAINING_DATE))
    console.info(`Can client ${CLIENT_ADDRESS} train at ${formatDate(TRAINING_DATE)} ? Answer: ${canTrainTomorrow}`)

    process.exit(0)
  }

  run().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}
