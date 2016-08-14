angular.module('myApp').controller('registerController', registerController);

registerController.$inject = ['$location','authentication'];

function registerController($location, authentication){
  var vm = this;

  var pageHeader = {
    title: 'Registreer nieuwe gebruiker'
  };

  vm.credentials = {
    email: "",
    firstname: "",
    lastname: "",
    passowrd:""
  };

  vm.returnPage = $location.search().page || '/';

  vm.register = function(){
    vm.formError = "";
    if(!vm.credentials.email || !vm.credentials.firstname || !vm.credentials.lastname || !vm.credentials.password){
      vm.formError = "Vul alle velden in om te kunnen registeren!";
      return false;
    } else{
      vm.doRegister();
    }
  };


  vm.doRegister = function(){
    vm.formError = "";
    authentication.register(vm.credentials).error(function(err){
      vm.formError = err;
    })
    .then(function(){
      $location.search('page', null);
      $location.path(vm.returnPage);
    });
  }
}