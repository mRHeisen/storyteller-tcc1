angular.module('storyteller')
	.controller('UsuarioController', function($scope, $window, $location, $routeParams, $rootScope, recursoUsuario, recursoInsignia, cadastroDeUsuario) {

		$scope.mensagem = '';
		$scope.usuario = {};
		$scope.insignias = [];

		console.log($routeParams.usuarioId);
		if($routeParams.usuarioId) {
			recursoUsuario.get({usuarioId: $routeParams.usuarioId}, function(usuario) {
				if(usuario.login == $window.localStorage.login){
					$scope.usuario = usuario;
					for (var i = 0; i < usuario.insignia.length; i++) {
						recursoInsignia.query({nome: usuario.insignia[i]}, function(insignia){
							console.log(insignia[0]);
							$scope.insignias.push(insignia[0]);
							}, function(erro) {
							console.log(erro);
							$scope.mensagem = 'Não foi possível obter a insignias'
							$location.path('/erro');
							});
					};
				}else{
				$location.path('/erro');
			};
			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter a usuario'
				$location.path('/erro');
			});
		}
		$scope.submeter = function() {
			if ($scope.formulario.$valid && $scope.usuario.login == $window.localStorage.login) {
				var usuario = $scope.usuario;
				cadastroDeUsuario.cadastrar(usuario)
				.then(function(dados) {
					$scope.mensagem = dados.mensagem;
				})
				.catch(function(erro) {
					$scope.mensagem = erro.mensagem;
				});	
			}else{
				$location.path('/erro');
			};
		};

});