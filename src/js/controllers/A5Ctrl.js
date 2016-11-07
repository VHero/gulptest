kimama.controller('A5Ctrl', ['$scope','MainService', function($scope,MainService){
	$scope.info=MainService.tool.getUserInfo('userinfo');
	console.log($scope.info);
}])