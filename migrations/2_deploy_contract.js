const UpgradeContract = artifacts.require('UpgradeContract')

module.exports = async deployer => {
  try {
    await deployer.deploy(UpgradeContract)
    const upgradeContract = await UpgradeContract.deployed()
    console.log('address: ', upgradeContract.address)
  } catch(err) {
    console.log('migration error:', err)
  }

}