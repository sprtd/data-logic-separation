
const AppLogic = artifacts.require('AppLogic')
const Data = artifacts.require('Data')


const truffleAssert = require('truffle-assertions')
let appLogic, data, deployer, addr1, addr2, addr3, addr4



contract('AppLogic', async payloadAccounts => {

  deployer = payloadAccounts[0]
  addr1 = payloadAccounts[1]
  addr2 = payloadAccounts[2]
  addr3 = payloadAccounts[3]
  addr4 = payloadAccounts[4]



  beforeEach(async() => {
    data= await Data.deployed()
    appLogic = await AppLogic.deployed()

  })


 

  contract('Add Sale', () => {
    it('Allows deployer register employee', async () => {
      const alpha2 = 'alpha2'
      const alpha1 = 'alpha1'
      const registerEmployee1 = await data.registerEmployee(alpha1, true, addr1, {from: deployer})
      const registerEmployee2 = await data.registerEmployee(alpha2, true, addr2, {from: deployer})
      const employeeRegistrationStatus =  await data.isEmployeeRegistered(alpha1)
      const employeeRegistrationStatus2 =  await data.isEmployeeRegistered(alpha2)
      console.log('status here', employeeRegistrationStatus)
      console.log('status here 2', employeeRegistrationStatus2)

      assert.isTrue(employeeRegistrationStatus)
      assert.isTrue(employeeRegistrationStatus2)

      truffleAssert.eventEmitted(registerEmployee1, 'LogRegistered', ev => {
        return ev.account === addr1
      })

      truffleAssert.eventEmitted(registerEmployee2, 'LogRegistered', ev => {
        return ev.account === addr2
      })
      
  

      const sale = 500
      const sale2 = 200
      await appLogic.addSale(alpha1, sale, {from: deployer})
      const bonus = await data.getEmployeeBonus(alpha1)
      const totalSales1 = await data.getEmployeeSales(alpha1)
      console.log({'bonus ': bonus})
      console.log({'sales ': totalSales1})
      
      await assert.equal(bonus.toNumber(), 50)
      await assert.equal(totalSales1.toNumber(), sale)
      
      await appLogic.addSale(alpha1, sale2, {from: deployer})
      const bonus2 = await data.getEmployeeBonus(alpha1)
      const totalSales2 = await data.getEmployeeSales(alpha1)
      const finalBonus = 50 + 14
      console.log({'bonus ': bonus2})
      console.log({'sales 2 ': totalSales2})
      assert.equal(bonus2.toNumber(), finalBonus)
      assert.equal(totalSales2.toNumber(), sale + sale2)

    })
  })

})