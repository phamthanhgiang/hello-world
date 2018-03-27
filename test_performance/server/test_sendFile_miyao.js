var todo = {};
var Promise = require('bluebird'),
    ethClientUtils = require('eth-client').utils,
    AltExecCnsParams = require('eth-client').AltExecCnsParams,
    fs = require('fs'),
    request = require('superagent');

const CnsAddress = '0x43eda2ea219144e04c55630a449a6f169f0433c4';
const baseUrl = 'https://stg.zcom.thing-chain.site'; 
const dummySign = '0x333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333331b';

const createRandBytes32 = function() {
    return '0x' + require('crypto').randomBytes(32).toString('hex');
};

//var registerdObjectId= createRandBytes32();
var registerdData;
var registerdDataHash;
var registerdFile;
var registerdFileHash;

todo.sendFile = function() {
    var registerdObjectId= createRandBytes32();
    registerdData = 'data' + Date.now();
    registerdDataHash = '0x' + ethClientUtils.hash(registerdData);
    registerdFile = { name: 'giang.txt', path: './local_data/giang.txt' };
    registerdFileHash = '0x' + ethClientUtils.hash(Buffer(fs.readFileSync(registerdFile.path)));

    let field = { 
        sign: dummySign, 
        input: { 
            cnsAddress: CnsAddress, 
            contractName: 'TestPerformanceContract', 
            functionName: 'sendFile', 
            params: 'giangpt', 
            objectId: registerdObjectId, 
            dataHash: registerdDataHash, 
            fileHash: registerdFileHash 
        }, 
        data: registerdData 
    };

    return new Promise(function(resolve, reject) {
        request
            .post( baseUrl + '/alt/cns/file')
            .attach(registerdFile.name, registerdFile.path)
            .field('input', JSON.stringify(field.input))
            .field('sign', field.sign)
            .field('data', field.data)
            .end(function(err, res) {
                if (err){
                    //console.log('error',err);
                    reject(err);
                    console.log(res.body.message);
                } 
                else {
                    console.log('txHash',res.body.txHash);
                    resolve(res.body.txHash);
                }
            });
     });
};


todo.getFile = function() {
    let sign = '0xbc57423269bcbe277b8835de4fd25c9205ffdca327d5ecb02346caa58a9fa7f54cdaf8f291f485cd04ef273e8bbd4ce0ee4a933e09be06e8f649f09d0aebae0b1c';
    let param = '0x4e57bb83093f69c5a06f8e0bc579000a2811b7e04c6b6ca4b5c26032d6064dce';
    let field = { sign: sign, input: { cnsAddress: CnsAddress, contractName: 'TestPerformanceContract', functionName: 'getFile', params: [param] } };
    console.log('fileNamekkkkk ', field);
    return new Promise(function(resolve, reject) {
        request
            .get( baseUrl + '/alt/cns/file')
            .query(field)
            .responseType('blob')
            .end(function(err, res) {
                if (err) {
                    reject(err);
                    console.log('Error : ',err);
                } else {
                    const fileName = res.header['content-disposition'];
                    console.log('fileNamekkkkk ', fileName);
                    resolve(res);
                }        
                        
            });
     });
};


module.exports = todo;