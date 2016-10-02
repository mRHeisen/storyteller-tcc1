module.exports = function(app){

	var api = app.api.genero;
	
    app.route('/v1/generos')
        .get(api.lista) //Buscar recurso com get / espera get e uma funcção
};