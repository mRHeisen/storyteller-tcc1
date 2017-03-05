angular.module('storyteller').controller('ListaHistoriaController', function($scope, $http, recursoHistorias) {
	
	$scope.historias = [];
	$scope.geneross = [];
	$scope.filtro = '';

	$http.get('/v1/generos')
			.success(function(generos) {
			$scope.geneross = generos;
		});

	recursoHistorias.query(function(historias) {
		$scope.historias = historias;
	}, function(erro) {
		console.log(erro);
	});

	$scope.generos = function(genero) {
		if(genero){
		recursoHistorias.query({genero: genero}, function(historias) {
		$scope.historias = historias;
		}, function(erro) {
		console.log(erro);
		});
		}else{
		recursoHistorias.query(function(historias) {
		$scope.historias = historias;
		}, function(erro) {
		console.log(erro);
		});
	};
};
});