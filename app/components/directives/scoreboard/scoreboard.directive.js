(function() {
	'use strict';

	angular
	  .module('myApp')
	  .directive('scoreboard', directiveDirective);

	function directiveDirective() {
		return{
			controller: 'scoreboardController',
			controllerAs: 'dvm',
			restrict: 'EACM',
		  	scope: {
        		spelers: '=',
    		},
			templateUrl: 'app/components/directives/scoreboard/scoreboard.template.html'
		};
	}
})();