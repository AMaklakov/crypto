const Gym = artifacts.require('Gym')
const Token = artifacts.require('Token')

/**
 * Only 2 people may have trainings per day
 */
const MAX_CLIENTS_PER_DAY = 2

module.exports = async function (deployer, networks, accounts) {
  const token = await Token.deployed()
  return deployer.deploy(Gym, accounts[0], token.address, BigInt(10e18), MAX_CLIENTS_PER_DAY)
}
