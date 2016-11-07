kimama.controller('A5_1Ctrl', ['$scope', '$ionicHistory', 'MainService', function($scope, $ionicHistory, MainService) {
    $scope.goBack = function() {
        $ionicHistory.goBack(-1);
    }
    $scope.info = {
        lists: [],
        desc: "",
    };
    var query = {
        catName: $scope.info.catName,
        limit: $scope.info.limit,
        page: $scope.info.page
    };

    MainService.content.getUserArticle()
        .then(function(data) {
            console.log(data);
            for (index in data) {
                data[index].desc = MainService.tool.toWrapStr(data[index].desc, 40);
                data[index].created_dt = MainService.tool.getFullDate(data[index].created_dt);
            }
            $scope.info.lists = data;
            console.log($scope.info.lists);
        })

}])
