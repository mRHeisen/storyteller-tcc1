angular.module('storyteller').controller('ListaHistoriaController', function($scope, $http, recursoHistorias) {
	
	$scope.historias = [];
	$scope.geneross = [];
	$scope.filtro = '';

	$http.get('/v1/generos')
			.success(function(generos) {
			$scope.geneross = generos;
		})
		.error(function(erro) {
		console.log(erro);
	});
				
	$http.get('/v1/historias')
	.success(function(historias) {
	$scope.historias = historias;
	})
	.error(function(erro) {
		console.log(erro);
	});

	$scope.generos = function(genero) {
		if(genero){
		$http.get('/v1/genero/historias',{params:{genero: genero}})
		.success(function(historias) {
		$scope.historias = historias;
		})
		.error(function(erro) {
			console.log(erro);
		});
		}else{
		$http.get('/v1/historias')
		.success(function(historias) {
		$scope.historias = historias;
		})
		.error(function(erro) {
			console.log(erro);
		});
		};
};
});