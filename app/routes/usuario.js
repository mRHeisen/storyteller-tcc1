module.exports = function(app){

    var api = app.api.usuario;
    //Define o indentificador da rota em um unico lugar


    //Define o indentificador da rota em um unico lugar
     app.route('/v1/usuario/:id')
      .get(api.buscaPorId) //Buscar usuario pelo id
      .delete(api.removePorId) //Remove pelo id da usuario
      .put(api.atualiza) //Atuliza usuario pelo id

    app.route('/v1/insignias/usuario/:id')
      .get(api.minhasInsignias)//Buscar recurso com get / espera get e uma funcção
     
};