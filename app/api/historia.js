//Importa mongoose
var mongoose = require('mongoose');
//Cria objeto javaScrpit em branco
var api = {};
//Relaciona o model feito em models/historia para var model
var model = mongoose.model('Historia');

//Retorna uma lista de historias
api.lista = function(req, res){
	//Find passa um obect vazil e usa promess para obter resultado
	if(req.query.ranque){
		model
		.find({}).sort({pontuacao: -1}).limit(10)
		.then(function(historias){
			//Manda a lista de historias se não houver erro em json
			res.json(historias);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 500 na requisição e o erro em json
			res.status(500).json(error);
		});
	};
	if(req.query.genero){
		model
		.find({genero: req.query.genero})
		.then(function(historias){
			//Manda a lista de historias se não houver erro em json
			res.json(historias);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 500 na requisição e o erro em json
			res.status(500).json(error);
		});
	};
	if(!req.query.genero && !req.query.ranque){
		model
		.find({})
		.then(function(historias){
			//Manda a lista de historias se não houver erro em json
			res.json(historias);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 500 na requisição e o erro em json
			res.status(500).json(error);
		});
	};
	

};
//Busca historia pelo id
api.buscaPorId = function(req, res){
	//Usa funçao do mongoose(findById) para procura pelo id que é passado em req.params.id pega o id
	model
		.findById(req.params.id)
		.then(function(historia){
			//Se historia nao existis executa if e termina o fluxo e vai para função de error
			if(!historia) throw Error('Historia não encontrada');
			res.json(historia);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 404 na requisição e o erro em json
			res.status(404).json(error);
		});


};
//Remove historia pelo id
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
//Adiciona uma historia
api.adiciona = function(req, res){
	//historia recebida pelo req.body
	var historia = req.body
	//Usa funçao do mongoose (create) para criar historia, espera uma historia recebida pelo req.body
	model
		.create(historia)
		.then(function(historia) {
			//Manda a historia criado com o já com id do MongoDB
			res.json(historia)
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 500 na requisição e o erro em json
			res.status(500).json(error);
		});

};
api.atualiza = function(req, res){
	//Usa funçao do mongoose (findByIdAndUpdate) para procura pelo id que for passa e atulizar o mesmo documento no
	//MongoDB
	model
		.findByIdAndUpdate(req.params.id, req.body)
		.then(function(historia){ 
			//Manda a historia atualizada
			res.json(historia);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 500 na requisição e o erro em json
			res.status(500).json(error);
		});

};
api.pontuacao = function(req, res){
	//Usa funçao do mongoose (findByIdAndUpdate) para procura pelo id que for passa e atulizar o mesmo documento no
	//MongoDB
	model
		.findByIdAndUpdate(req.params.id, req.body)
		.then(function(historia){ 
			//Manda a pontuaçao atualizada
			res.json(historia);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 500 na requisição e o erro em json
			res.status(500).json(error);
		});


};

module.exports = api;
