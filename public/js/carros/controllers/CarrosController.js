angular.module('app').controller('CarrosController', CarrosController);

CarrosController.$inject = ['CarrosService','$routeParams','$location'];

function CarrosController(CarrosService, $routeParams, $location){
 
	var vm      = this;
	vm.id_carro = $routeParams.id || '';
	vm.list     = [];
	vm.carro    = {};
	vm.formCarro;

	//add methods
	vm.listCarros  = listCarros;
	vm.createCarro = createCarro;
	vm.getCarro    = getCarro;
	vm.updateCarro = updateCarro;


	function listCarros() {

		var result = CarrosService.list();

		result.then(function(response) {
			vm.list = response.data;
		}); 

	}

	function createCarro() {

		if(vm.formCarro.$valid){

			var data = {
						id: 0,
						placa: vm.carro.placa, 
						modelo: vm.carro.modelo,
						marca: vm.carro.marca,
						imagem: vm.carro.imagem || null,
						combustivel: vm.carro.combustivel || null,
						valor: vm.carro.valor || null
					};


			var result = CarrosService.save(data)

			result.then(function(response){
				vm.message = 'Cadastro realizado com sucesso';
				vm.showMessage = true;
				vm.typeMessage = true;

			})
			.catch(function(err){
				vm.message = err
				vm.showMessage = true;
				vm.typeMessage = false;
			});
		}
	}

	function getCarro(id) {
		var result = CarrosService.getById(id)

		result.then(function(response) {
			vm.carro = response.data;
			console.log(response.data)
		});
	}

	function updateCarro() {
		
		if(vm.formEditCarro.$valid){

			var result = CarrosService.update(vm.carro.id, vm.carro);

			result.then(function(response) {
				$location.path('/');
			}).catch(function(err){
				console.log(err)
			});
		}
	}

}
