(function() {
	'use strict';

	angular
	  .module('myApp')
	  .directive('chat', chatDirective);

	function chatDirective() {
		return{
			controller: 'chatController',
			controllerAs: 'dvm',
			restrict: 'EA',
		  	bindToController: {
        		game: '=',
    		},
			templateUrl: 'app/components/directives/chat/chat.template.html'
		};
	}
})();