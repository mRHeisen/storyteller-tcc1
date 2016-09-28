angular.module('storyteller').controller('HistoriasController', function($scope, recursoHistorias) {
	
	$scope.historias = [];
	$scope.filtro = '';
	$scope.mensagem = '';

	recursoHistorias.query(function(historias) {
		$scope.historias = historias;
	}, function(erro) {
		console.log(erro);
	});

});