const ethClient = require('eth-client');
var Promise = require('bluebird');
const baseUrl = 'https://stg.zcom.thing-chain.site/';

function createPassword(len) {
    var c = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < len; i++) {
        id += c[Math.floor(Math.random() * c.length)];
    }
    return id;
};

password = createPassword(8);

var create_account = Promise.promisify(ethClient.Account.create);
create_account(baseUrl, password, function(err, instance) {
    if (err) {
        console.error(err);
    } else {
        console.log('address: ' + instance.getAddress());
        console.log('password: ' + password);
        console.log('key: ' + JSON.stringify(instance.serialize()));
    }
});
