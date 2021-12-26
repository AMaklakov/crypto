const Token = artifacts.require('Token')

module.exports = function (deployer) {
  deployer.deploy(Token, 'MAV', 'mav') // Our token will be called MAV
}
