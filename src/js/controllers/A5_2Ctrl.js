kimama.controller('A5_2Ctrl', ['$scope','$ionicHistory','MainService', function($scope,$ionicHistory,MainService){
	$scope.goBack=function(){
        $ionicHistory.goBack(-1);
    }
    $scope.info=[];
    MainService.user.invitedList().then(function(data){
    	console.log(data);
    	$scope.info=data;
    })
}])