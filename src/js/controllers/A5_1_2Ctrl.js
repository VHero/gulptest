kimama.controller('A5_1_2Ctrl', ['$scope', '$ionicHistory', 'MainService', function($scope, $ionicHistory, MainService) {
    $scope.goBack = function() {
        $ionicHistory.goBack(-1);
    }
    var carArray = ["TRAVEL_ZERO_TWO", "TRAVEL_THREE_FOUR", "TRAVEL_FIVE_SIX", "TRAVEL_SEVEN_EIGHT"];
    $scope.info = {
        lists: [],
        desc: "",
    };

    getUserArticle({ on_cat: carArray[0] });
    getUserArticle({ on_cat: carArray[1] });
    getUserArticle({ on_cat: carArray[2] });
    getUserArticle({ on_cat: carArray[3] });

    function getUserArticle(query) {
        MainService.content.getUserArticle(query)
            .then(function(data) {
                console.log(data);
                for (index in data) {
                    data[index].desc = MainService.tool.toWrapStr(data[index].desc, 40);
                    data[index].created_dt = MainService.tool.getFullDate(data[index].created_dt);
                    $scope.info.lists.push(data[index]);
                }
            })
    }
}])
