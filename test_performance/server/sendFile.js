const ethClient = require('eth-client'); 
var Promise = require('bluebird');
var DEMO_UTIL = require('./public/demo-util');
var fs = require("fs");

const cnsAddress = '0xb88af4197835a94ae98af88836fbedd48c6ab270';
const baseUrl = 'https://stg.zcom.thing-chain.site/';
const abi = [{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getData","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"provider","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"call","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sign","type":"bytes"},{"name":"_objectId","type":"bytes32"},{"name":"_dataHash","type":"bytes32"},{"name":"_name","type":"bytes32"}],"name":"sendData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isVersionContract","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isVersionLogic","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"logic_v1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sign","type":"bytes"},{"name":"_symbol","type":"bytes32"},{"name":"_name","type":"bytes32"}],"name":"sendTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isVersionContractOrLogic","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cns","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getContractName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCns","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_cns","type":"address"},{"name":"_logic_v1","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

var password = '123456';
var account;
var file = localStorage.getItem('key_file');
console.log('aaaaaaaaaaaaaaaaaaaaa', file);





 ethClient.Account.create(baseUrl, "password", function(err, _account) {
                    if (err) {
                        console.log(err);
                    } else {
                        account = _account;
                        var contract = new ethClient.AltExecCnsContract(account, cnsAddress);
                        contract.sendFile(password, 'TestPerformanceContract', 'sendFile', DEMO_UTIL.createRandomId(32) ,'giang.txt',file,['file1'], abi, function(err, txHash) {
                            if (err) {
                                console.error('Error : ',err);
                            } else {
                                console.log('sendFile result : ',txHash);     
                            }
                        });   
                    }
                });
  













