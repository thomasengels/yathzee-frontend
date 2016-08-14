(function() {
    angular.module('myApp').service('gameService', gameService);

    gameService.$inject = ['apiFactory', 'yathzeeCalculateService'];

    function gameService(apiFactory, yathzeeCalculateService) {

        yathzeeScoreCat = {
            "Een": 0,
            "Twee": 0,
            "Drie": 0,
            "Vier": 0,
            "Vijf": 0,
            "Zes": 0,
            "Drie dezelfde": 0,
            "Vier dezelfde": 0,
            "Full house": 0,
            "Kleine straat": 0,
            "Grote straat": 0,
            "Kans": 0,
            "YATHZEE": 0
        };

        updateScoresOfGame = function(gameId, scores, cb){
            apiFactory.PUT('/games/' + gameId + '/scores', {"scores" : scores},
                function(err, res){
                    if(err) cb(err,null);
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

        	for(var key in yathzeeScoreCat){
        		if(key == "Een"){
        			temp = yathzeeCalculateService.getSameCount(dices);
        			if(!angular.isUndefined(temp["1"])){
        				yathzeeScoreCat[key] = 1 * temp["1"];
        			}
        		}else if(key == "Twee"){
        			 temp = yathzeeCalculateService.getSameCount(dices);
        			if(!angular.isUndefined(temp["1"])){
        				yathzeeScoreCat[key] = 2 * temp["2"];
        			}
        			     
        		}else if(key == "Drie"){
        		
        			     			temp = yathzeeCalculateService.getSameCount(dices);
        			if(!angular.isUndefined(temp["1"])){
        				yathzeeScoreCat[key] = 3 * temp["3"];
        			}
        			        			
        		}else if(key == "Vier"){
        		
        			     			temp = yathzeeCalculateService.getSameCount(dices);
        			if(!angular.isUndefined(temp["1"])){
        				yathzeeScoreCat[key] = 4 * temp["4"];
        			}
        			        		
        		}else if(key == "Vijf"){
        	
        			     			temp = yathzeeCalculateService.getSameCount(dices);
        			if(!angular.isUndefined(temp["1"])){
        				yathzeeScoreCat[key] =5 * temp["5"];
        			}
        			        		
        		}else if(key == "Zes"){
        	
        			     			temp = yathzeeCalculateService.getSameCount(dices);
        			if(!angular.isUndefined(temp["1"])){
        				yathzeeScoreCat[key] = 6 * temp["6"];
        			}

        		}
        		else if(key == "Drie dezelfde"){
        
        			yathzeeScoreCat[key] = yathzeeCalculateService.threeOfAKind(dices);
        			        		
        		}	else if(key == "Vier dezelfde"){
        			
        			yathzeeScoreCat[key] = yathzeeCalculateService.threeOfAKind(dices);
        			        			
        		}
        		else if(key == "Full house"){
        		
        			yathzeeScoreCat[key] = yathzeeCalculateService.fullHouse(dices);
        			        			
        		}
        		else if(key == "Kleine straat"){
        	
        			yathzeeScoreCat[key] = yathzeeCalculateService.isSmallStraight(dices);
        			        		
        		}
        		else if(key == "Grote straat"){
        	
        			yathzeeScoreCat[key] = yathzeeCalculateService.isLargeStraight(dices);
        			        		
        		}else if(key == "Kans"){
        			
        			yathzeeScoreCat[key] = yathzeeCalculateService.sum(dices);
        			        	
        		}else if(key == "YATHZEE"){
       
        			yathzeeScoreCat[key] = yathzeeCalculateService.yahtzee(dices);
        			        		
        		}
        	}

        	return yathzeeScoreCat;
        }

        return {
            updateScoresOfGame:updateScoresOfGame,
            createNewGame: createNewGame,
            getGameById: getGameById,
            getGamesFrom: getGamesFrom,
            getAllGames: getAllGames,
            whoWillStartTheGame: whoWillStartTheGame,
            estimateYathzeeScores : estimateYathzeeScores
        };
    }
})();