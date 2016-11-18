var http =  require('http');
var httpProxy = require('http-proxy');

httpProxy.createProxyServer({
    target: 'http://localhost:3000',
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