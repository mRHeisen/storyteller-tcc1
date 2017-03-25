angular.module('storyteller')
	.controller('HistoriaController', function($scope, $location, recursoHistorias, $routeParams, $window, cadastroDeHistorias) {


		$scope.historia = {};
		$scope.mensagem = '';

		if($routeParams.historiaId) {
			recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				if(historia.autor == $window.localStorage.login){
					$scope.historia = historia;
				}else{
				$location.path('/erro');
			};
			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter a historia'
			});
		}

		cadastrar = function(historia) {

			cadastroDeHistorias.cadastrar(historia)
				.then(function(dados) {
					$scope.mensagem = dados.mensagem;
					if (dados.inclusao) $scope.historia = {};
				})
				.catch(function(erro) {
					$scope.mensagem = erro.mensagem;
				});	
		};

		$scope.submeter = function() {

			if ($scope.formulario.$valid) {
				$scope.historia.autor = $window.localStorage.login;
				$scope.historia.disponivel = false;
				var historia = $scope.historia;
				//Nova historia ainda nao tem pontuacao!
				if(!historia.pontuacao){
				historia.pontuacao = 0;
				cadastrar(historia);
				//historia ja tem pontuacao!
				}else{
				cadastrar(historia);
				}

			}
		};
	});