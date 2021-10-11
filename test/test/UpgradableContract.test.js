
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
    it('reverts non-deployer attempt to register employee', async() => {
      const REVERT_MSG = 'Returned error: VM Exception while processing transaction: revert caller not owner -- Reason given: caller not owner.'
      const alpha1 = 'alpha1'

      try {
        await upgradeContract.registerEmployee(alpha1, true, addr1, {from: addr1})
        throw null
      } catch(err) {
        assert(err.message.startsWith(REVERT_MSG), `Expected ${REVERT_MSG} but got ${err.message} instead`)
      }
    })


    it('Registers employee, adds sale and employee\'s bonus', async () => {
      const alpha1 = 'alpha1'
      const alpha2 = 'alpha2'
      await upgradeContract.registerEmployee(alpha1, true, addr1, {from: deployer})
      await upgradeContract.registerEmployee(alpha2, true, addr2, {from: deployer})
      const employeeRegistrationStatus = await upgradeContract.isEmployeeRegistered(alpha1)
      const employeeRegistrationStatus2 = await upgradeContract.isEmployeeRegistered(alpha1)

      assert.isTrue(employeeRegistrationStatus)
      assert.isTrue(employeeRegistrationStatus2)
      const sale = 500
      const sale2 = 200
      await upgradeContract.addSale(alpha1, sale, {from: deployer})
      const bonus = await upgradeContract.getEmployeeBonus(alpha1)
      console.log({'bonus ': bonus})
      
      await assert.equal(bonus.toNumber(), 50)
      
      await upgradeContract.addSale(alpha1, sale2, {from: deployer})
      const bonus2 = await upgradeContract.getEmployeeBonus(alpha1)
      const finalBonus = 50 + 14
      console.log({'bonus ': bonus2})
      assert.equal(bonus2.toNumber(), finalBonus)
    })
  })

})