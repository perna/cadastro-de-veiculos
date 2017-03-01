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

    }]);;angular.module('app').controller('CarrosController', CarrosController);

CarrosController.$inject = ['CarrosService','$routeParams','$location'];

function CarrosController(CarrosService, $routeParams, $location){
 
	var vm      = this;
	vm.id_carro = $routeParams.id || '';
	vm.list     = [];
	vm.carro    = {};
	vm.formCarro;
	vm.currentPage = 1;
	vm.pageSize = 5;
	vm.total;

	//add methods
	vm.listCarros  = listCarros;
	vm.createCarro = createCarro;
	vm.getCarro    = getCarro;
	vm.updateCarro = updateCarro;
	vm.deleteCarro = deleteCarro;


	function listCarros() {

		var result = CarrosService.list();

		result.then(function(response) {
			vm.total = response.data.length;
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
				vm.message = 'Cadastro realizado com sucesso! Voltando para a listagem de carros...';
				vm.showMessage = true;
				vm.typeMessage = true;
				setTimeout($location.path('/'), 2000);

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

	function deleteCarro(id) {
		CarrosService.showDeleteQuestion(function() {
			
			var result = CarrosService.remove(id);
			
			result.then(function(data){
				
				for(var i = 0; i < vm.list.length; i++) {
    				if(vm.list[i].id == id) {
        				vm.list.splice(i, 1);
        				break;
        			}
    			}

				$location.path('/');
			});

		});

	}



}
;angular.module('app').factory('CarrosService', CarrosService);

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