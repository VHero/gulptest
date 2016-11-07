kimama.controller('C2_1Ctrl', ['$scope', 'MainService', function($scope, MainService) {
    $scope.rewards = {
        lists: [],
        loadMore: null,
        domore: false,
        page: 1,
        limit: 5,
        exchange_status: 'EXCH_DENIED',
        is_my_exchange_history: true,
    }
    $scope.rewards.loadMore = loadMore;

    function loadMore() {
        MainService.rewards.rewardsHistory({
            exchange_status: $scope.rewards.exchange_status,
            is_my_exchange_history: $scope.rewards.exchange_status,
            page: $scope.rewards.page,
            limit: $scope.rewards.limit
        }).then(function(data) {
            console.log(data);
            if (data.length < 1) {
                $scope.rewards.domore = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            }
            $scope.rewards.lists.push.apply($scope.rewards.lists, data);
            $scope.rewards.page++;
            console.log($scope.rewards.lists);
            $scope.$broadcast('scroll.infiniteScrollComplete');

        })

    }
}])
