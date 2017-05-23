//Importa mongoose
var mongoose = require('mongoose');
//Cria objeto javaScrpit em branco
var api = {};
//Relaciona o model feito em models/genero para var model
var model = mongoose.model('Insignia');

//Retorna uma lista de insignia
api.lista = function(req, res){
	//Find passa um obect vazil e usa promess para obter resultado
	model
		.find({})
		.then(function(insignia){
			//Manda a lista de insignia se não houver erro em json
			res.json(insignia);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 500 na requisição e o erro em json
			res.status(500).json(error);
		});

};
api.buscaNome = function(req, res){
	//Find passa um obect vazil e usa promess para obter resultado
	var nome = req.query.nome;
	model
		.find({nome: nome})
		.then(function(insignia){
			console.log(insignia);
			//Manda a lista de insignia se não houver erro em json
			res.json(insignia);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 500 na requisição e o erro em json
			res.status(500).json(error);
		});

};

api.adiciona = function(req, res){
	//insignia recebida pelo req.body
	var insignia = req.body
	console.log(insignia);
	//Usa funçao do mongoose (create) para criar insignia, espera uma insignia recebida pelo req.body
	model
		.create(insignia)
		.then(function(insignia) {
			//Manda a insignia criado com o com id do MongoDB
			res.json(insignia)
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 500 na requisição e o erro em json
			res.status(500).json(error);
		});

};
api.removePorId = function(req, res){
	//Usa funçao do mongoose (remove) para remover, espera o criterio de remoção 	
	model
		.remove({_id: req.params.id})
		.then(function() {
			//Manda o status 204 na requisição que ocorreu tudo ok
			res.sendStatus(204);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 500 na requisição e o erro em json
			res.status(500).json(error);
		});

};
module.exports = api;