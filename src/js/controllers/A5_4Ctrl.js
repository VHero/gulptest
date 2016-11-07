kimama.controller('A5_4Ctrl', ['$scope', '$ionicHistory', 'MainService', '$location', function($scope, $ionicHistory, MainService, $location) {
    $scope.goBack = function() {
        $ionicHistory.goBack(-1);
    }
    $scope.info = {
        delivery_address: "",
        delivery_name: "",
        delivery_phonenum: ""
    }
    $scope.submit = submit;
    var query = {
        delivery_address: "",
        delivery_name: "",
        delivery_phonenum: ""
    };

    function submit() {
        query.delivery_address = $scope.info.delivery_address;
        query.delivery_name = $scope.info.delivery_name;
        query.delivery_phonenum = $scope.info.delivery_phonenum;
        console.log(query);
        MainService.user.updateProfile(query).then(function(data) {
            console.log(data);
        })
        $location.path("/tab/a5-4-1");
    }
}])
