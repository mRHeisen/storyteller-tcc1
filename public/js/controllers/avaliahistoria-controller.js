angular.module('storyteller')
	.controller('AvaliaHistoriaController', function($scope, recursoHistorias, $routeParams, cadastroDeHistorias) {
		$scope.historia = {};
		$scope.mensagem = '';

		
		if($routeParams.historiaId) {
			recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				$scope.historia = historia;
				if(!$scope.historia.pontuacao){
					$scope.historia.pontuacao = 0;
				};

			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter historia'
			});
		};



		$scope.submeter = function() {
			if ($scope.formulario.$valid) {
				cadastroDeHistorias.cadastrar($scope.historia)
				.then(function(dados) {
					$scope.mensagem = dados.mensagem;
					if (dados.inclusao) $scope.historia = {};
				})
				.catch(function(erro) {
					$scope.mensagem = erro.mensagem;
				});
			}
		};
		$scope.avaliar = function(avaliacao) {
			var pontuacao;
			switch (parseInt(avaliacao)) {
    			case 0:
    			console.log("Nota"+avaliacao);
    			pontuacao = parseFloat($scope.historia.pontuacao) -100;
        		break;
    			case 1:
    			console.log(avaliacao);
    			pontuacao = parseFloat($scope.historia.pontuacao) -50;
        		break;
    			case 2:
    			console.log(avaliacao);
    			pontuacao = parseFloat($scope.historia.pontuacao) -20;
        		break;
    			case 3:
    			console.log(avaliacao);
    			pontuacao = parseFloat($scope.historia.pontuacao) + 10;
        		break;
    			case 4:
    			console.log(avaliacao);
    			pontuacao = parseFloat($scope.historia.pontuacao) + 50;
        		break;
    			case 5:
    			console.log(avaliacao);
    			pontuacao = parseFloat($scope.historia.pontuacao) + 100;
        		break;
        		default :
        			$scope.mensagem = 'Escolha um numero';
        		break;

			}			 
			if (pontuacao <= 0){
			cadastroDeHistorias.atualizarPontuacao($scope.historia, 0);
			$scope.historia.pontuacao = 0;
			console.log("Menor ou igual a 0");
			console.log("Pontuação"+$scope.historia.pontuacao);
			$scope.mensagem = null;
			};

			if(pontuacao > 0) {
			cadastroDeHistorias.atualizarPontuacao($scope.historia, pontuacao);
			$scope.historia.pontuacao = pontuacao;
			console.log("Maior que 0");
			console.log("Pontuação"+$scope.historia.pontuacao);
			$scope.mensagem = null;
			};

			if(!avaliacao) {
				$scope.mensagem = 'Escolha um numero';
			};
		};

	});
