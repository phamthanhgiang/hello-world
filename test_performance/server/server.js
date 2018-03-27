var express = require('express');
var bodyparser = require('body-parser');
const ethClient = require('eth-client'); 
var Promise = require('bluebird');
var routes = require('./routes');

var app = express();
app.use('/', express.static(__dirname + '/'));
app.use('/ok', express.static(__dirname + '/index_ok.html'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.post('/runtest/',function(req,res){
     console.log('vao router roi',req);
});

var server = app.listen(3000, function() {
  console.log('Server listening on port ' + server.address().port);
});