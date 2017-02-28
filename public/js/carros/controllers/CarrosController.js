angular.module('app').controller('CarrosController', CarrosController);

CarrosController.$inject = ['CarrosService'];

function CarrosController(CarrosServices){
 
	var vm = this;

	vm.list = [];
	vm.listCarros = listCarros;
	vm.listCarros();


	function listCarros() {

		var result = CarrosServices.list();

		result.then(function(response) {
			vm.list = response.data;
		}); 

	}

}
