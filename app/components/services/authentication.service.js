(function () {

  angular
    .module('myApp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window', 'ENV'];
  function authentication ($http, $window, ENV) {

    var saveToken = function (token) {
      $window.localStorage['token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['token'];
    };

    var isLoggedIn = function() {
      var token = getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          email : payload.email,
          firstname : payload.firstname,
          lastname : payload.lastname
        };
      }
    };

    register = function(user) {
      return $http.post(ENV.api + '/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    login = function(user) {
      return $http.post(ENV.api + '/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    logout = function() {
      $window.localStorage.removeItem('token');
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    };
  }


})();