angular.module('myApp')
    .controller('menuController', ['ENV','authentication','$window','$pusher','$location', menuController]);

function menuController(ENV, authentication, $window,$pusher, $location) {
    var vm = this;

    vm.isLoggedIn = function(){
    	return authentication.isLoggedIn();
    };

    vm.logout = function(){
    	authentication.logout();
    };

    vm.goToHome = function(){
    	$window.location.href = 'http://localhost:3000/#/home';
    };

      var client = new Pusher('12eadd40754c277d4d3b', {
        cluster: 'eu',
        encrypted: true
    });
    var pusher = $pusher(client);
    var my_channel = pusher.subscribe('game');

    my_channel.bind('changed', function(game) {
        console.log("notificatie ontvangen");
        if($location.path().indexOf(game._id) > -1){
            vm.gameNotifications.push(game);
        }
    });
}