/*
kimama
    .controller('A3_1Ctrl', function($scope,$http,$stateParams,MainService) {
        MainService.login(MainService.getUnionid())
            .then(function() {
                MainService.getDetail($stateParams.id).then(function(data) {
                    console.log(data);
                    $scope.info = data;
                })
            })

    })

*/
kimama.controller('A3_1Ctrl', ['$scope','$ionicHistory', function($scope,$ionicHistory){
	$scope.goBack=function(){
		$ionicHistory.goBack(-1);
	}
	$scope.share=function(){
		alert("分享的接口");
	}
}])