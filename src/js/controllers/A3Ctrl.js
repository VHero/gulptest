/*kimama
    .controller('A3Ctrl', function($rootScope, $scope, $http, MainService) {
        $scope.url = 'NEWSFEED';
        $scope.share = MainService.onePageNew();
        $scope.pagePublic = function() {
            if ($scope.share.getDataArray().length == 0) {
                MainService.login(MainService.getUnionid())
                    .then(function(res) {
                        getData();
                    })
            } else {
                if ($scope.share.getDataArray().length < $scope.share.getTotalLength()) {
                    getData();
                } else {
                    $scope.A3 = $scope.share.getDataArray();
                }
            }


        }

        function getData() {
            if ($rootScope.isLoading === true) {
                return;
            }
            $rootScope.isLoading = true;
            MainService.getList($scope.url, 1, 10)
                .then(function(res) {
                    $rootScope.isLoading = false;
                    console.log(res);
                    if ($scope.share.getTotalLength == 0) {
                        $scope.share.setTotalLength(res.totalCount);
                        $scope.share.setDataArray(res.lists);
                        $scope.A3 = res.lists;
                    }
                    if (res.lists.length != 0) {
                        if ($scope.share.getDataArray().length == 0) {
                            $scope.share.setDataArray(res.lists);
                            $scope.A3 = $scope.share.getDataArray();
                        } else {
                            $scope.share.setDataArray(res.lists);
                            $scope.share.DataArray.push.apply($scope.share.DataArray, res.lists);
                        }
                    }

                })
        }

    })
*/
kimama.controller('A3Ctrl', ['$scope', function($scope){
    
}])