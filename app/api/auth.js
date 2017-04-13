module.exports = function(app) {
//Importa mongoose
var mongoose = require('mongoose');
//Importa jsonwebtoken
var jwt = require('jsonwebtoken');
//Cria objeto javaScrpit em branco
var api = {};
//Relaciona o model
var model = mongoose.model('Usuario');

api.autentica = function(req,res){
	//Encontra apenas 1 usuario no banco usando o que foi passado na aplicação angular pelo req.body
	model
	.findOne({login: req.body.login, senha: req.body.senha})
	.then(function(usuario){
		//Se o usuario nao for encontrado imprime no console a msg e manda status 401 nao autorizado
		if(!usuario) {
			console.log('Login e senha inválidos')
			res.sendStatus(401);
		} else {
			//Cria token com a função sign do jsonWebToken que assina o token
			var token = jwt.sign({login: usuario.login}, app.get('secret'), {
				expiresIn: 84600
			});
            console.log('Autenticado: token adicionado na resposta');
            res.set('x-access-token', token); // adicionando token no cabeçalho de resposta
            res.end(); // enviando a resposta
             }

	}, function(error){
		console.log('Login e senha inválidos')
		res.sendStatus(401);
	});

};

api.verificaToken = function(req,res, next){
	// Acessa a informação x-access-token do cabeçalho da requisição
	var token = req.headers['x-access-token'];
	if(token) {
		console.log('Verificando Token...')
		//Utiliza função verify do jsonWebToken para verificar o token
		jwt.verify(token, app.get('secret'), function(error, decoded){
		if(error) {
			console.log('Token regeitado');
			res.sendStatus(401);
		}
		//Guarda a informação decodificado no usuario
		req.usuario = decoded;
		// libera as proximos midlware
		next();
		});
	}else{
		console.log('Token não foi enviado');
		res.sendStatus(401);
	}
};
	//Retorna api
	return api;
}
