angular.module('storyteller')
	.controller('UsuarioController', function($scope, $window, $location, $routeParams, $rootScope, recursoUsuario, cadastroDeUsuario) {

		$scope.mensagem = '';
		$scope.usuario = {};

		console.log($routeParams.usuarioId);
		if($routeParams.usuarioId) {
			recursoUsuario.get({usuarioId: $routeParams.usuarioId}, function(usuario) {
				if(usuario.login == $window.localStorage.login){
					$scope.usuario = usuario;
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