angular.module('storyteller')
	.controller('ModalController', function($scope, $rootScope, capitulo) {
	   $scope.capitulo = capitulo;
      $scope.tipo = capitulo.tipo;
      $scope.mensagemErro = '';
      $scope.mensagem = '';
      $scope.numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      $scope.editorOptions = {
      language: 'pt-br',
      'skin': 'moono',
      toolbar: 'full',
      toolbar_full: [
      { name: 'clipboard', items : [ 'Source','Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
      { name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
      '/',
      { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','-','RemoveFormat' ] },
      { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote',
      '-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock', 'Image'] },
      '/',
      { name: 'styles', items : [ 'Format','Font','FontSize' ] },
      ]   
      };

      $scope.newLink = function(capitulo) {
         console.log(capitulo);
         if(capitulo.tipo == "escolha"){
            acE = {num: 0, text: ""};
            ac = acE;
            console.log("Esse é um capitulo de escolha"+ac);
         }else if(capitulo.tipo == "dados"){
            acD = {num: 0, text: "", valor1: 0, valor2: 0};
            ac = acD;
            console.log("Esse é um capitulo de dados"+ac);
         };
   		capitulo.acao.push(ac);
   		};

      $scope.numbers = function(valor) {
        console.log(valor);
      };
   		//Remove ultimo link
   	$scope.delLink = function(acao) {
   	  var indiceAcao = $scope.capitulo.acao.indexOf(acao);
   		if (indiceAcao > -1) {
    	   $scope.capitulo.acao.splice(indiceAcao, 1);
   		};
   	};

      $scope.close = function(){
         $rootScope.modalInstance.close();
         };
});
						          

		