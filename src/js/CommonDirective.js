kimama
    .directive('zan',function($http,$stateParams,appConfig){
    return {
        restrict:'AE',
        template:'<div ng-class="{cool:!info.isMeLiked,cool2:info.isMeLiked}" ng-click="zan()" ng-transclude >'+
        '</div>',
        controller:function($scope){
            $scope.zan=function(){

                if(!$scope.info.isMeLiked){

                    $scope.info.like_count++;
                    $scope.info.isMeLiked=true;

                }else{
                    //$scope.info.likecount=parseInt($scope.info.likecount)--;
                    $scope.info.like_count--;
                    $scope.info.isMeLiked=false;
                }
                $http({
                    method:'POST',
                    url:appConfig.url+'Content/Like',
                    data:{postid:$stateParams.id},
                    withCredentials: true
                }).then(function(data){

                })
            };
        },
        replace:true,
        transclude: true
    }
})
    .directive('loading',function(){
        return {
            restrict:'AE',
            templateUrl:'./templates/loading.html',
            replace:true
        }
    })
