angular.module('storyteller').controller('HistoriasController', function($scope, $http, $window, recursoHistorias, cadastroDeHistorias) {
	
	$scope.historias = [];
	$scope.mensagem = '';

	recursoHistorias.query({login: $window.sessionStorage.login}, function(historias) {
		$scope.historias = historias;
	}, function(erro) {
		console.log(erro);
	});
	
	enviaHistoria = function(historia){
		if(historia.disponivel === true){
			$scope.mensagem = 'Historia '+historia.titulo+' liberada para leitura!';
		}else{
			$scope.mensagem = 'Historia '+historia.titulo+' retirada para leitura!';
		};
		cadastroDeHistorias.cadastrar(historia)
			.then(function() {			
			})
			.catch(function(erro) {
			$scope.mensagem = erro.mensagem;
			});
	}
	$scope.disp = function(historia) {
		historia.disponivel = !historia.disponivel;
		if(historia.capitulos.length){
			enviaHistoria(historia);
		}else{
			$scope.mensagem = 'Historia '+historia.titulo+' não contem capitulos!';
		}
	};



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