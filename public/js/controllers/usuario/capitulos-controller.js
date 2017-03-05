angular.module('storyteller')
	.controller('CapitulosController', function($scope, recursoHistorias, $routeParams, $rootScope, $uibModal, cadastroDeHistorias) {
		$scope.historia = {};
		$scope.mensagem = '';
		
		if($routeParams.historiaId) {
			recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				$scope.historia = historia;
			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter historia'
			});
		}
		$scope.submeter = function() {

			if ($scope.formulario.$valid) {
				cadastroDeHistorias.cadastrar($scope.historia)
				.then(function(dados) {
					$scope.mensagem = dados.mensagem;
				})
				.catch(function(erro) {
					$scope.mensagem = erro.mensagem;
				});
			}
		};
		// Adiciona capitulo em branco
   		$scope.newCap = function() {
   		var indiceDoCap = $scope.historia.capitulos.length
   		var capitulo = {texto : null, acao : []};
   		$scope.historia.capitulos.push(capitulo);
   		};
   		//Remove capitulo
   		$scope.removeCap = function(capitulo) {
   		var indiceDoCap = $scope.historia.capitulos.indexOf(capitulo);
   		if (indiceDoCap > -1) {
    	$scope.historia.capitulos.splice(indiceDoCap, 1);
   		};
   		};
   		// Abre modal com açoes
   		$scope.open = function (cap) {
        	$rootScope.modalInstance = $uibModal.open({
       	 	controller: "ModalController",
        	templateUrl: 'myModal.html',
        	resolve: {
          		capitulo: function()
           			{
              		return cap;
           			}
         		}
        	});

    	};
		
	});
