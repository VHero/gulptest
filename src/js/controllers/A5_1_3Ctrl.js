kimama.controller('A5_1_3Ctrl', ['$scope', '$ionicHistory', 'MainService', function($scope, $ionicHistory, MainService) {
    $scope.goBack = function() {
        $ionicHistory.goBack(-1);
    }
    var carArray = ["ANSWER_ZERO_TWO", "ANSWER_THREE_FOUR", "ANSWER_FIVE_SIX", "ANSWER_SEVEN_EIGHT"];
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
