angular.module('meusServicos', ['ngResource'])
	.factory('recursoHistorias', function($resource) {

		return $resource('/v1/historias/:historiaId', null, {
			'update' : { 
				method: 'PUT'
			}
		});
	})
	.factory("cadastroDeHistorias", function(recursoHistorias, $q) {
		var service = {};
		service.cadastrar = function(historia) {
			return $q(function(resolve, reject) {

				if(historia._id) {
					recursoHistorias.update({historiaId: historia._id}, historia, function() {
						resolve({
							mensagem: 'Historia ' + historia.titulo + ' atualizada com sucesso',
							inclusao: false
						});
					}, function(erro) {
						console.log(erro);
						reject({
							mensagem: 'Não foi possível atualizar a historia ' + historia.titulo
						});
					});

				} else {
					recursoHistorias.save(historia, function() {
						resolve({
							mensagem: 'Historia ' + historia.titulo + ' incluída com sucesso',
							inclusao: true
						});
					}, function(erro) {
						console.log(erro);
						reject({
							mensagem: 'Não foi possível incluir a historia ' + historia.titulo
						});
					});
				}
			});
		};
		return service;
    });