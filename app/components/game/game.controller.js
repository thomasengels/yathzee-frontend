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
             if(game){
                console.log("game is created");
             }   
             else{
                console.log("error, game not created");
             }
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

    vm.estimatedScores = [];

    vm.getNameOfUserById = function(id){
        return profileService.getUsers().filter(function(user){ 
            return user._id === id; })[0];
    }


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

    vm.scoreIsASum = function(scoreType){
        var sumScores = ['Total','Kans','LowerTotaal','UpperTotal'];

        return (sumScores.indexOf(scoreType) >= 0);
    }


    vm.rollDices = function() {

        vm.canPlayerRole = false;

        $interval(function() {
            for (var j = 0; j < vm.dicesToRoll.length; j++) {
                vm.dicesToRoll[j] = Math.floor(Math.random() * 6) + 1;
            }
        }, 500, 10);

        vm.triesLeft = vm.triesLeft - 1;

        if (vm.triesLeft <= 0) {
            vm.canPlayerRole = false;
        }
        else{
            vm.canPlayerRole = true;
        }
    }

    vm.chooseScore = function(key) {
        vm.game.scores[vm.whoIsPlayingIndex][key] = vm.estimatedScores[vm.whoIsPlayingIndex][key];
        updateScore();
        changePlayer();
    }

    vm.changeIdToUserName = function(userId) {
        profileService.getUserByIdWithPromise(userId).then(function(user){
            return user.firstName;
        });
    }

    function changePlayer() {
        vm.triesLeft = 3;

        if (vm.whoIsPlayingIndex === 1) {
            vm.whoIsPlayingIndex = 0;
        } else {
            vm.whoIsPlayingIndex = 1;
        }
    }

    vm.canIshowEstimatedScores = function(playerIndex, score){
        //console.log("Player " + vm.whoIsPlayingIndex + " Tries " + vm.triesLeft + " score " + score + " diceskept " + vm.dicesKept);
        if(playerIndex === vm.whoIsPlayingIndex){
            if(vm.triesLeft === 0){
                if(score === 0){
                    if(vm.dicesToRoll.length === 0){
                        return true;
                    }
                    return false;
                }
                return false;
            }
            return false;
        }

        return false;
    }

    vm.keepDice = function(diceIndex) {
        vm.dicesKept.push(vm.dicesToRoll[diceIndex]);
        vm.dicesToRoll.splice(diceIndex, 1);

        
        if(vm.dicesToRoll.length === 0 & vm.triesLeft === 0){
            vm.estimatedScores[vm.whoIsPlayingIndex] = gameService.estimateYathzeeScores(vm.dicesKept);
            console.log(vm.estimatedScores);
        }
    }

    vm.addDiceToRoll = function(diceIndex) {
        vm.dicesToRoll.push(vm.dicesKept[diceIndex]);
        vm.dicesKept.splice(diceIndex, 1);
    }

    function updateScore() {
        console.log("controller update scores");
        gameService.updateScoresOfGame(vm.game._id, vm.game.scores, function(err, game) {
            vm.game.scores = game.scores;
        });
    }

};