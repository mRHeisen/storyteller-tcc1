angular.module('storyteller')
	.controller('CadastroUsuarioController', function($scope, $routeParams, cadastroDeUsuario, recursoUsuario) {
		 
		 $scope.usuario = {};
		 $scope.mensagem = '';

        $scope.submeter = function(login) {

			recursoUsuario.query({login: login}, function(usuario){
				if(usuario[0]){
					$scope.mensagem = 'login ja utilizado.';
				}else{
					if ($scope.formulario.$valid) {
						cadastroDeUsuario.cadastrar($scope.usuario)
						.then(function(dados) {
						$scope.mensagem = dados.mensagem;
					if (dados.inclusao) $scope.usuario = {};
						})
						.catch(function(erro) {
						$scope.mensagem = erro.mensagem;
						});
					}
				}
			},function(erro) {
			console.log(erro);
			});
		};	    

		$scope.ronaldo = function(login) {

				recursoUsuario.query({login: login}, function(usuario){
				if(usuario[0]){
					$scope.mensagem = 'login ja utilizado.';
				}else{
					if ($scope.formulario.$valid) {
				cadastroDeUsuario.cadastrar($scope.usuario)
				.then(function(dados) {
					$scope.mensagem = dados.mensagem;
					if (dados.inclusao) $scope.usuario = {};
				})
				.catch(function(erro) {
					$scope.mensagem = erro.mensagem;
				});
			}
					console.log("nao tem");
				}
				}, function(erro) {
				console.log(erro);
				});
            		
		};
}); 