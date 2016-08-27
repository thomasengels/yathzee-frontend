(function(){
	angular.module('myApp').service('profileService', service);

	service.$inject = ['apiFactory','$http','$q','notificationService'];

	function service(apiFactory, $http,$q, notificationService){

		var users = [];


	    var my_channel = notificationService.getClient().subscribe('users');

	    my_channel.bind('add', function(user){
	        users.push(user);
	    });


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


		getUserByIdWithPromise = function(userId){
			var def = $q.defer();
			$http.get('http://localhost:3001/api/users/' + userId)
				.success(function(data){
					console.log("check");
					def.resolve(data);
				})
				.error(function(){
					console.log("failed");
					def.reject("failed to get user");
				});

			console.log(def.promise);


			return def.promise;

		};

		getStatsOfUser = function(userId, cb){
			apiFactory.GET('/users/' + userId + '/stats', function(err, res){
				if(err) cb(err, null);
				else cb(null, res.stats);
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
				else {
					users = res.users;
					cb(null, res.users)
				};
			});
		};

		getUsers = function(){
			return users;
		}

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

        getStatisticsOfUserById = function(id){
        	apiFactory.GET('/users/' + id + '/statistics', function(err, res){
        		if(err) cb(err, null);
        		else cb(null, res.statistics);
        	});
        };

		return {
			getUsers: getUsers,
			getFriendsFrom : getFriendsFrom,
			getAllUsers : getAllUsers,
			getUserByEmail: getUserByEmail,
			getUserById:getUserById,
			getStatisticsOfUserById:getStatisticsOfUserById,
			getUserByIdWithPromise:getUserByIdWithPromise,
			getStatsOfUser:getStatsOfUser
		};
	}
})();
