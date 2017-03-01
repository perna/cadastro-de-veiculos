angular.module('app',['ngRoute','oitozero.ngSweetAlert'])
	.config(['$routeProvider','$locationProvider',
    	function($routeProvider, $locationProvider){

        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/', {
                templateUrl: '/partials/list.html',
                controller: 'CarrosController',
                controllerAs: 'Carros',
            })
            .when('/novo', {
                templateUrl: '/partials/create.html',
                controller: 'CarrosController',
                controllerAs: 'Carro'
            })
            .when('/editar/:id', {
                templateUrl: '/partials/edit.html',
                controller: 'CarrosController',
                controllerAs: 'Carro'
            })
            .otherwise({
                redirectTo: '/'
            })
    }]);