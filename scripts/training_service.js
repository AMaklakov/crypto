const inquirer = require('inquirer')

const rand = () => Math.floor(Math.random() * 1000000)

module.exports = () => {
  async function run() {
    const value = rand()

    const prompt = await inquirer.prompt([
      {
        type: 'input',
        name: 'date',
        message: `Date of training`,
      },
      {
        type: 'input',
        name: 'sign',
        message: `Sign ${value}`,
      },
    ])

    // Use web3.eth.personal.sign(msg, account) to sign from console
    const guest = await web3.eth.personal.ecRecover(`${value}`, prompt.sign)

    const Gym = artifacts.require('Gym')
    const gym = await Gym.deployed()

    const canTrain = await gym.canTrainAtDate(prompt.date, guest)
    if (canTrain) {
      console.log(`User ${guest} can train on date: ${prompt.date}.`)
      // open doors for the client
      process.exit()
    } else {
      console.error('Auth failed')
    }
  }

  run().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}
