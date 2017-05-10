angular.module('storyteller')
	.controller('ModalController', function($scope, $rootScope, capitulo) {
	
	$scope.capitulo = capitulo;

   $scope.editorOptions = {
      language: 'pt-br',
      'skin': 'moono',
      toolbar: 'full',
      removeButtons : 'Source',
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
   		ac = {num: 0, text: ""};
   		capitulo.acao.push(ac);
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
						          

		