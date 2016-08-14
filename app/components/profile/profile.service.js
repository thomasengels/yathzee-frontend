(function(){
	angular.module('myApp').service('profileService', service);

	service.$inject = ['apiFactory'];

	function service(apiFactory){

		getUserByEmail = function(email, cb){
			apiFactory.GET('/users/' + email, function (err, res) {
                if (err) cb(err, null);
                else cb(null, res.user);
            });
		};

		getUserById = function(userId, cb){
			apiFactory.GET('/users/' + userId, function(err, res){
				if(err) cb(err, null);
				else cb(null, res.user);
			});
		};


		getFriendsFrom = function(email, cb){
			apiFactory.GET('/users/' + email + '/friends', function(err, res){
				if(err) cb(err, null);
				else cb(null, res.users);
			});
		};

		getAllUsers = function(cb){
			apiFactory.GET('/users', function(err, res){
				if(err) cb(err, null);
				else cb(null, res.users);
			});
		};

		querySearch = function(array, query) {
            var results = query ? array.filter(createFilterFor(query)) : [];
            return results;
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(user) {
                return (angular.lowercase(user.firstname).startsWith(lowercaseQuery));
            };
        };

		return {
			getFriendsFrom : getFriendsFrom,
			getAllUsers : getAllUsers,
			getUserByEmail: getUserByEmail,
			getUserById:getUserById
		};
	}
})();
