const config = require('../config.json'),
    AddressGroup_v1 = artifacts.require('../../gmo/contracts/AddressGroup_v1.sol'),
    ContractNameService = artifacts.require('./ContractNameService.sol');

module.exports = function(deployer, network, accounts) {
    deployer.deploy(ContractNameService).then(function() {
        return ContractNameService.at(config.gmoCns).getLatestContract('AddressGroup');
    });
}
