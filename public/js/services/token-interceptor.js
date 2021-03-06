angular.module('storyteller')
	.factory('tokenInterceptor', function($window, $q, $location){
		
		var interceptor = {};
		//Poriedade response que sera chamada toda vez que receber uma resposta do servidor
		interceptor.response = function(response){
			var token = response.headers('x-access-token');
			if(token){		
				$window.localStorage.token = token;
				console.log("Armazenado token recebido no navegador");
			}

			return response;
		};

		interceptor.request = function(config){
			//config.headers recebe ele mesmo se nao existir recebe obj em branco
			config.headers = config.headers || {};
			if($window.localStorage.token){
				console.log("Adicionando token no header da requisição para ser enviado ao servidor");
				config.headers['x-access-token'] = $window.localStorage.token;
			}
			return config;
		};

		interceptor.responseError = function(rejection){
			//Se receber 401 sera redirecionando
			if(rejection != null && rejection.status == 401){
				$location.path('/cadastro');
				delete $window.localStorage.token;
				delete $window.localStorage.login;			
			}
			return $q.reject(rejection);
		};

		return interceptor;

	});