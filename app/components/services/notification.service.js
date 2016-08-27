(function() {
    angular.module('myApp').factory('notificationService', notificationService);

    notificationService.$inject = ['$pusher'];

    function notificationService($pusher) {

      var client = new Pusher('12eadd40754c277d4d3b', {
        cluster: 'eu',
        encrypted: true
	    });
	    var pusher = $pusher(client);
	    

    	var getClient = function(){
    		return pusher;
    	};

    	return {
    		getClient : getClient
    	};
    }
})();