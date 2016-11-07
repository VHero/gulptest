kimama.controller('B6_2Ctrl', ['$scope', '$ionicHistory','MainService','$location',function($scope, $ionicHistory,MainService,$location) {

    var ageGroup = ['ANSWER_ZERO_TWO', 'ANSWER_THREE_FOUR', 'ANSWER_FIVE_SIX', 'ANSWER_SEVEN_EIGHT'];
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
        console.log(query);
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
