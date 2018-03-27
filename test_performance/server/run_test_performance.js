var RUN_TEST = {};
var Promise = require('bluebird');
var math = require('mathjs');
var todo = require('./test_performance');
var fs = require("fs");
var average = require('average');
var nodeXlsx = require('node-xlsx');

function condition(t,during) {
    const setTime = t + during;
    return setTime > Date.now();
}

var count_request = 0;
var begin_time;
var executionTimes = [];
var dataExcel = [];

var loop = Promise.coroutine(function* (during) {
    var interval = 1000;
   
    //直列で実行
    while(condition( begin_time, during)) {
        const start_time = Date.now();
        //yield todo.call();
        //yield todo.sendTransaction();
        //yield todo.sendData();
        //yield todo.getData();
        yield todo.sendFile();
        //yield todo.getFile();
        count_request = count_request + 1;
        const executionTime = Date.now() - start_time;
        
        executionTimes.push(executionTime);
        
        const sleep = Math.max(0, interval - executionTime);

        console.log(`${count_request}: ${executionTime}: ${sleep}`);
        let  arrTemp = [`${count_request}`,`${executionTime}`,`${sleep}`];
        dataExcel.push(arrTemp);


        yield Promise.delay(5000);
    }
});

RUN_TEST.run_test = function(during , rps ){
    let result = [];
    begin_time = Date.now();
    
    var start_test_time = new Date().toUTCString();
    console.log(`試験の開始時間 : ${start_test_time} `);
    
    let arrHeaderTitle = ['total_request','latency','sleep'];
    dataExcel.push(arrHeaderTitle);

    todo.create().then(function(response){

        //並列で実行
        var loops = [];
        for (var i = 1; i <= rps; ++i) {
            loops.push(loop(during));
        }

        return Promise.all(loops);
    }).then(function(req, res) {
        todo.getFile();
        var latency_avg = average(executionTimes);
        var latency_max = Math.max.apply(Math, executionTimes);

        console.log('-----------------end loop----------------');
        console.log('during :', during);
        console.log('rps :', rps);
        console.log('-------------------結果------------------');
        console.log('total_request:',count_request);

        var times = Date.now()-begin_time;
        console.log('かかった時間 : ', times);

        console.log(`latency(avg) : ${latency_avg} ms`);
        console.log(`latency(max) : ${latency_max} ms`);
        console.log('total_latency  : ',math.sum(executionTimes));

        var end_test_time = new Date().toUTCString();
        console.log(`試験の終了時間 : ${end_test_time} `);

        result.push(['シート名','during','rps','total_request','かかった時間','latency(avg)','latency(max)', '開始時間UTC','終了時間']);
        result.push([rps, during, rps,count_request, times, latency_avg, latency_max,  start_test_time, end_test_time]);

        let buffer = nodeXlsx.build([
                {name: `log_executionTime_${rps}`, data: dataExcel} , 
                {name: `試験の結果_${rps}`, data: result}
            ]);
        
        fs.open(`test_sendData_${rps}.xlsx`, 'w', function(err, fd) {
            if (err) {
                return console.error(err);
            }
            console.log("File open!"); 

            fs.writeFile(`test_sendData_${rps}.xlsx`, buffer,  function(err) {
                if (err) return console.error(err);
            });
     
            fs.close(fd, function(err){
                if (err)console.log(err);
                console.log("File closed");
            });
        });
    })        
}


module.exports = RUN_TEST;

RUN_TEST.run_test(1000,1);




