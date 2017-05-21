angular.module('storyteller')
	.controller('CapitulosController', function($scope, recursoHistorias, $window, $location, $routeParams, $rootScope, $uibModal, cadastroDeHistorias) {
		$scope.historia = {};
    $scope.valor = '';
		$scope.mensagem = '';
    $scope.mensagemErro = '';
    $scope.escolha = 'Escolha';
    $scope.dados = 'Dados';
    $scope.linear = 'Linear';
    $scope.final = 'Final';
    
		if($routeParams.historiaId) {
			recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				if(historia.autor == $window.localStorage.login){
					$scope.historia = historia;
				}else{
				$location.path('/erro');
			};
			}, function(erro) {
				console.log(erro);
				$scope.mensagemErro = 'Não foi possível obter historia'
			});
		}
		$scope.submeter = function() {
      //console.log($scope.historia);
			var result = checkHistoria($scope.historia)
			if ($scope.formulario.$valid && result.situacao === true) {
				cadastroDeHistorias.cadastrar($scope.historia)
				.then(function(dados) {
          $scope.mensagemErro = '';
					$scope.mensagem = dados.mensagem;
				})
				.catch(function(erro) {
          $scope.mensagem = '';
					$scope.mensagemErro = erro.mensagem;
				});
			}else{
        $scope.mensagem = '';
				$scope.mensagemErro = 'Não foi possivel atualizar historia! '+result.mensagem;
			};
		};
		// Adiciona capitulo em branco
      $scope.tipoDoCap = function(capitulo, index) {  
      if(capitulo.tipo == "final"){
        capitulo.acao.splice(0);
        console.log(capitulo.acao);
      };
      if(capitulo.tipo == "linear"){
        index = index+1;
        acL = {numCapitulo: index, text: "Proximo Capítulo"};
        capitulo.acao.push(acL);
        console.log(capitulo);
      };
      };
   		$scope.newCap = function() {
   		var indiceDoCap = $scope.historia.capitulos.length
   		var capitulo = {texto : null, acao : []};
   		$scope.historia.capitulos.push(capitulo);
   		};
   		//Remove capitulo
   		$scope.removeCap = function(capitulo) {
      var confirmacao = confirm("Excluir o capítulo: "+$scope.historia.capitulos.indexOf(capitulo));
      if(confirmacao === true){
   		 var indiceDoCap = $scope.historia.capitulos.indexOf(capitulo);
   		   if (indiceDoCap > -1) {
    	   $scope.historia.capitulos.splice(indiceDoCap, 1);
   		   };
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
    	$scope.openCap = function (cap) {
        	$rootScope.modalInstance = $uibModal.open({
       	 	controller: "ModalController",
        	templateUrl: 'myModalCap.html',
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
          if(historia.capitulos[i].tipo == ""){
              Capituloliberado.situacao = false;
              Capituloliberado.mensagem = "O capitulo "+i+" não contem um tipo.";
              break;
          }else{
              Capituloliberado.situacao = true;
              Capituloliberado.mensagem = "";
          };
        };
        if(Capituloliberado.situacao === true){
    		  for(var i=0; i < historia.capitulos.length; i++){
    		   if(historia.capitulos[i].tipo == "final"){
					    Capituloliberado.situacao = true;
					    Capituloliberado.mensagem = "";
					    break;
           }else{
					    Capituloliberado.situacao = false;
				  	  Capituloliberado.mensagem = "Não existe um capitulo final!";
            };
			    };
        };
        if(Capituloliberado.situacao === true){
          for(var i=0; i < historia.capitulos.length; i++){
            if(historia.capitulos[i].texto == null){
              Capituloliberado.situacao = false;
              Capituloliberado.mensagem = "O capitulo "+i+" não contem texto.";
              break;
            }else{
              Capituloliberado.situacao = true;
              Capituloliberado.mensagem = "";
            };
          };
        };
			   return Capituloliberado;
    	};
    	checkLoop = function(historia, loopLiberado){
    		var lista = new Array();
    		for(var i=0; i < historia.capitulos.length; i++){
    			lista.push({capitulo : {numero : i, filhos : []}});
    			if(historia.capitulos[i].acao.length){
    				for(var k=0; k < historia.capitulos[i].acao.length; k++){	
    					var indexCap = historia.capitulos[i].acao[k].numCapitulo;
    				lista[i].capitulo.filhos.push(indexCap);
    					
					};			
				};		
			 };
			  var aux
    		var numero = 0;
    		var fila = new Array();
    		var retirados = new Array();
    		var repetidos = new Array();
    		fila[fila.length] = numero;
    		do{ 	
    			//console.log("Fila: "+fila); 		
    			if(lista[numero].capitulo.filhos.length){
    				for(var k=0; k < lista[numero].capitulo.filhos.length; k++){
    				if(repetidos.indexOf(lista[numero].capitulo.filhos[k]) < 0 && fila.indexOf(lista[numero].capitulo.filhos[k]) < 0){
    					fila[fila.length] = lista[numero].capitulo.filhos[k];
    				};		
    				};
    				aux = retirados.indexOf(numero);
    				if(aux < 0){ 				
    					retirados.push(fila[0]);
    					fila.splice(0,1);
    					numero = fila[0];					
    				}else if(aux >= 0 && repetidos.indexOf(numero) < 0){
    					if(lista[numero].capitulo.filhos){
    					repetidos.push(fila[0]);
    					};
    					fila.splice(0,1);
    					numero = fila[0];	
    				};			
    			}else{
    				if(aux < 0){
    					retirados.push(fila[0]);
    					fila.splice(0,1);
    					numero = fila[0];	
    				}else if(aux >= 0 && repetidos.indexOf(numero) < 0){
    					fila.splice(0,1);
    					numero = fila[0];	
    				};
    			};
    		}while(fila.length);
    		var saida = checkRepetidos(repetidos, lista);
			if(saida === true){
				loopLiberado.situacao = true;
				loopLiberado.mensagem = '';
			}else{
				loopLiberado.situacao = false;
				loopLiberado.mensagem = 'Existem um ciclo sem saidas nos capitulos: '+repetidos;
			};
			return loopLiberado;
    	};
    	checkRepetidos = function(repetidos, lista){
    		var loop = new Array();
    		var saida = false;
    		//console.log("Repetidos: "+repetidos);
    		numero = repetidos[0];
    		if(repetidos.length){
    			console.log("Tem repetidos");
    		for(var i=0; i < repetidos.length; i++){
    			numero = repetidos[i];
    			for(var k=0; k < lista[numero].capitulo.filhos.length; k++){
    				var aux = repetidos.indexOf(lista[numero].capitulo.filhos[k]);
					console.log("Capitulo: "+lista[numero].capitulo.numero);
    				if(aux >= 0){
	    				console.log("Sem saida");			
	    				//repetidos.splice(0,1);	    				
    				}else if(aux < 0){
    					console.log("Saida");
    					//repetidos.splice(0,1);
    					saida = true
    				};

    			};  			
    		};
    	}else{
    		//console.log("nao tem repetidos");
    		saida = true
    	};
			return saida;
    	};
    	checkAcaos = function(historia, Acaoliberada){
    		var arrayAcao = [];
    		for(var i=0; i < historia.capitulos.length; i++){
    			for(var k=0; k < historia.capitulos[i].acao.length; k++){
					  var indexCap = historia.capitulos[i].acao[k].numCapitulo;
					  arrayAcao.push(indexCap);
					     if(!historia.capitulos[indexCap]){
						    Acaoliberada.mensagem = "No capitulo: "+i+" A ação: "+historia.capitulos[i].acao[k].text+", leva para um capitulo inexistente";
						    Acaoliberada.situacao = false;
						    break;
					     }else if(i === indexCap){
						    Acaoliberada.mensagem = "No capitulo: "+i+" A ação: "+historia.capitulos[i].acao[k].text+", leva para seu capitulo de origem";
						    Acaoliberada.situacao = false;
						    break;				
					   };
					
				  };
			  };

			   for(var i=0; i < historia.capitulos.length; i++){
				    if(i > 0 && arrayAcao.indexOf(i) < 0){
					   Acaoliberada.mensagem = "Não existe nenhuma ação que leve para o capitulo: "+i;
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
		//console.log("Check Looop");
		checkLoop(historia, loopLiberado);
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
