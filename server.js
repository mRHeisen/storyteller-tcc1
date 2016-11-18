var http =  require('http');
var httpProxy = require('http-proxy');

httpProxy.createProxyServer({
    target: 'https://storytellerxx.herokuapp.com/',
    toProxy: true,
    changeOrigin: true,
    xfwd: true
});

var uristring = 'mongodb://miguelavilla:Miguel130992@ds157487.mlab.com:57487/heroku_f7vv86nb';


var app = require('./config/express');
var port = process.env.PORT || 3000;
require('./config/database')(uristring);
http.createServer(app).listen(port, function(){
	console.log("Serividor Rodando");
});