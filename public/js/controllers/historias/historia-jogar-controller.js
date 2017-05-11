angular.module('storyteller')
	.controller('HistoriaJogarController', function($scope, recursoHistorias, $routeParams, $location, cadastroDeHistorias) {
		$scope.historia = {};
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
					$scope.historia.capitulos = historia.capitulos[0];
				}else{
					$location.path('/erro');
				};
			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter historia'
			});
		};

		$scope.capitulo = function(num) {
		recursoHistorias.get({historiaId: $routeParams.historiaId}, function(historia) {
				$scope.historia.capitulos = historia.capitulos[num];

			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter historia'
			});
		};

	});
