angular.module('storyteller')
	.controller('HomeController', function($scope, recursoHistorias) {
	$scope.historias = [];
	var ranque = 'ranque';

		recursoHistorias.query({ranque},function(historias) {
		$scope.historias = historias;
	}, function(erro) {
		console.log(erro);
	});
	});