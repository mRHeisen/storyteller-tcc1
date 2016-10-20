angular.module('storyteller')
	.controller('CapitulosController', function($scope, recursoHistorias, $routeParams, cadastroDeHistorias) {
		
		$scope.historia = {};
		$scope.mensagem = '';
		
		if($routeParams.historiaId) {
			recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				$scope.historia = historia;
				return numero = historia.capitulos.length;
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
   		$scope.newCap = function(proximo) {
   		numero++;
   		proximo++;
   		var capitulo = { numero: numero, texto : null, anterior : 0, proximo: [proximo]};
   		$scope.historia.capitulos.push(capitulo);
   		};
   		//Remove ultimo capitulo
   		$scope.removeCap = function() {
   		$scope.historia.capitulos.splice(-1,1);
   		--numero;
   		};
   		// Adiciona link em branco
   		$scope.newLink = function(capitulo) {
   		capitulo.proximo.push(0);
   		};
   		//Remove ultimo link
   		$scope.delLink = function(capitulo) {
   		capitulo.proximo.splice(-1,1);
   		};


	});
