//Importa mongoose
var mongoose = require('mongoose');
//Cria objeto javaScrpit em branco
var api = {};
//Relaciona o model feito em models/usuario para var model
var model = mongoose.model('Usuario');

api.testeApi = function(req, res){
console.log("entrou na apiTeste Usuario");
};
//Retorna uma lista de usuarios
api.lista = function(req, res){
	//Find passa um obect vazil e usa promess para obter resultado
		if(req.query.login){
		model
		.find({login: req.query.login}, 'login')
		.then(function(usuarios){
			//Manda a lista de usuarios se não houver erro em json
			res.json(usuarios);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 500 na requisição e o erro em json
			res.status(500).json(error);
		});
	}else{
		model
		.find({}, 'nome login')
		.then(function(usuarios){
			//Manda a lista de usuarios se não houver erro em json
			res.json(usuarios);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 500 na requisição e o erro em json
			res.status(500).json(error);
		});
	};
};
//Busca usuario pelo id
api.buscaPorId = function(req, res){
	//Usa funçao do mongoose(findById) para procura pelo id que é passado em req.params.id pega o id
	model
		.findById(req.params.id)
		.then(function(usuario){
			//Se usuario nao existis executa if e termina o fluxo e vai para função de error
			if(!usuario) throw Error('usuario não encontrada');
			res.json(usuario);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 404 na requisição e o erro em json
			res.status(404).json(error);
		});
};
//Remove usuario pelo id
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
//Adiciona uma usuario
api.adiciona = function(req, res){
	//usuario recebida pelo req.body
	var usuario = req.body
	//Usa funçao do mongoose (create) para criar usuario, espera uma usuario recebida pelo req.body
	model
		.create(usuario)
		.then(function(usuario) {
			//Manda a usuario criado com o já com id do MongoDB
			res.json(usuario)
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
		.then(function(usuario){ 
			//Manda a usuario atualizada
			res.json(usuario);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 500 na requisição e o erro em json
			res.status(500).json(error);
		});

};
api.minhasInsignias = function(req, res){
	//Usa funçao do mongoose(findById) para procura pelo id que é passado em req.params.id pega o id
	model
		.findById(req.params.id, req.body).select({ insignia: 1})
		.then(function(usuario){
			//Se usuario nao existis executa if e termina o fluxo e vai para função de error
			if(!usuario) throw Error('usuario não encontrada');
			res.json(usuario);
		}, function(error){
			//Mostra o erro no console
			console.log(error);
			//Manda o status 404 na requisição e o erro em json
			res.status(404).json(error);
		});
};
module.exports = api;

