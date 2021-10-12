const Data = artifacts.require('Data')
const AppLogic = artifacts.require('AppLogic')

module.exports = async deployer => {
  try {
    await deployer.deploy(Data)
    const data = await Data.deployed()
    console.log('address: ', data.address)


    await deployer.deploy(AppLogic, data.address)
    const appLogic = await AppLogic.deployed()
    console.log('address: ', appLogic.address)
  } catch(err) {
    console.log('migration error:', err)
  }

}