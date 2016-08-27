angular.module('myApp').controller('profileController', profileController);

profileController.$inject = ['$scope','authentication','profileService','gameService','Upload','ENV','modalService','$timeout','modalService'];
function profileController($scope, authentication, profileService, gameService, Upload, ENV, modalService, $timeout,modalService) {
    var vm = this;

    vm.test = "test";

    $scope.myGames = [];
    $scope.currentUser = null;

    $scope.api = ENV.api;

    $scope.allUsers = [];

    profileService.getAllUsers(function(err, users){
        $scope.allUsers = users;
    });

    $scope.stats = null;

    profileService.getUserByEmail(authentication.currentUser().email, function(err, user) {
        $scope.currentUser = user;
        //$scope.currentUser.avatar.data = btoa(String.fromCharCode.apply(null, new Uint8Array($scope.currentUser.avatar.data)));
        console.log($scope.currentUser.avatar.data);
        
        gameService.getGamesFrom($scope.currentUser._id, function(err, games) {
            $scope.myGames = games;
        });

        profileService.getStatsOfUser($scope.currentUser._id, function(err, stats){
            if(err){
                modalService.confirmDialog("Server error", "statistieken konden niet opgehaald worden", "oké", "oké");
            }
            else{
                $scope.stats = stats;
            }
        });
    });

    $scope.submitProfileImage = function(file, errFiles) {
        if (errFiles !== null && errFiles.length !== 0) console.log(errFiles[0].$error);
        if (file) {
            var imageUploadObject = new Object();
            imageUploadObject.url = '';
            imageUploadObject.data = null;

            imageUploadObject.url = ENV.api + '/users' + '/' + $scope.currentUser._id + '/profilePic'
            imageUploadObject.data = {
                Name: "image",
                image: file
            };

            file.upload = Upload.upload(imageUploadObject);
            file.upload.then(function(response) {
                $timeout(function() {
                    file.result = response.data;
                });
                $scope.currentUser.avatar = response.data.imageBase64;
            }, function(evt) {
                console.log(evt);
                var data = {
                    message: 'File is uploaded'
                };
            });
        }
    };

    $scope.idThatHasWon = function(game){
        if(game.scores[0]['Total'] > game.scores[1]['Total']){
            return game.players[0];
        }
        else{
            return game.players[1];
        }
    }

    $scope.makeNewGame = function (ev) {
        modalService.customDialog('newGameModalController', './app/components/game/modal/newGame.modal.html', {
        }, ev).then(function (result) {
            if (result) {
                
            }
        });

        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    }

    $scope.inviteForGame = function(index){
        var game = [];
        game.push($scope.currentUser);
        game.push($scope.allUsers[index]);

        console.log(game),

        gameService.createNewGame(game, function(err, game){
            if(game){
                modalService.confirmDialog("Invited for game","You have invited " + game.players[1] + " for a game. Waiting for acception",
                    "Oke","Cancel invitation");
            }
            else{
                modalService.confirmDialog("Invitation failed, wanne try again?",
                    "Oke","Cancel invitation");
            }
        });
    }

    $scope.openProfile = function(index,ev){
        modalService.customDialog('userModalController', 
            './app/components/profile/modal/user.modal.html', {
            'user' : angular.copy($scope.allUsers[index])}, ev);
    };


};