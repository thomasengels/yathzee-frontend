angular.module('myApp').controller('profileController', profileController);

profileController.$inject = ['$scope','authentication','profileService','gameService','Upload','ENV'];
function profileController($scope, authentication, profileService, gameService, Upload, ENV) {
    var vm = this;

    vm.test = "test";

    $scope.myGames = [];
    $scope.currentUser = null;

    profileService.getUserByEmail(authentication.currentUser().email, function(err, user) {
        $scope.currentUser = user;
        /*
        gameService.getGamesFrom($scope.currentUser._id, function(err, games) {
            $scope.myGames = games;
        });*/

        gameService.getAllGames(function(err, games){
        	$scope.myGames = games;
        	console.log($scope.myGames);
        });
    });

    $scope.submitProfileImage = function(file, errFiles) {
        console.log("ik zen hier");
        if (errFiles !== null && errFiles.length !== 0) console.log(errFiles[0].$error);
        if (file) {
            var imageUploadObject = new Object();
            imageUploadObject.url = '';
            imageUploadObject.data = null;

            imageUploadObject.url = ENV.api + '/users' + '/' + $scope.currentUser._id + '/profileImage'
            imageUploadObject.data = {
                Name: "image",
                image: file
            };

            file.upload = Upload.upload(imageUploadObject);
            file.upload.then(function(response) {
                $timeout(function() {
                    file.result = response.data;
                });
            }, function(evt) {
                var data = {
                    message: 'File is uploaded'
                };
            });
        }
    };

};