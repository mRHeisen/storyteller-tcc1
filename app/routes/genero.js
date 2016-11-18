module.exports = function(app){

	var api = app.api.genero;
	
     app.route('/v1/generos')
        .get(api.lista) //Buscar recurso com get / espera get e uma funcção
        .post(api.adiciona);

    //Define o indentificador da rota em um unico lugar
     app.route('/v1/generos/:id')
     	.delete(api.removePorId) //Remove pelo id da historias
};