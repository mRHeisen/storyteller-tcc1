angular.module('storyteller')
	.controller('ModalController', function($scope, capitulo) {
	
	$scope.capitulo = capitulo;
	   	$scope.newLink = function(capitulo) {
   		ac = {num: 0, text: ""};
   		capitulo.acao.push(ac);
   		};
   		//Remove ultimo link
   		$scope.delLink = function(acao) {
   		var indiceAcao = $scope.capitulo.acao.indexOf(acao);
   		if (indiceAcao > -1) {
    	$scope.capitulo.acao.splice(indiceAcao, 1);
   		};
   		};
});
						          

		