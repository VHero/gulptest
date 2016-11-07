kimama.controller('B3Ctrl', ['$scope', 'MainService', function($scope, MainService) {
    $scope.info = {
        catName: "PARENTING_TIPS",
        lists: [],
        desc: "",
        page: 1,
        limit: 10,
        loadMore: null,
        domore: false,
        title: "育儿心得"
    };
    var query = {
        catName: $scope.info.catName,
        limit: $scope.info.limit,
        page: $scope.info.page
    };
    $scope.info.loadMore = function() {
        MainService.content.lists({
                catName: $scope.info.catName,
                limit: $scope.info.limit,
                page: $scope.info.page
            })
            .then(function(data) {
                if (data.lists.length < 1) {
                    $scope.info.domore = true;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    return;
                }
                for (index in data.lists) {
                    data.lists[index].desc = MainService.tool.toWrapStr(data.lists[index].desc, 40);
                    data.lists[index].created_dt = MainService.tool.getFullDate(data.lists[index].created_dt);
                }
                $scope.info.lists.push.apply($scope.info.lists, data.lists);
                $scope.info.page++;
                console.log($scope.info.lists);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
    };

}])
