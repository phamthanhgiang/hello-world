var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use('/', express.static(__dirname + '/'));
app.use('/create_key', express.static(__dirname + '/create_key.html'));
app.use('/send_money', express.static(__dirname + '/send_money.html'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.post('/runtest/',function(req,res){
     console.log('vao router roi',req);
});

var server = app.listen(3000, function() {
  console.log('Server listening on port ' + server.address().port);
});