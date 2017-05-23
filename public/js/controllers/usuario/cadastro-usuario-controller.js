angular.module('storyteller')
	.controller('CadastroUsuarioController', function($scope, $routeParams, $http, $location, $window, cadastroDeUsuario, recursoUsuario) {
		 
		 $scope.usuario = {};
		 $scope.usuarioLogin = {};
		 $scope.mensagem = '';
		 $scope.showMe = false;
		 $scope.usuarioId = $window.localStorage.userID;

        $scope.submeter = function(login) {

			recursoUsuario.query({login: login}, function(usuario){
				console.log(usuario);
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
			.then(function(data){
				console.log($scope.usuarioId);
				$window.localStorage.login = usuarioLogin.login;
				$window.localStorage.userID = data.data;
				$location.path('/');
			}, function(error){
				console.log(error);
				$scope.usuario = {};
				$scope.mensagem = 'Login ou senha invalidos';
			});

		};	 

		$scope.usuarioConfig = function () {
			console.log($scope.usuarioId);
		};

		$scope.sair = function () {
		delete $window.localStorage.token;	
		delete $window.localStorage.login;
		delete $window.localStorage.userID;
		};

		$scope.novoUsuario = function() {
        $scope.showMe = !$scope.showMe;
    	};
}); 