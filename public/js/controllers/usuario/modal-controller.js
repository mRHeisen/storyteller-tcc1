angular.module('storyteller')
	.controller('ModalController', function($scope, $rootScope, capitulo) {
	   $scope.capitulo = capitulo;
      $scope.tipo = capitulo.tipo;
      $scope.mensagemErro = '';
      $scope.mensagem = '';
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

   		//Remove ultimo link
   	$scope.delLink = function(acao) {
   	  var indiceAcao = $scope.capitulo.acao.indexOf(acao);
   		if (indiceAcao > -1) {
    	   $scope.capitulo.acao.splice(indiceAcao, 1);
   		};
   	};

      $scope.validarDados = function (capitulo) {
      var total = 0;
      for(var i=0; i < capitulo.acao.length; i++){
      var totalAC = capitulo.acao[i].valor1+capitulo.acao[i].valor2;
      console.log("Acao "+i+" tem: "+totalAC);
      total = (totalAC)+(total);
      console.log("TOTAL: "+total);
      };
      if(total > 99){
         $scope.mensagemErro = 'Passou de 99';
         $scope.mensagem = '';
      }else if(total < 99){
         $scope.mensagemErro = 'Não atingiu os 99';
         $scope.mensagem = '';
      }else if(total == 99){
         $scope.mensagem = 'Dados Corretos';
         $scope.mensagemErro = '';
      };
      };
      $scope.close = function(){
         $rootScope.modalInstance.close();
         };
});
						          

		