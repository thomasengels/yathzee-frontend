/*
HTTPSERIVCE
bridge between services and nodejs backend
every api call
*/
(function () {
    angular.module('myApp').factory('yathzeeCalculateService', yathzeeCalculateService);

    yathzeeCalculateService.$inject = ['_'];

    function yathzeeCalculateService(_) {

        sum = function(arr) {
            return _.reduce(arr, function(memo, num) {
                return parseInt(memo) + parseInt(num)
            })
        }

        getStraight = function(dices) {
            var sorted = _.sortBy(dices, function(num) {
                return num
            })
            var straight = 0
            for (var i = 0; i < sorted.length; i++) {
                if (sorted[i] + 1 === sorted[i + 1]) {
                    if (straight === 0) straight = 1
                    straight++
                }
            }
            return straight
        }

        isSmallStraight = function(dices) {
            return getStraight(dices) >= 4
        }

        isLargeStraight = function(dices) {
            return getStraight(dices) === 5
        }

        getSameCount = function(dices) {
            var results = []
            for (var i = 0; i < dices.length; i++) {
                if (isNaN(results[dices[i]])) {
                    results[dices[i]] = 0
                }
                results[dices[i]] += 1
            }
            return results
        }

        manyOfAKind = function(dices, num) {
            var results = getSameCount(dices)
            for (var k in results) {
                if (results.hasOwnProperty(k)) {
                    if (results[k] >= num) return true
                }
            }
            return false
        }

        getAmountOfArrayNumber = function(dices, num) {
            var results = getSameCount(dices)
            return results[num] ? results[num] : 0
        }

        threeOfAKind = function(dices) {
            return manyOfAKind(dices, 3)
        }

        fourOfAKind = function(dices) {
            return manyOfAKind(dices, 4)
        }

        yahtzee = function(dices) {
            return manyOfAKind(dices, 5)
        }

        fullHouse = function(dices) {
            var results = getSameCount(dices)
            return results.indexOf(2) > -1 && results.indexOf(3) > -1
        }
        return {

            sum : sum,
            getStraight : getStraight,
            isSmallStraight : isSmallStraight,
            isLargeStraight : isLargeStraight,
            getSameCount : getSameCount,
            manyOfAKind : manyOfAKind,
            getAmountOfArrayNumber : getAmountOfArrayNumber,
            threeOfAKind : threeOfAKind,
            fourOfAKind : fourOfAKind,
            yahtzee : yahtzee,
            fullHouse : fullHouse
        };
    }
})();