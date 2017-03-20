angular.module('storyteller')
	.controller('HistoriaJogarController', function($scope, recursoHistorias, $routeParams, $location, cadastroDeHistorias) {
		$scope.historia = {};

		
		if($routeParams.historiaId) {
			recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				if(historia.disponivel === true){
					$scope.historia = historia;
					$scope.historia.capitulos = historia.capitulos[0];
				}else{
					$location.path('/erro');
			};

			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter historia'
			});
		};

		$scope.capitulo = function(num) {
		recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				$scope.historia.capitulos = historia.capitulos[num];

			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter historia'
			});
		};

	});
