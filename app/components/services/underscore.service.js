/*
UNDERSCORESERVICE
enable use of underscore librarie for collection operations
*/
var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);