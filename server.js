var http =  require('http');

			   // mongodb://<MiguelAvilla>:<Miguel130992>@ds127190.mlab.com:27190/heroku_m2qb8tk1
var uristring = //'mongodb://MiguelAvilla:Miguel130992@ds127190.mlab.com:27190/heroku_m2qb8tk1';
 				'mongodb://localhost/storyteller_db';


var app = require('./config/express');
var port = process.env.PORT || 3000;
require('./config/database')(uristring);
http.createServer(app).listen(port, function(){
	console.log("Serividor Rodando no Heroku :D");
});