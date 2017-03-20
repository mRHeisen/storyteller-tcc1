module.exports = function(app){

	var api = app.api.auth;
	var apiUsuario = app.api.usuario;

	app.post('/autenticar', api.autentica);
	app.route('/v1/usuario')
        .get(apiUsuario.lista) //Buscar recurso com get / espera get e uma funcção
        .post(apiUsuario.adiciona);
        
	app.use('/*', api.verificaToken);

};