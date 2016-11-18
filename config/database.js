module.exports = function(uri){
var mongoose = require('mongoose');

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
 
var mongodbUri = 'mongodb://miguelavilla:Miguel130992@ds157487.mlab.com:57487/heroku_f7vv86nb';

mongoose.connect(mongodbUri);

mongoose.connection.on('connected', function(){
	console.log("Contectado ao Mongo DB")
});

mongoose.connection.on('error', function(error){
		console.log('Erro na conexão: ' +error);

});

mongoose.connection.on('disconnected', function(){

	console.log('Desconectado do MongoDB');

});

process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log(' \nConexão fechada pelo término da aplicação');
		process.exit(0);
	});
});
};
