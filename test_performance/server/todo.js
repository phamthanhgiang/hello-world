const ethClient = require('eth-client'); 
var Promise = require('bluebird');

const cnsAddress = '0xb88af4197835a94ae98af88836fbedd48c6ab270';
const baseUrl = 'https://stg.zcom.thing-chain.site/';
const abi = [{"constant":true,"inputs":[],"name":"provider","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isVersionContract","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isVersionLogic","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"someMethod","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isVersionContractOrLogic","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cns","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getContractName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCns","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_cns","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

var password = '123456';
var account;

function Todo() {
 this.create = function(respone) {
	var create = Promise.promisify(ethClient.Account.create);
 	return create(baseUrl, password).then(function(response){
 		console.log('------------Create Account-----------------');
 		account = response;
 	});
  };
  
 this.call = function(respone) {
  	const  contract = new ethClient.AltExecCnsContract(account, cnsAddress);
  	contract.call(password, 'SomeContract', 'someMethod', [], abi, function(err, res) {
  		if (err) {
  			console.log(err);
  		} else {   
  			console.log(res);     
  		}
  	});		
  };
}

module.exports = new Todo();





