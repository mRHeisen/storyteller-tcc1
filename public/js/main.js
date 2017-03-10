angular.module('storyteller', ['minhasDiretivas','ngAnimate', 'ngRoute', 'ngResource', 'meusServicos', 'ui.bootstrap'])
	.config(function($routeProvider, $locationProvider, $httpProvider) {

		$httpProvider.interceptors.push('tokenInterceptor');

		$routeProvider.when('/', {
			templateUrl: 'partials/usuario/home.html',
			controller: 'HomeController'
		});

		$routeProvider.when('/cadastro', {
			templateUrl: 'partials/usuario/cadastroUsuario.html',
			controller: 'CadastroUsuarioController'
		});

		$routeProvider.when('/historia', {
			templateUrl: 'partials/usuario/minhasHistorias.html',
			controller: 'HistoriasController'
		});

		$routeProvider.when('/historias/new', {
			templateUrl: 'partials/usuario/formularioHistoria.html',
			controller: 'HistoriaController'
		});

		$routeProvider.when('/historias/edit/:historiaId', {
			templateUrl: 'partials/usuario/formularioHistoria.html',
			controller: 'HistoriaController'
		});

		$routeProvider.when('/capitulos/edit/:historiaId', {
			templateUrl: 'partials/usuario/formularioCapitulo.html',
			controller: 'CapitulosController'
		});

		$routeProvider.when('/lista', {
			templateUrl: 'partials/historias/listaHistorias.html',
			controller: 'ListaHistoriaController'
		});
		$routeProvider.when('/lista/historia/:historiaId', {
			templateUrl: 'partials/historias/historia.html',
			controller: 'AvaliaHistoriaController'
		});

		$routeProvider.when('/lista/historia/jogar/:historiaId', {
			templateUrl: 'partials/historias/jogarHistoria.html',
			controller: 'HistoriaJogarController'
		});

		$routeProvider.otherwise({redirectTo: '/'});

	});

