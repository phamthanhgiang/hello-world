//var todo = require('index.html');
//var RUN_TEST = require('./run_test_performance');
  
module.exports = {
  configure: function(app) {
    /*app.get('/', function(req, res) {
      //todo;
    });*/
    app.post('/runtest/', function(req, res) {
    	console.log('vao router roi',req);
      //RUN_TEST.run_test(1000,1,req.params.data);
    });
  }
};