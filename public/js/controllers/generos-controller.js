angular.module('storyteller').controller('GenerosController', function($scope, $http) {
		$http.get('/v1/generos')
			.success(function(generos) {
			$scope.generos = generos;
		})
		.error(function(erro) {
			console.log(erro);
		});
	});