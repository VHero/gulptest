kimama.controller('A5_1_0Ctrl', ['$scope','$ionicHistory','$stateParams','MainService', function($scope,$ionicHistory,$stateParams,MainService){
	$scope.goBack=function(){
        $ionicHistory.goBack(-1);
    }
    var query={
    	id:""
    }
    $scope.detail={
        content:""
    }
     var query={id:$stateParams.id};
    MainService.content.detail(query).then(function(data){
        data.created_dt=MainService.tool.getYmdDate(data.created_dt);
        $scope.detail.content=data;
        console.log($scope.detail.content);
    })
}])