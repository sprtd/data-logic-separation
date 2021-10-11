
const UpgradeContract = artifacts.require('UpgradeContract')


const truffleAssert = require('truffle-assertions')
let upgradeContract,  deployer, addr1, addr2, addr3, addr4



contract('UpgradeContract', async payloadAccounts => {

  deployer = payloadAccounts[0]
  addr1 = payloadAccounts[1]
  addr2 = payloadAccounts[2]
  addr3 = payloadAccounts[3]
  addr4 = payloadAccounts[4]


  beforeEach(async() => {
    upgradeContract = await UpgradeContract.deployed()
  })


  contract('Registration', () => {
    it('reverts non-deployer attempt to register user', async() => {
      const REVERT_MSG = 'Returned error: VM Exception while processing transaction: revert caller not owner -- Reason given: caller not owner.'
      const alpha1 = 'alpha1'

      try {
        await upgradeContract.registerEmployee(alpha1, true, addr1, {from: addr1})
        throw null
      } catch(err) {
        assert(err.message.startsWith(REVERT_MSG), `Expected ${REVERT_MSG} but got ${err.message} instead`)
      }
    })


    it('allows user registration by deployer', async () => {
      const alpha1 = 'alpha1'
      await upgradeContract.registerEmployee(alpha1, true, addr1, {from: deployer})
      const employeeRegistrationStatus = await upgradeContract.isEmployeeRegistered(alpha1)
      assert.isTrue(employeeRegistrationStatus)

    })
  })

})