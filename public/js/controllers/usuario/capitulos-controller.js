angular.module('storyteller')
	.controller('CapitulosController', function($scope, recursoHistorias, $window, $location, $routeParams, $rootScope, $uibModal, cadastroDeHistorias) {
		$scope.historia = {};
		$scope.mensagem = '';
		
		if($routeParams.historiaId) {
			recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				if(historia.autor == $window.sessionStorage.login){
					$scope.historia = historia;
				}else{
				$location.path('/erro');
			};
			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter historia'
			});
		}
		$scope.submeter = function() {
			var result = checkHistoria($scope.historia)
			if ($scope.formulario.$valid && result.situacao === true) {
				cadastroDeHistorias.cadastrar($scope.historia)
				.then(function(dados) {
					$scope.mensagem = dados.mensagem;
				})
				.catch(function(erro) {
					$scope.mensagem = erro.mensagem;
				});
			}else{
				$scope.mensagem = 'Não foi possivel atualizar historia '+result.mensagem;
			};
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
    	checkHistoria = function(historia){
		var liberada = {
			situacao : null,
			mensagem : 'nao contem um capitulo final'
		};

		var arrayAcao = [];
		var existeFinal = false;
		var acoesCorretas = true;
		
		for(var i=0; i < historia.capitulos.length; i++){
				if(historia.capitulos[i].acao.length){
					for(var k=0; k < historia.capitulos[i].acao.length; k++){
						var indexCap = historia.capitulos[i].acao[k].numCapitulo;
						arrayAcao.push(indexCap);
						//var testCap = historia.capitulos[i];
							if(!historia.capitulos[indexCap]){
								liberada.mensagem = "No capitulo: "+i+" A acão: "+historia.capitulos[i].acao[k].text+", leva para um capitulo inexistente";
								acoesCorretas = false;
								break;
							}else if(i === indexCap){
								liberada.mensagem = "No capitulo: "+i+" A acão: "+historia.capitulos[i].acao[k].text+", leva para seu capitulo de origem";
								acoesCorretas = false;
								break;
							}else{
								acoesCorretas = true;
							};
								console.log("Nao é um capitulo final: "+i)
					};			
				}else{
					console.log("Capitulo final: "+i)
					existeFinal = true;
				};
		};

		for(var i=0; i < historia.capitulos.length; i++){
			if(i > 0 && arrayAcao.indexOf(i) < 0){
				console.log(arrayAcao);
				liberada.mensagem = "Não existe nenhuma acao que leve para o capitulo: "+i;
				acoesCorretas = false;
				//break;						
				}else if(i > 0 && arrayAcao.indexOf(i) > 0){
				//acoesCorretas = true;
				console.log(arrayAcao);
				console.log("Capitulo "+i+" tem "+arrayAcao.indexOf(i)+" ligacoes");
				};
		};
			console.log("Tem final? "+existeFinal+" Acoes corretas? "+acoesCorretas)
			if(existeFinal === true && acoesCorretas === true){
				liberada.situacao = true;
			}else{
				liberada.situacao = false;
				console.log(liberada.situacao);
			};

		return liberada;

		};
		
	});
