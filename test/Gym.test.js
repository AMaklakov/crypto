const Gym = artifacts.require('Gym')

contract('Gym', async (accounts) => {
  let gym

  beforeEach(async () => {
    gym = await Gym.deployed()
  })

  describe('#unavailableDaysMap', () => {
    it('today is available by default', async () => {
      const today = Math.floor(Date.now() / 1000)
      const startOfToday = today - (today % (24 * 60 * 60))

      const isTodayUnavailable = await gym.unavailableDaysMap(startOfToday)

      assert.equal(isTodayUnavailable, false)
    })

    it('registers today as unavailable day', async () => {
      const today = Math.floor(Date.now() / 1000)
      const startOfToday = today - (today % (24 * 60 * 60))

      await gym.registerUnavailableDay(today)
      const isTodayUnavailable = await gym.unavailableDaysMap(startOfToday)

      assert.equal(isTodayUnavailable, true)
    })
  })
})
