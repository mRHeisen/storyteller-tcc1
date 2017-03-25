angular.module('storyteller')
	.controller('AvaliaHistoriaController', function($scope, recursoHistorias, $routeParams, $window, $location, cadastroDeHistorias) {
		$scope.historia = {};
		$scope.mensagem = '';

		var login = $window.localStorage.login;
		
		if($routeParams.historiaId) {
			recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				if(historia.disponivel === true){
					$scope.historia = historia;
				}else{
					$location.path('/erro');
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

		regraNota = function(nota){

			switch (parseInt(nota)) {
    			case 0:
    			total = parseFloat(-100);
        		break;
    			case 1:
    			total = parseFloat(-50);
        		break;
    			case 2:
    			total = parseFloat(-25);
        		break;
    			case 3:
    			total = parseFloat(25);
        		break;
    			case 4:
    			total = parseFloat(50);
        		break;
    			case 5:
    			total = parseFloat(100);
        		break;
        		default :
        			$scope.mensagem = 'Escolha um numero';
        		break;
			}
			return total;
		};

		enviarAvaliacao = function(pontuacao, nota){
			for(var i=0; i < $scope.historia.votos.length; i++){
				if($scope.historia.votos[i].usuario === login){
					var achou = true;
					pontuacaoFinal = pontuacao - regraNota($scope.historia.votos[i].nota) + regraNota(nota); 
					$scope.historia.votos[i] = {usuario : login, nota : nota};
					cadastroDeHistorias.atualizarPontuacao($scope.historia._id, pontuacaoFinal, $scope.historia.votos);
					$scope.historia.pontuacao = pontuacaoFinal;
					$scope.mensagem = 'Voto atualizado!';	
					break;
				};
			}
				if(!achou){
					$scope.historia.votos.push({usuario : login, nota : nota});
					var votos = $scope.historia.votos;
					pontuacaoFinal = $scope.historia.pontuacao + regraNota(nota);
					cadastroDeHistorias.atualizarPontuacao($scope.historia._id, pontuacaoFinal, $scope.historia.votos);
					$scope.historia.pontuacao = pontuacaoFinal;
					$scope.mensagem = 'Obrigado por votar';	
			}

		};

		$scope.avaliar = function(nota) {
			if(!nota) {
				$scope.mensagem = 'Escolha um numero';
			}else{
				enviarAvaliacao($scope.historia.pontuacao, nota);
		}
		};

	});
