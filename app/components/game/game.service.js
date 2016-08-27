(function() {
    angular.module('myApp').service('gameService', gameService);

    gameService.$inject = ['apiFactory', 'yathzeeCalculateService','_'];

    function gameService(apiFactory, yathzeeCalculateService,_) {

        var keys = ["Een", "Twee", "Drie", "Vier", "Vijf", "Zes", "GroteStraat", "KleineStraat", "Fullhouse", "DrieDezelfde", "VierDezelfde", "Yathzee","Kans"];

        updateScoresOfGame = function(gameId, scores, cb) {
            console.log("we zitten in de update functie" + scores);
            apiFactory.PUT('/games/' + gameId + '/scores', {
                    "scores": scores
                },
                function(err, res) {
                    if (err) cb(err, null);
                    else cb(null, res.game);
                });
        };

        createNewGame = function(game, cb) {
            apiFactory.POST('/games', {
                "newGame": game
            }, function(err, res) {
                if (err) cb(err, null);
                else cb(null, res.game);
            });
        };

        getGameById = function(id, cb) {
            apiFactory.GET('/games/' + id, function(err, res) {
                if (err) cb(err, null);
                else cb(null, res.game);
            });
        };

        getGamesFrom = function(userId, cb) {
            apiFactory.GET('/users/' + userId + '/games', function(err, res) {
                if (err) cb(err, null);
                else {
                    cb(null, res.games);
                }
            });
        };

        getAllGames = function(cb) {
            apiFactory.GET('/games', function(err, res) {
                if (err) cb(err, null);
                else cb(null, res.games);
            });
        };

        whoWillStartTheGame = function(amountOfPlayers) {
            return Math.floor(Math.random() * amountOfPlayers);
        };

        estimateYathzeeScores = function(dices) {
            var temp = null;
            var previousScore = [];

            for (var key in keys) {
                if (keys[key] === "Een") {

                     previousScore[keys[key]] = yathzeeCalculateService.getAmountOfArrayNumber(dices, 1) * 1;

                } else if (keys[key] === "Twee") {

                     previousScore[keys[key]] = yathzeeCalculateService.getAmountOfArrayNumber(dices, 2) * 2;

                } else if (keys[key] === "Drie") {

                     previousScore[keys[key]] = yathzeeCalculateService.getAmountOfArrayNumber(dices, 3) * 3;

                } else if (keys[key] === "Vier") {

                     previousScore[keys[key]] = yathzeeCalculateService.getAmountOfArrayNumber(dices, 4) * 4;

                } else if (keys[key] === "Vijf") {

                     previousScore[keys[key]] = yathzeeCalculateService.getAmountOfArrayNumber(dices, 5) * 5;

                } else if (keys[key] === "Zes") {

                     previousScore[keys[key]] = yathzeeCalculateService.getAmountOfArrayNumber(dices, 6) * 6;

                } else if (keys[key] === "DrieDezelfde") {

                    previousScore[keys[key]] = yathzeeCalculateService.threeOfAKind(dices);

                } else if (keys[key] === "VierDezelfde") {

                    previousScore[keys[key]] = yathzeeCalculateService.fourOfAKind(dices);

                } else if (keys[key] === "Fullhouse") {

                    previousScore[keys[key]] = yathzeeCalculateService.fullHouse(dices);

                } else if (keys[key] === "KleineStraat") {

                    previousScore[keys[key]] = yathzeeCalculateService.isSmallStraight(dices);

                } else if (keys[key] === "GroteStraat") {

                    previousScore[keys[key]] = yathzeeCalculateService.isLargeStraight(dices);

                } else if (keys[key] === "Kans") {

                    previousScore[keys[key]] = yathzeeCalculateService.sum(dices);

                } else if (keys[key] === "Yathzee") {

                    previousScore[keys[key]] = yathzeeCalculateService.yahtzee(dices);

                }
            }

            return previousScore;
        }

        return {
            updateScoresOfGame: updateScoresOfGame,
            createNewGame: createNewGame,
            getGameById: getGameById,
            getGamesFrom: getGamesFrom,
            getAllGames: getAllGames,
            whoWillStartTheGame: whoWillStartTheGame,
            estimateYathzeeScores: estimateYathzeeScores
        };
    }
})();