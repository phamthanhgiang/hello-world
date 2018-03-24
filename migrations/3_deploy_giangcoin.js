const config = require('../config.json'),
    ContractNameService = artifacts.require('zcom-contracts/contracts/ContractNameService.sol'),
    GiangCoinContract_v1 = artifacts.require('./GiangCoinContract_v1.sol'),
    GiangCoinLogic_v1 = artifacts.require('./GiangCoinLogic_v1.sol'),
    GiangCoinAccountTable_v1 = artifacts.require('./GiangCoinAccountTable_v1.sol'),
    GiangCoinEvent_v1 = artifacts.require('./GiangCoinEvent_v1.sol');

module.exports = function(deployer) {
    deployer.deploy(GiangCoinEvent_v1, ContractNameService.address)
    .then(function() {
        return deployer.deploy(GiangCoinAccountTable_v1, ContractNameService.address);
    }).then(function() {
        return deployer.deploy(GiangCoinLogic_v1, ContractNameService.address, GiangCoinAccountTable_v1.address, GiangCoinEvent_v1.address);
    }).then(function() {
        return deployer.deploy(GiangCoinContract_v1, ContractNameService.address, GiangCoinLogic_v1.address);
    }).then(function() {
        return ContractNameService.deployed();
    }).then(function(instance) {
        return instance.setContract('GiangCoin', 1, GiangCoinContract_v1.address, GiangCoinLogic_v1.address);
    });
}
