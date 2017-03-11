angular.module('storyteller')
	.controller('HistoriaController', function($scope, recursoHistorias, $routeParams, $window, cadastroDeHistorias) {


		$scope.historia = {};
		$scope.mensagem = '';

		if($routeParams.historiaId) {
			recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				$scope.historia = historia; 
			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter a historia'
			});
		}

		$scope.submeter = function() {

			if ($scope.formulario.$valid) {
				$scope.historia.autor = $window.sessionStorage.login;
				cadastroDeHistorias.cadastrar($scope.historia)
				.then(function(dados) {
					$scope.mensagem = dados.mensagem;
					if (dados.inclusao) $scope.historia = {};
				})
				.catch(function(erro) {
					$scope.mensagem = erro.mensagem;
				});
			}
		};
	});