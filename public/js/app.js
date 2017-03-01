angular.module('app',['ngRoute','oitozero.ngSweetAlert','angularUtils.directives.dirPagination'])
	.config(['$routeProvider','$locationProvider', 'paginationTemplateProvider',
    	function($routeProvider, $locationProvider, paginationTemplateProvider){

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

            paginationTemplateProvider.setPath('js/libraries/dirPagination.tpl.html');

    }]);