module.exports = function(app){

    var api = app.api.historia;
    //Define o indentificador da rota em um unico lugar
     app.route('/v1/historias')
        .get(api.lista) //Buscar recurso com get / espera get e uma funcção
        .post(api.adiciona);

    //Define o indentificador da rota em um unico lugar
     app.route('/v1/historias/:id')
      .get(api.buscaPorId) //Buscar historias pelo id
      .delete(api.removePorId) //Remove pelo id da historias
      .put(api.atualiza) //Atuliza historias pelo id
      .patch(api.pontuacao); //Atualiza puntuacao


};