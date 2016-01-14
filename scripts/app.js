var app = angular.module('betting', ['ui.router']);

app.controller('bettingController', function ($scope, $http, $state) {

    $scope.availableBets = [];
    $scope.availableBetsErrorMessage = null;
    $scope.selectedBets = [];
    $scope.betsMade = [];

    $scope.addBetToSelectedBets = function (bet) {
        $scope.selectedBets.push({
            "bet_id": bet.bet_id,
            "odds": bet.odds,
            "event": bet.event,
            "name": bet.name,
            "stake": 1
        });
    };
    $scope.removeBetFromSelectedBets = function (bet) {
        var index = $scope.selectedBets.indexOf(bet);
        $scope.selectedBets.splice(index, 1);

        if ($scope.selectedBets.length === 0 && $state.is('bettingSlip')) {
            $state.go('availableBets');
        }
    };

    $scope.getPossibleReturnForBet = function (bet) {
        if (bet !== null) {
            var possibleReturn = bet.stake * (bet.odds.numerator / bet.odds.denominator + 1);
            if (!isNaN(possibleReturn)) {
                return possibleReturn.toFixed(2);
            }
        }
        return 0;
    };

    $scope.getOdds = function (bet) {
        if (bet === null || !bet.odds)
            return;
        else if (bet.odds.numerator == 1)
            return 'evens';
        else
            return bet.odds.numerator + ':' + bet.odds.denominator;
    };

    $scope.placeBets = function (bets) {
        var i = 0;
        while (i < 5) {
            bets.forEach(function (bet) {
                console.log(bet);
                if (bet.stake > 0) {
                    $scope.postBet(bet);
                }
            });
            i++;
        }
        $state.go('receipt');
    };

    $scope.postBet = function (bet) {
        var data = {
            "bet_id": bet.bet_id,
            "odds": bet.odds,
            "stake": bet.stake
        };

        bet.transaction_id = "123456";
        $scope.betsMade.push(bet);
        $scope.removeBetFromSelectedBets(bet);
    };

    $scope.getAvailableBets = function () {
        $scope.availableBets = [{
            "bet_id": 1,
            "event": "World Cup 2018",
            "name": "England",
            "odds": {
                "numerator": 10,
                "denominator": 1
            }
        }, {
            "bet_id": 2,
            "event": "World Cup 2018",
            "name": "Brazil",
            "odds": {
                "numerator": 1,
                "denominator": 1
            }
        }, {
            "bet_id": 3,
            "event": "World Cup 2018",
            "name": "Spain",
            "odds": {
                "numerator": 3,
                "denominator": 1
            }
        }, {
            "bet_id": 4,
            "event": "Next General Election",
            "name": "Labour",
            "odds": {
                "numerator": 7,
                "denominator": 4
            }
        }, {
            "bet_id": 5,
            "event": "Next General Election",
            "name": "Conservatives",
            "odds": {
                "numerator": 2,
                "denominator": 1
            }
        }, {
            "bet_id": 6,
            "event": "Next General Election",
            "name": "Liberal Democrats",
            "odds": {
                "numerator": 17,
                "denominator": 1
            }
        }];
    };
    $scope.getAvailableBets();
});

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('availableBets', {
            url: "/",
            templateUrl: "./views/availableBets.html"
        })
        .state('bettingSlip', {
            url: "/bettingSlip",
            templateUrl: "./views/bettingSlip.html"
        })
        .state('receipt', {
            url: "/receipt",
            templateUrl: "./views/receipt.html"
        });
});
