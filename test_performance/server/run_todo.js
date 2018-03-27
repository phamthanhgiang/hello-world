var Promise = require('bluebird');
var co = require('co');
var math = require('mathjs');
var todo = require('./todo');
var fs = require("fs");
var average = require('average');
var begin_time;
var count_request = 0;

function condition(t,during) {
    const setTime = t + during;
    return setTime > Date.now();
}

function call() {
    return Promise.resolve(todo.call());
}


let request;
var loop = Promise.coroutine(function* (during,rps) {
    var interval = 1000/rps ;
    
    begin_time = Date.now();   
    var temp = [];
    var executionTimes = [];

    while(condition(begin_time,during)) {
        const start_time = Date.now();
        request = yield call();
       
        count_request = count_request + 1;
        const executionTime = Date.now() - start_time;
        
        executionTimes.push(executionTime);
        temp.push(`${count_request}: ${executionTime}`);
        console.log(`${count_request}: ${executionTime}`);

        const sleep = Math.max(0, interval - executionTime);
        yield Promise.delay(sleep);
    }

    console.log('during :', during);
    console.log('rps :', rps);
    console.log('---結果---');
    console.log('total_request:',count_request);
    console.log('かかった時間 : ',Date.now()-begin_time);
    console.log('Latency  : ',average(executionTimes));
    console.log('Sum  : ',math.sum(executionTimes));
    
    fs.open('log_executionTime.txt', 'w', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("File open!"); 

        fs.writeFile('log_executionTime.txt', temp.join('\n'),  function(err) {
            if (err) {
                return console.error(err);
            } 
        });
     
        fs.close(fd, function(err){
            if (err){
                console.log(err);
            } 
            console.log("File closed");
        });

    });
});


todo.create().then(function(response){
    console.log('------------Call loop-----------------');
    loop(60000,3);
});








