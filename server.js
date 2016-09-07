var http =  require('http');

var app = require('./config/express');

require('./config/database')('localhost/storyteller_db');
http.createServer(app).listen(3000, function(){
	console.log("Serividor Rodando");
});