
const Data = artifacts.require('Data')


const truffleAssert = require('truffle-assertions')
let  data,  deployer, addr1, addr2, addr3, addr4



contract('Data Contract', async payloadAccounts => {

  deployer = payloadAccounts[0]
  addr1 = payloadAccounts[1]
  addr2 = payloadAccounts[2]
  addr3 = payloadAccounts[3]
  addr4 = payloadAccounts[4]


  beforeEach(async() => {
    data = await Data.deployed()
  })


  contract('Revert', () => {
    it('Reverts non-deployer attempt to register employee', async() => {
      const REVERT_MSG = 'Returned error: VM Exception while processing transaction: revert caller not owner -- Reason given: caller not owner.'
      const alpha1 = 'alpha1'

      try {
        await data.registerEmployee(alpha1, true, addr1, {from: addr1})
        throw null
      } catch(err) {
        console.log('error message here', err.message)
        assert(err.message.startsWith(REVERT_MSG), `Expected ${REVERT_MSG} but got ${err.message} instead`)
      }
    })

    it('Reverts attempt to re-register already registered employee', async() => {
      const REVERT_MSG = 'Returned error: VM Exception while processing transaction: revert empl. already registered -- Reason given: empl. already registered.'
      const alpha1 = 'alpha1'
      await data.registerEmployee(alpha1, true, addr1, {from: deployer})

      try {
        await data.registerEmployee(alpha1, true, addr1, {from: deployer})
        throw null
      } catch(err) {
        console.log('error message here', err.message)
        assert(err.message.startsWith(REVERT_MSG), `Expected ${REVERT_MSG} but got ${err.message} instead`)
      }
    })
  
    
    contract('Successful Registration', () => {
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
  
        // truffleAssert.eventEmitted(registerEmployee1, 'LogRegistered', ev => {
        //   return ev.account === addr1
        // })
        // truffleAssert.eventEmitted(registerEmployee2, 'LogRegistered', ev => {
        //   return ev.account === addr2
        // })
       
      })

    })

    
  })

})