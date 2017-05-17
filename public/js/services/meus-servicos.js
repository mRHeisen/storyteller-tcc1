angular.module('meusServicos', ['ngResource'])
	.factory('recursoHistorias', function($resource) {

		return $resource('/v1/historias/:historiaId', null, {
			'update' : { 
				method: 'PUT'
			},
			'patch' : { 
				method: 'PATCH'
			}
		});
	})
	.factory('recursoUsuario', function($resource) {

		return $resource('/v1/usuario/:usuarioId', null, {
			'update' : { 
				method: 'PUT'
			},
			'patch' : { 
				method: 'PATCH'
			}
		});
	})
	.factory("cadastroDeUsuario", function(recursoUsuario, $q) {
		var service = {};
		service.cadastrar = function(usuario) {
			return $q(function(resolve, reject) {

				if(usuario._id) {
					console.log("sasa");
					recursoUsuario.update({usuarioId: usuario._id}, usuario, function() {
						resolve({
							mensagem: 'Usuario ' + usuario.login + ' atualizada com sucesso',
							inclusao: false
						});
					}, function(erro) {
						console.log(erro);
						reject({
							mensagem: 'Não foi possível atualizar  o usuario ' + usuario.login
						});
					});

				} else {
					console.log(usuario);
					recursoUsuario.save(usuario, function() {
						resolve({
							mensagem: 'Usuario ' + usuario.login + ' incluída com sucesso',
							inclusao: true
						});
					}, function(erro) {
						console.log(erro);
						reject({
							mensagem: 'Não foi possível incluir o usuario ' + usuario.login
						});
					});
				}
			});
		};
		return service;
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
		service.atualizarPontuacao = function(historiaId, pontuacao, votos) {
			return $q(function(resolve, reject) {
				recursoHistorias.patch({historiaId: historiaId}, {pontuacao: pontuacao, votos: votos}, function() {
						resolve({
							inclusao: false
						});
					}, function(erro) {
						console.log(erro);
						reject({
							mensagem: 'Não foi possível atualizar a historia ' + historia.titulo
						});
					});
			});
		};
		return service;
    });