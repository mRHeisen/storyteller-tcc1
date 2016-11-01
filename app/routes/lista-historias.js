module.exports = function(app){

    var api = app.api.historia;
    //Define o indentificador da rota em um unico lugar
     app.route('/v1/historias')
        .get(api.lista) //Buscar recurso com get / espera get e uma funcção

    //Define o indentificador da rota em um unico lugar
     app.route('/v1/historias/:id')
      .get(api.buscaPorId) //Buscar historias pelo id

};