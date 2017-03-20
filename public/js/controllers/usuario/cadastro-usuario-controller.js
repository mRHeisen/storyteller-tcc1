angular.module('storyteller')
	.controller('CadastroUsuarioController', function($scope, $routeParams, $http, $location, $window, cadastroDeUsuario, recursoUsuario) {
		 
		 $scope.usuario = {};
		 $scope.usuarioLogin = {};
		 $scope.mensagem = '';
		 $scope.showMe = false;

        $scope.submeter = function(login) {

			recursoUsuario.query({login: login}, function(usuario){
				if(usuario[0]){
					$scope.mensagem = 'login ja utilizado.';
				}else{
					if ($scope.formulario.$valid) {
						cadastroDeUsuario.cadastrar($scope.usuario)
						.then(function(dados) {
						$scope.mensagem = dados.mensagem;
					if (dados.inclusao) $scope.usuario = {};
						})
						.catch(function(erro) {
						$scope.mensagem = erro.mensagem;
						});
					}
				}
			},function(erro) {
			console.log(erro);
			});
		};

		$scope.autenticar = function (usuarioLogin) {
		$http.post('/autenticar',
			{login: usuarioLogin.login, senha: usuarioLogin.senha})
			.then(function(){
				$window.sessionStorage.login = usuarioLogin.login;
				$location.path('/');
			}, function(error){
				console.log(error);
				$scope.usuario = {};
				$scope.mensagem = 'Login ou senha invalidos';
			});

		};	 

		$scope.sair = function () {
		delete $window.sessionStorage.token;	
		delete $window.sessionStorage.login;
		};

		$scope.novoUsuario = function() {
        $scope.showMe = !$scope.showMe;
    	};
}); 