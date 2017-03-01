angular.module('app').factory('CarrosService', CarrosService);

CarrosService.$inject = ['$http','SweetAlert', '$location'];

function CarrosService($http, SweetAlert, $location) {

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


	function showDeleteQuestion(callback) {
		SweetAlert.swal({
   				title: "Atenção",
   				text: "Deseja realmente excluir este carro?",
   				type: "warning",
   				showCancelButton: true,
   				cancelButtonText:"Não",
   				confirmButtonColor: "#DD6B55",
   				confirmButtonText: "Sim",
   				closeOnConfirm: true
   			}, 
			function(isConfirm){
				if(isConfirm) {
					callback();
				}
		});
	}


	return{
		list:list,
		save:save,
		getById:getById,
		update: update,
		showDeleteQuestion: showDeleteQuestion,
		remove: remove
	};

}