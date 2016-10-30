angular.module('storyteller')
	.controller('CapitulosController', function($scope, recursoHistorias, $routeParams, cadastroDeHistorias) {
		
		$scope.historia = {};
		$scope.mensagem = '';

   		$(document).ready(function(){
    	$("#myBtn").click(function(){
        $("#myModal").modal();
    	});
		});
		
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
   		console.log(capitulo);
   		var indiceDoCap = $scope.historia.capitulos.indexOf(capitulo);
   		if (indiceDoCap > -1) {
    	$scope.historia.capitulos.splice(indiceDoCap, 1);
   		//--numero;
   			};
   		};
   		// Adiciona link em branco
   		$scope.newLink = function(capitulo) {
   		ac = {num: 0, text: ""};
   		capitulo.acao.push(ac);
   		};
   		//Remove ultimo link
   		$scope.delLink = function(capitulo) {
   		capitulo.acao.splice(-1,1);
   		};

	});
