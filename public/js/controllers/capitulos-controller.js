angular.module('storyteller')
	.controller('CapitulosController', function($scope, recursoHistorias, $routeParams, $uibModal, cadastroDeHistorias) {
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
   		ac = {num: null, text: null};
   		var capitulo = { numero: null, texto : null, acao : [ac]};
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
        var modalInstance = $uibModal.open({
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
