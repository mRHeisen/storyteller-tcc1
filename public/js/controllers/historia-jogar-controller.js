angular.module('storyteller')
	.controller('HistoriaJogarController', function($scope, recursoHistorias, $routeParams) {
		$scope.historia = {};

		
		if($routeParams.historiaId) {
			recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				$scope.historia = historia;
				$scope.historia.capitulos = historia.capitulos[0];

			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter historia'
			});
		};



		$scope.capitulo = function(num) {
			console.log(num);
		recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				$scope.historia.capitulos = historia.capitulos[num];

			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter historia'
			});
		};

	});
