angular.module('storyteller', ['minhasDiretivas','ngAnimate', 'ngRoute', 'ngResource', 'meusServicos', 'ui.bootstrap'])
	.config(function($routeProvider, $locationProvider, $httpProvider) {


		$routeProvider.when('/historia', {
			templateUrl: 'partials/historia.html',
			controller: 'HistoriasController'
		});

		$routeProvider.when('/historias/new', {
			templateUrl: 'partials/formularioHistoria.html',
			controller: 'HistoriaController'
		});

		$routeProvider.when('/historias/edit/:historiaId', {
			templateUrl: 'partials/formularioHistoria.html',
			controller: 'HistoriaController'
		});

		$routeProvider.when('/capitulos/edit/:historiaId', {
			templateUrl: 'partials/formularioCapitulo.html',
			controller: 'CapitulosController'
		});

		$routeProvider.otherwise({redirectTo: '/historia'});

	});