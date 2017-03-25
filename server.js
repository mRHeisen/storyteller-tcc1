var http =  require('http');

			   
var uristring = //'mongodb://MiguelAvilla:Miguel130992@ds131480.mlab.com:31480/heroku_dcqw0pkd';
 				'mongodb://localhost/storyteller_db';


var app = require('./config/express');
var port = process.env.PORT || 3000;
require('./config/database')(uristring);
http.createServer(app).listen(port, function(){
	console.log("Serividor Rodando no Heroku :D");
});