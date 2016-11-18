var http =  require('http');

var app = require('./config/express');
var port = process.env.PORT || 3000;
require('./config/database')('localhost/storyteller_db');
http.createServer(app).listen(port, function(){
	console.log("Serividor Rodando");
});