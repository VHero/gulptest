kimama
    .controller('C3Ctrl', function($scope, $location, $http, MainService) {
    	var joinQuery={
    		eventid:"",
    		partis:""
    	};
    	var getEventQuery={
    		id:"",
    		joined_count:""
    	}
    	var partis=1;
    	localStorage.setItem('participants',partis);
        /*MainService.login("oVNnev1_m5OQXjsV_IpyhFqRBDL0")
            .then(function(data) {
                MainService.event.recent()
                    .then(function(res) {
                        console.log(res.data.data);
                        $scope.activity = res.data.data;
                        getEventQuery.id=res.data.data.id;
                        getEventQuery.joined_count=res.data.data.joined_count;
                    });
                MainService.Get_userinfo()
                    .then(function(res) {
                        console.log(res.data.data);
                        $scope.user = res.data.data;
                    });
            }) */
                MainService.event.recent()
                    .then(function(res) {
                        console.log(res);
                        $scope.activity = res.data.data;
                        getEventQuery.id=res.data.data.id;
                        getEventQuery.joined_count=res.data.data.joined_count;
                    });
                    $scope.user=MainService.tool.getUserInfo();
                MainService.Get_userinfo()
                    .then(function(res) {
                        console.log(res.data.data);
                        $scope.user = res.data.data;
                    });
            
        //$scope.babys=[1,2,3,4,5];
        $scope.theNull = false;
        $scope.TosignUp = TosignUp;
        $scope.enter=enter;
        function TosignUp() {
            $location.path('/tab/c3-1');
        }
        // 获取参加人数
        function getPartis(){
        // 如果进入上传资料，则根据上传资料的页面，得到参加人数，否则使用自己+宝宝的数目
        	if(parseInt(localStorage.getItem('participants'))==partis){
        		partis=1+$scope.user.babies.length;
        	}else{
        		partis=localStorage.getItem('participants');
        	}
        	return partis;
        	
        }
        function enter(){
        	joinQuery.eventid=getEventQuery.id;
        	
        	joinQuery.partis=getPartis();
        	console.log(joinQuery);
        	MainService.event.join(joinQuery).then(function(data){
				console.log(data);
        	},function(data){
        		console.log(data);
        	})
        }
    });
