module.exports = function(uri){
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + uri);

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
