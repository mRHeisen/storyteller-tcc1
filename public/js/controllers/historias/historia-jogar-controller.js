angular.module('storyteller')
	.controller('HistoriaJogarController', function($scope, recursoHistorias, $routeParams, $location, cadastroDeHistorias) {
		$scope.historia = {};
		$scope.capitulo = {};
		$scope.editorOptions = {
      	language: 'pt-br',
      	'skin': 'moono',
      	toolbar: 'full',
      	readOnly : true,
      	toolbar_full: [
      	{ name: 'clipboard', items : [ 'Source','Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
      	{ name: 'editing', items : [ 'Find','Replace','-' ] },
      	'/',
      	{ name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','-','RemoveFormat' ] },
      	{ name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote',
      	'-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock', 'Image'] },
      	'/',
      	{ name: 'styles', items : [ 'Format','Font','FontSize' ] },
      	]   
      	};
		if($routeParams.historiaId) {
			recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				if(historia.disponivel === true){
					$scope.historia = historia;
					$scope.capitulo = historia.capitulos[0];
					
				}else{
					$location.path('/erro');
				};
			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter historia'
			});
		};

		randomMeth = function(){
			var x = Math.floor((Math.random() * 21));
			return x;
		};

		$scope.capituloLinear = function(num) {
			console.log($scope.historia);
				$scope.capitulo = $scope.historia.capitulos[num];
				console.log("Tipo do capitulo"+$scope.capitulo.tipo);
		};

		$scope.capituloEscolha = function(num) {
			console.log($scope.historia);
				$scope.capitulo = $scope.historia.capitulos[num];
				console.log("Tipo do capitulo"+$scope.capitulo.tipo);
		};
		$scope.capituloDado = function(capitulo) {
			var valorDado = randomMeth();
			//var check = confirm("Você tirou: "+valorDado);
			alert("Você tirou: "+valorDado);
			console.log(valorDado);
			//if(check === true){
			var byvalor = capitulo.acao.slice(0);
				byvalor.sort(function(a,b) {
    			return a.valor - b.valor;
				});
				console.log('Valor:');
				console.log(byvalor);;
			for(var i=0; i < byvalor.length; i++){
				if(valorDado <= byvalor[i].valor){
				$scope.capitulo = $scope.historia.capitulos[byvalor[i].numCapitulo];
				break;
				};
			};
				//};
		};

	});
