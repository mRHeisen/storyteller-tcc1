angular.module('storyteller').controller('HistoriasController', function($scope, $http, recursoHistorias) {
	
	$scope.historias = [];
	$scope.filtro = '';
	$scope.mensagem = '';

	
	recursoHistorias.query(function(historias) {
		$scope.historias = historias;
	}, function(erro) {
		console.log(erro);
	});
	
	$scope.remover = function(historia) {

		recursoHistorias.delete({historiaId: historia._id}, function() {
			var indiceDaHistoria = $scope.historias.indexOf(historia);
			$scope.historias.splice(indiceDaHistoria, 1);
			$scope.mensagem = 'Historia ' + historia.titulo + ' removida com sucesso!';
		}, function(erro) {
			console.log(erro);
			$scope.mensagem = 'Não foi possível apagar a historia ' + historia.titulo;
		});
	};

});