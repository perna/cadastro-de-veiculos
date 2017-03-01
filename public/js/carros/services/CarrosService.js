angular.module('app').factory('CarrosService', CarrosService);

CarrosService.$inject = ['$http'];

function CarrosService($http) {

	var endpoint = '/carros/';

	function list(){
		return $http.get(endpoint);
	}

	function getById(id) {
		return $http.get(endpoint+id);
	}

	function remove(id) {
		return $http.delete(endpoint+id);
	}

	function save(carro) {
		var data = JSON.stringify(carro);
		return $http.post(endpoint, data);
	}

	function update(id, carro) {
		var data = JSON.stringify(carro)
		return $http.put(endpoint+id, data);
	}


	return{
		list:list,
		save:save,
		getById:getById,
		update: update
	};

}