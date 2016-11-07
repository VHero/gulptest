/*kimama
    .controller('A4_1Ctrl', function($scope, $http, $stateParams, MainService) {
        MainService.login(MainService.getUnionid())

        .then(function() {
            MainService.getDetail($stateParams.id).then(function(data) {
                console.log(data);
                $scope.info = data;
            	
            })
        })
    })
*/
kimama.controller('A4_1Ctrl', ['$scope','$ionicHistory','MainService' ,'$stateParams' ,function($scope,$ionicHistory,MainService,$stateParams){

    $scope.share=function(){
        alert("分享的接口");
    }
    $scope.detail={
        goBack:goBack,
        content:""
    }
    MainService.content.detail({id:$stateParams.id}).then(function(data){
        $scope.detail.content=data;
        console.log(data);
        wx.ready(function() { //ready函数用于调用API，如果你的网页在加载后就需要自定义分享和回调功能，需要在此调用分享函数。//如果是微信游戏结束后，需要点击按钮触发得到分值后分享，这里就不需要调用API了，可以在按钮上绑定事件直接调用。因此，微信游戏由于大多需要用户先触发获取分值，此处请不要填写如下所示的分享API
            wx.onMenuShareTimeline({ //例如分享到朋友圈的API  
                title: $scope.detail.content.title, // 分享标题
                link: $scope.detail.content.share_link, // 分享链接
                imgUrl: '', // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    })
    function goBack(){
        $ionicHistory.goBack(-1);
    }
}])