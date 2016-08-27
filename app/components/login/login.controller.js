"use strict"
angular.module('myApp').controller('loginController', loginController);

loginController.$inject = ['$rootScope','$location','authentication', '$window'];

function loginController($rootScope, $location, authentication, $window){
	var vm = this;

	vm.pageheader = {
		title: 'Login to yathzee'
	};

	vm.credentials = {
		email : "",
		password: ""
	};
	

	vm.returnPage = $location.search().page || 'home';

	vm.login = function(){
		vm.formError = "";

		if (!vm.credentials.email || !vm.credentials.password){
			vm.formError = "Alle velden zijn vereist";
			return false;
		}
		else  {
			vm.doLogin();
		}
	}

	vm.doLogin = function(){
		vm.formError = "";
		authentication.login(vm.credentials).error(function(err){
			vm.formError = err;
		})
		.then(function(){
			if($rootScope.returnToState === "/game/:gameId"){
				$location.path("/game/" + $rootScope.returnToStateParams);
			}
			else{
					$location.search('page', null);
			$window.location.href = 'http://localhost:3000/#/home';
			}
		
		}).catch(function(err){
			vm.errors.other = err.message;
		});
	}
}