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
				var historia = $scope.historia;
				if(!historia.pontuacao){
					//Nova historia ainda nao tem pontuacao!
				historia.pontuacao = 0;
				cadastroDeHistorias.cadastrar(historia)
				.then(function(dados) {
					$scope.mensagem = dados.mensagem;
					if (dados.inclusao) $scope.historia = {};
				})
				.catch(function(erro) {
					$scope.mensagem = erro.mensagem;
				});	
				}else{
					//historia ja tem pontuacao!
				cadastroDeHistorias.cadastrar($scope.historia)
				.then(function(dados) {
					$scope.mensagem = dados.mensagem;
					if (dados.inclusao) $scope.historia = {};
				})
				.catch(function(erro) {
					$scope.mensagem = erro.mensagem;
				});	
				}

			}
		};
	});