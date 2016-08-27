(function() {
    angular.module('myApp').factory('chatService', chatService);

    chatService.$inject = ['apiFactory'];

    function chatService(apiFactory) {

    	sendChat = function(gameId, message, cb){
    		apiFactory.POST('/games/' + gameId +'/chat', {"from" : "578a2f22f9cc293010edb540","message":message}, 
    			function(err, res){
    				if(err) cb(err, null);
    				else cb(null, res.chat);
    			});
    	}

    	return {
    		sendChat : sendChat
    	};
    }
})();