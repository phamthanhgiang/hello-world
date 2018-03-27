const config = require('../config.json'),
		ContractNameService = artifacts.require('./ContractNameService.sol'),
        TestPerformanceContract_v1 = artifacts.require('./TestPerformanceContract_v1.sol'),
        TestPerformanceContractLogic_v1 = artifacts.require('./TestPerformanceContractLogic_v1.sol');
      

module.exports = function(deployer) {
    deployer.deploy(TestPerformanceContractLogic_v1, ContractNameService.address , config.gmoCns).then(function(){
        return deployer.deploy(TestPerformanceContract_v1, ContractNameService.address, TestPerformanceContractLogic_v1.address);
    }).then(function() {
        return ContractNameService.deployed();
    }).then(function(instance) {
        return instance.setContract('TestPerformanceContract', 1, TestPerformanceContract_v1.address, TestPerformanceContractLogic_v1.address);
    });
}



