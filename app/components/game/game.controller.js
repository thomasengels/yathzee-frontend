"use strict";
angular.module('myApp').controller('newGameController', newGameController);

newGameController.$inject = ['profileService', 'authentication', 'gameService', '_'];

function newGameController(profileService, authentication, gameService, _) {
    var vm = this;

    vm.allUsers = [];

    profileService.getAllUsers(function(err, users) {
        vm.allUsers = users;
    });

    vm.inviteNewUser = function() {
        profileService.getUserByEmail(vm.emailAdresNewUser, function(err, user) {
            if (err) vm.message = "Gebruiker bestaat niet";
            else {
                vm.chosenplayer = user;
                vm.message = user.firstname + " is succesvol uitgenodigd voor een nieuw spel";
            }
        });

        vm.emailAdresNewUser = null;

        vm.inviteNewUserForm.$setPristine();
    }

    vm.inviteFriend = function(player) {
        vm.chosenplayer = player;

        vm.searchUser = "";
    }

    vm.createGame = function() {
        var game = [vm.chosenplayer];


        game.push(_.find(vm.allUsers, function(user) {
            return user.email === authentication.currentUser().email;
        }));

        gameService.createNewGame(game, function(err, game) {

        });


    };
};


angular.module('myApp').controller('gameController', gameController);

gameController.$inject = ['gameService', '_', 'profileService', '$stateParams', '$interval', '$location','$scope'];

function gameController(gameService, _, profileService, $stateParams, $interval, $location, $scope) {

    var vm = this;

    vm.gameId = $stateParams.gameId;

    vm.game = null;

    vm.dices = ['1', '2', '3', '4', '5'];

    vm.whoIsPlayingIndex = 0;

    vm.playerThatIsPlaying = null;

    vm.state = "waiting";

    vm.dicesAreRolling = false;


    gameService.getGameById(vm.gameId, function(err, game) {
        if (err) {
        	$scope.$apply(function() {
            $location.path("http://localhost:3000/#/error");
});

        } else {
            vm.game = game;
            vm.whoIsPlayingIndex = gameService.whoWillStartTheGame(vm.game.players.length);
            for (var i = 0; i < vm.game.players.length; i++) {
                var user = {
                    id: game.players[i],
                    score: gameService.estimateYathzeeScores([])
                }
                vm.game.players[i] = user;
            }
        }

    });


    vm.rollDices = function() {
        vm.dicesAreRolling = true;
        vm.state = "rolling";

        $interval(function() {
            for (var j = 0; j < vm.dicesToRoll.length; j++) {
                vm.dicesToRoll[j] = Math.floor(Math.random() * 6) + 1;
            }
        }, 500, 10);

        vm.triesLeft = vm.triesLeft - 1;

        if (vm.triesLeft === 0) {
            //changePlayer();
            updateScore();
        }
        vm.dicesAreRolling = false;

        vm.state = "chooseScore";
    }

    vm.chooseScore = function(index) {

    }

    vm.changeIdToUserName = function(userId) {
        profileService.getUserByEmail(userId);
    }

    function changePlayer() {
        vm.triesLeft = 3;

        if (vm.whoIsPlayingIndex === 1) {
            vm.whoIsPlayingIndex = 0;
        } else {
            vm.whoIsPlayingIndex = 1;
        }
    }

    vm.keepDice = function(diceIndex) {
        vm.dicesKept.push(vm.dicesToRoll[diceIndex]);
        vm.dicesToRoll.splice(diceIndex, 1);

        if (vm.dicesKept.length == 5) {
            vm.game.players[vm.whoIsPlayingIndex].score = gameService.estimateYathzeeScores(vm.dicesKept);
        }

        console.log(vm.game);
    }

    vm.addDiceToRoll = function(diceIndex) {
        vm.dicesToRoll.push(vm.dicesKept[diceIndex]);
        vm.dicesKept.splice(diceIndex, 1);
    }

    function updateScore() {
        var scores = [vm.game.players[0].score, vm.game.players[1].score];
        gameService.updateScoresOfGame(vm.game._id, scores, function(err, game) {
            vm.game = game;
        });
    }

};