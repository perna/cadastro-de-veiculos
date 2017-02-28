angular.module('app',['ngRoute'])
	.config(['$routeProvider','$locationProvider',
    	function($routeProvider, $locationProvider){

        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/', {
                templateUrl: '/partials/list.html',
                controller: 'CarrosController',
                controllerAs: 'Carros'
            })
            .otherwise({
                redirectTo: '/'
            })
    }]);