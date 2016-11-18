var http =  require('http');


httpProxy.createProxyServer({
    target: 'https://storytellerx.herokuapp.com/',
    toProxy: true,
    changeOrigin: true,
    xfwd: true
});


var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/storyteller_db';

var app = require('./config/express');
var port = process.env.PORT || 3000;
require('./config/database')(uristring);
http.createServer(app).listen(port, function(){
	console.log("Serividor Rodando");
});