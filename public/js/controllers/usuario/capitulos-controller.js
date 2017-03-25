angular.module('storyteller')
	.controller('CapitulosController', function($scope, recursoHistorias, $window, $location, $routeParams, $rootScope, $uibModal, cadastroDeHistorias) {
		$scope.historia = {};
		$scope.mensagem = '';
		
		if($routeParams.historiaId) {
			recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				if(historia.autor == $window.localStorage.login){
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
				$scope.mensagem = 'Não foi possivel atualizar historia! '+result.mensagem;
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

    	checkCapitulos = function(historia, Capituloliberado){
    		for(var i=0; i < historia.capitulos.length; i++){
    			if(!historia.capitulos[i].acao.length){
					Capituloliberado.situacao = true;
					Capituloliberado.mensagem = "";
					break;
				}else{
					Capituloliberado.situacao = false;
					Capituloliberado.mensagem = "Não existe um capitulo final!";
				};
			};
			return Capituloliberado;
    	};
    	checkLoop = function(historia, loopLiberado){
    		for(var i=0; i < historia.capitulos.length; i++){
    			if(historia.capitulos[i].acao.length){
    				for(var k=0; k < historia.capitulos[i].acao.length; k++){
    					var indexCap = historia.capitulos[i].acao[k].numCapitulo;
    					var acoesPai = historia.capitulos[i].acao.length;
						var acoesFilho = historia.capitulos[indexCap].acao.length;
						if(acoesFilho){
						var numCapitulo = historia.capitulos[indexCap].acao[0].numCapitulo
						};
						if(acoesPai === 1 && acoesFilho === 1 && numCapitulo === i){
							loopLiberado.mensagem = "Nos capitulos: "+indexCap+" e "+i+" existe um looping";
							loopLiberado.situacao = false;
							console.log("azedou!");
							break;
						}else{
							console.log("ok!")
						};	
					};
				};		
			};

			return loopLiberado;
    	};
    	checkAcaos = function(historia, Acaoliberada){
    		var arrayAcao = [];
    		for(var i=0; i < historia.capitulos.length; i++){
    			for(var k=0; k < historia.capitulos[i].acao.length; k++){
					var indexCap = historia.capitulos[i].acao[k].numCapitulo;
					arrayAcao.push(indexCap);
					if(!historia.capitulos[indexCap]){
						Acaoliberada.mensagem = "No capitulo: "+i+" A acão: "+historia.capitulos[i].acao[k].text+", leva para um capitulo inexistente";
						Acaoliberada.situacao = false;
						break;
					}else if(i === indexCap){
						Acaoliberada.mensagem = "No capitulo: "+i+" A acão: "+historia.capitulos[i].acao[k].text+", leva para seu capitulo de origem";
						Acaoliberada.situacao = false;
						break;
					};
				};
			};

			for(var i=0; i < historia.capitulos.length; i++){
				if(i > 0 && arrayAcao.indexOf(i) < 0){
					Acaoliberada.mensagem = "Não existe nenhuma acao que leve para o capitulo: "+i;
					Acaoliberada.situacao = false;	
					break;					
				};
			};
			return Acaoliberada
    	};

    	checkHistoria = function(historia){
		var Acaoliberada = {
			situacao : true,
			mensagem : ''
		};
		var Capituloliberado = {
			situacao : true,
			mensagem : ''
		};
		var loopLiberado = {
			situacao : true,
			mensagem : ''
		};
		var liberado = {
			situacao : null,
			mensagem : ''
		};	
		Acaoliberada = checkAcaos(historia, Acaoliberada);
		Capituloliberado = checkCapitulos(historia, Capituloliberado);
		if(Acaoliberada.situacao === true && Capituloliberado.situacao === true){
		console.log("Check Looop");
		loopLiberado = checkLoop(historia, loopLiberado);
		};
		if(Acaoliberada.situacao === true && Capituloliberado.situacao === true && loopLiberado.situacao === true){
			liberado.situacao = true;
		}else{
			liberado.situacao = false;
			liberado.mensagem = Acaoliberada.mensagem+" "+Capituloliberado.mensagem+" "+loopLiberado.mensagem;
		};
		return liberado;
		};
		
	});
