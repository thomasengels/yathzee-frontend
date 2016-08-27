angular.module('myApp')
    .controller('menuController', ['notificationService','ENV','authentication','$window','$location', menuController]);

function menuController(notificationService, ENV, authentication, $window, $location) {
    var vm = this;

    vm.dropdownIsOpen = false;

    vm.currentUser = authentication.currentUser();

    console.log(vm.currentUser);

    vm.isLoggedIn = function(){
    	return authentication.isLoggedIn();
    };

    vm.logout = function(){
    	authentication.logout();
    };

    vm.goToHome = function(){
    	$window.location.href = 'http://localhost:3000/#/home';
    };

    var my_channel = notificationService.getClient().subscribe('game');

    my_channel.bind('changed', function(game) {
        console.log("notificatie ontvangen");
        if($location.path().indexOf(game._id) > -1){
            vm.gameNotifications.push(game);
        }
    });
}