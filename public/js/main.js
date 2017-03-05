angular.module('storyteller', ['minhasDiretivas','ngAnimate', 'ngRoute', 'ngResource', 'meusServicos', 'ui.bootstrap'])
	.config(function($routeProvider, $locationProvider, $httpProvider) {


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

	});

