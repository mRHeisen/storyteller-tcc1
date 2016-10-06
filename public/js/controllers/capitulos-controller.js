angular.module('storyteller')
	.controller('CapitulosController', function($scope, recursoHistorias, $routeParams, cadastroDeHistorias) {
		
		$scope.historia = {};
		$scope.mensagem = '';

		if($routeParams.historiaId) {
			recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				$scope.historia = historia;;
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
   		var capitulo = {};
   		$scope.historia.capitulos.push(capitulo);
   		};
   		//Remove ultimo capitulo
   		$scope.removeCap = function() {
   		$scope.historia.capitulos.splice(-1,1);
   		};


	});
