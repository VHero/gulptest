kimama.controller('B6Ctrl', ['$scope', '$ionicHistory','MainService','$location',function($scope, $ionicHistory,MainService,$location) {

    var ageGroup = ['TIPS_ZERO_TWO', 'TIPS_THREE_FOUR', 'TIPS_FIVE_SIX', 'TIPS_SEVEN_EIGHT'];
    var query = {
        title: "",
        desc: "",
        on_cat: ageGroup[0]
    }
    $scope.htmlContent = {
        title:"",
        content: ""
    };
    $scope.goBack = goBack;
    $scope.choice = [true, false, false, false];
    $scope.publish = publish;
    $scope.change = function change(index) {
        clickChoice(index);
    };

    function clickChoice(index) {
        for (var i = 0; i < $scope.choice.length; i++) {
            $scope.choice[i] = false;
        }
        $scope.choice[index] = true;
        query.on_cat = ageGroup[index];
    }

    function publish() {
        query.title=$scope.htmlContent.title;
        query.desc=$scope.htmlContent.content;
        if ($scope.htmlContent.title != undefined && $scope.htmlContent.title != "") {
            MainService.user.createArticle(query).then(function(data) {
                console.log(data);
                $location.path('/tab/a5-1');
            })
        } else {
            alert("标题不能为空");
        }
        
    }

    function goBack() {
        $ionicHistory.goBack(-1);
    }

}])
