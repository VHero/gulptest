kimama.controller('C2Ctrl', ['$scope', 'MainService', function($scope, MainService) {
    $scope.rewards = {
        lists: [],
        loadMore: null,
        domore: false,
        page: 1,
        limit: 5,
        exchange_status: 'EXCH_WAITING_CONFIRM',
        is_my_exchange_history: true,
        delivery_name: [],
        delivery_phonenum: [],
        delivery_address: [],
        exchange:[]
    }
    var query = {
    	rewardid:"",
        name: "",
        address: "",
        phone: ""
    }
    $scope.rewards.loadMore = loadMore;
    $scope.submit = submit;
    $scope.exchange=exchange;
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

    function submit(index) {
        query.name = $scope.rewards.delivery_name[index];
        query.phone = $scope.rewards.delivery_phonenum[index];
        query.address = $scope.rewards.delivery_address[index];
        query.rewardid=$scope.rewards.lists[index].id;
        console.log(query);
       MainService.rewards.exchange(query).then(function(data){
       	console.log(data);
       })
    }

    function exchange(index) {
    	$scope.rewards.exchange[index]=true;
    }
}])
