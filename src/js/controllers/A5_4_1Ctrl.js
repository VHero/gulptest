kimama.controller('A5_4_1Ctrl', ['$scope','MainService','$location','$ionicHistory',function($scope,MainService,$location,$ionicHistory){
		$scope.goBack = function() {
        $ionicHistory.goBack(-1);
    }
		$scope.edit=function(){
			$location.path('/tab/a5-4');
		}
		$scope.info={
			delivery_name:"",
			delivery_phonenum:"",
			delivery_address:"",
			isEdit:false
		}

		MainService.user.info().then(function(data){
			$scope.info.delivery_name=data.delivery_name;
			$scope.info.delivery_phonenum=data.delivery_phonenum;
			$scope.info.delivery_address=data.delivery_address;
			if(isNull(data.delivery_name)||isNull(data.delivery_phonenum)||isNull(data.delivery_address)){
				isEdit=true;
			}
		})
		function isNull(str){
			var isnull=false;
			if(str==null||str==""){
				isnull=true;
			}
			return isnull;
		}
}])