const ethClient = require('eth-client'); 
var Promise = require('bluebird');
var DEMO_UTIL = require('./public/js/demo-util');

const cnsAddress = '0x43eda2ea219144e04c55630a449a6f169f0433c4';
const baseUrl = 'https://stg.zcom.thing-chain.site/';
const abi = [{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getData","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"provider","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"call","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sign","type":"bytes"},{"name":"_objectId","type":"bytes32"},{"name":"_dataHash","type":"bytes32"},{"name":"_name","type":"bytes32"}],"name":"sendData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isVersionContract","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sign","type":"bytes"},{"name":"_objectId","type":"bytes32"},{"name":"_fileNameHash","type":"bytes32"},{"name":"_dataHash","type":"bytes32"},{"name":"_name","type":"bytes32"}],"name":"sendFile","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"bytes32"}],"name":"getFile","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isVersionLogic","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"logic_v1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sign","type":"bytes"},{"name":"_symbol","type":"bytes32"},{"name":"_name","type":"bytes32"}],"name":"sendTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isVersionContractOrLogic","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cns","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getContractName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCns","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_cns","type":"address"},{"name":"_logic_v1","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

var password = '123456';
var account;
var contract;

const createRandBytes32 = function(len) {
   return '0x' + require('crypto').randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
};

//getFile Contract và objectID phải trung với Contract và objectID của sendFile
var objectID = createRandBytes32(32);


function Todo() {

 this.create = function(respone) {
	   var create = Promise.promisify(ethClient.Account.create);
 	  return create(baseUrl, password).then(function(response){
 		   account = response;
       contract = new ethClient.AltExecCnsContract(account, cnsAddress);
 	  });
  };
  
  this.call = function(respone) {
    const  contract = new ethClient.AltExecCnsContract(account, cnsAddress);
    return new Promise(function(resolve, reject) {
      contract.call(password, 'TestPerformanceContract', 'call', [], abi, function(err, res) {
          if (err) {
              reject(err);
          } else {
              console.log('call result : ',res);     
              resolve(res.body);
          }
      });   
    });
  };

  
 this.sendTransaction = function(respone) {
  	const  contract = new ethClient.AltExecCnsContract(account, cnsAddress);
    return new Promise(function(resolve, reject) {
      contract.sendTransaction(password, 'TestPerformanceContract', 'sendTransaction', [1, 'p2'], abi, function(err, txHash) {
        if (err) {
            reject(err);
            console.log('Error : ',err);
        } else {
          resolve(txHash);
          console.log(txHash);     
        }
      });   
    });
  };

  this.sendData = function(respone) {
    const  contract = new ethClient.AltExecCnsContract(account, cnsAddress);
    //console.log(DEMO_UTIL.createRandomId(32));
    return new Promise(function(resolve, reject) {
      contract.sendData(password, 'TestPerformanceContract', 'sendData', createRandBytes32() ,'giangpt1',['giangpt2'], abi, function(err, txHash) {
        if (err) {
            reject(err);
            console.error('Error : ',err);
        } else {
            resolve(txHash);
            console.log('sendData result : ',txHash);     
        }
      });   
    }); 
  };

  this.getData = function(respone) {
    const  contract = new ethClient.AltExecCnsContract(account, cnsAddress);
    return new Promise(function(resolve, reject) {
      contract.getData(password, 'TestPerformanceContract', 'getData', [123456], abi, function(err, res) {
        if (err) {
            reject(err);
            console.error('Error : ',err);
        } else {
          　resolve(res);
            res.map(function(d) {
              console.log(d);
            });
        }
      });  
    }); 
  };
  this.sendFile = function(respone) {
    //var objectID = createRandBytes32(32);
    var pathFile = './local_data/girl.png';
    //console.log('objectID : ', objectID);    
    return new Promise(function(resolve, reject) {
      contract.sendFile(password, 'TestPerformanceContract', 'sendFile', objectID ,'fileName.png', pathFile ,['file1'], abi, function(err, txHash) {
          if (err) {
              reject(err);
              console.log('error : ', err);
          } else {
              resolve(txHash);
              console.log('txHash : ', txHash);  
          }
        });   
      }); 
    }

  //getFile Contract và objectID phải trung với Contract và objectID của sendFile
  this.getFile = function(respone) {
    return new Promise(function(resolve, reject) {
      contract.getFile(password, 'TestPerformanceContract', 'getFile', [objectID], abi, function(err, res) {
        if (err) {
            reject(err);
            console.error('Error : ',err);
        } else {
          　resolve(res);
            const fileName = res.header['content-disposition'];
            console.log(fileName);   
        }
      });  
    }); 
  };
}

module.exports = new Todo();








