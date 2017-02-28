angular.module('app').factory('CarrosService', CarrosService);

CarrosService.$inject = ['$http'];

function CarrosService($http) {

	var endpoint = '/carros';

	function list(){
		return $http.get(endpoint);
	}

	function getById(id) {
		return $http.get(endpoint+id);
	}

	function remove(id) {
		return $http.delete(endpoint+id);
	}

	return{list:list};

}