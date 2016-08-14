/*
HTTPSERIVCE
bridge between services and nodejs backend
every api call
*/
(function() {
    angular.module('myApp').factory('apiFactory', apiFactory);

    apiFactory.$inject = ['$http', 'ENV'];

    var errorCallback = function(response) {
        console.log(response.status + ": " + response.statusText);

    };

    function apiFactory($http, ENV) {

        var GET = function(url, cb) {
            $http.get(ENV.api + url).then(function(res) {
                cb(null, res.data);
            }, function(res) {
                cb(res, null);
            });
        };

        var POST = function(url, data, cb) {
            $http.post(ENV.api + url, data).then(function(res) {
                cb(null, res.data);
            }, function(res) {
                cb(res, null);
            });
        };

        var DELETE = function(url, cb) {
            $http.delete(ENV.api + url).then(function(res) {
                cb(null, res.data);
            }, function(res) {
                cb(res, null);
            });
        };

        var PUT = function(url, data, cb) {
            $http.put(ENV.api + url, data).then(function(res) {
                cb(null, res.data);
            }, function(res) {
                cb(res, null);
            });
        };

        return {

            GET: GET,
            POST: POST,
            DELETE: DELETE,
            PUT: PUT
        };
    }
})();