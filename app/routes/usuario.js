module.exports = function(app){

    var api = app.api.usuario;
    //Define o indentificador da rota em um unico lugar


    //Define o indentificador da rota em um unico lugar
     app.route('/v1/usuario/:id')
      .get(api.buscaPorId) //Buscar historias pelo id
      .delete(api.removePorId) //Remove pelo id da historias
      .put(api.atualiza) //Atuliza historias pelo id
     
};