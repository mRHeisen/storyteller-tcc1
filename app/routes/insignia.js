module.exports = function(app){

	var api = app.api.insignia;
	
     app.route('/v1/insignia')
        .get(api.lista) //Buscar recurso com get / espera get e uma funcção
        .post(api.adiciona);

     app.route('/v1/minhas/insignia')
      	.get(api.buscaNome); //Buscar recurso com get / espera get e uma funcção

     app.route('/v1/insignia/:id')
     	.delete(api.removePorId) //Remove pelo id da insignia
};