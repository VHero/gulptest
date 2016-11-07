kimama.directive('taba', function() {
        return {
            restrict: 'AE',
            template: '<div class="tabs-a" >' +
                '<ion-tabs class=" tabs-striped" >' +
                '<ion-tab title="咭妈妈" href="#/tab/a1">' +
                '</ion-tab>' +
                '<ion-tab title="咭星坞"  href="#/tab/a2">' +
                '</ion-tab>' +
                '<ion-tab title="咭赏会"  href="#/tab/a3">' +
                '</ion-tab>' +
                '<ion-tab title="最新情报"  href="#/tab/a4">' +
                '</ion-tab>' +
                '<ion-tab title="个人中心"  href="#/tab/a5">' +
                '</ion-tab>' +
                '</ion-tabs>' +
                '</div>',
            replace: true,
            transclude: true
        }

    })
    .directive('tabb', function() {
        return {
            restrict: 'AE',
            template: '<div class="tabs-b" >' +
                '<ion-tabs class="tabs-striped" >' +
                '<ion-tab title="明星专区" href="#/tab/b1">' +
                '</ion-tab>' +
                '<ion-tab title="专家指导"  href="#/tab/b2">' +
                '</ion-tab>' +
                '<ion-tab title="育儿心得"  href="#/tab/b3">' +
                '</ion-tab>' +
                '<ion-tab title="亲子游"  href="#/tab/b4">' +
                '</ion-tab>' +
                '<ion-tab title="妈妈想知道"  href="#/tab/b5">' +
                '</ion-tab>' +
                '</ion-tabs>' +

                '</div>',
            replace: true,
            transclude: true
        }

    })
    .directive('tabc', function() {
        return {
            restrict: 'AE',
            template: '<div class="tabs-c" >' +
                '<ion-tabs class="tabs-striped" >' +
                '<ion-tab title="抽奖活动" href="#/tab/c1_ng">' +
                '</ion-tab>' +
                '<ion-tab title="我的奖赏"  href="#/tab/c2">' +
                '</ion-tab>' +
                '<ion-tab title="推广活动"  href="#/tab/c3">' +
                '</ion-tab>' +
                '</ion-tabs>' +
                '</div>',
            replace: true,
            transclude: true
        }

    })
    .directive('tabarticle', function() {
        return {
            restrict: 'AE',
            template: '<div class="tabs-article" >' +
                '<ion-tabs class="tabs-striped" >' +
                '<ion-tab title="全部" href="#/tab/a5-1">' +
                '</ion-tab>' +
                '<ion-tab title="育儿心得"  href="#/tab/a5-1-1">' +
                '</ion-tab>' +
                '<ion-tab title="亲子游"  href="#/tab/a5-1-2">' +
                '</ion-tab>' +
                '<ion-tab title="妈妈想知道"  href="#/tab/a5-1-3">' +
                '</ion-tab>' +
                '</ion-tabs>' +
                '</div>',
            replace: true,
            transclude: true
        }

    })
    .directive('tabinfo', function() {
        return {
            restrict: 'AE',
            template: '<div class="tabs-info" >' +
                '<ion-tabs class="tabs-striped" >' +
                '<ion-tab title="爸爸妈妈" href="#/tab/a5-3">' +
                '</ion-tab>' +
                '<ion-tab title="宝宝"  href="#/tab/a5-3-1">' +
                '</ion-tab>' +
                '<a class="ion-plus-circled" ng-show="{{addbaby}}" href="#/tab/a5-3-2">' + '</a>' +
                '</ion-tabs>' +
                '</div>',
            replace: true,
            transclude: true
        }

    })
    .directive('tabadd', function() {
        return {
            restrict: 'AE',
            template: '<div class="tab-add" >' +
                '<ion-tabs class="tabs-striped" >' +
                '<ion-tab title="添加宝宝信息" href="#/tab/a5-3-2">' +
                '</ion-tab>' +
                '</ion-tabs>' +
                '</div>',
            replace: true,
            transclude: true
        }

    })
    .directive('tabpublish', function() {
        return {
            restrict: 'AE',
            template: '<div class="tabs-publish" >' +
                '<ion-tabs class="tabs-striped" >' +
                '<ion-tab title="育儿心得" href="#/tab/a6">' +
                '</ion-tab>' +
                '<ion-tab title="亲子游"  href="#/tab/a6-1">' +
                '</ion-tab>' +
                '<ion-tab title="妈妈想知道"  href="#/tab/a6-2">' +
                '</ion-tab>' +
                '</ion-tabs>' +
                '</div>',
            replace: true,
            transclude: true
        }

    })
    .directive('tabbpublish', function() {
        return {
            restrict: 'AE',
            template: '<div class="tabs-publish" >' +
                '<ion-tabs class="tabs-striped" >' +
                '<ion-tab title="育儿心得" href="#/tab/b6">' +
                '</ion-tab>' +
                '<ion-tab title="亲子游"  href="#/tab/b6-1">' +
                '</ion-tab>' +
                '<ion-tab title="妈妈想知道"  href="#/tab/b6-2">' +
                '</ion-tab>' +
                '</ion-tabs>' +
                '</div>',
            replace: true,
            transclude: true
        }

    })
    .directive('tabaward',function(){
        return {
            restrict: 'AE',
            template: '<div class="tabs-award" >' +
                '<ion-tabs class="tabs-striped" >' +
                '<ion-tab title="进行中" href="#/tab/c2">' +
                '</ion-tab>' +
                '<ion-tab title="已失效"  href="#/tab/c2-1">' +
                '</ion-tab>' +
                '<ion-tab title="已完成"  href="#/tab/c2-2">' +
                '</ion-tab>' +
                '</ion-tabs>' +
                '<div class="triangular">'+
                '</div>'+
                '</div>',
            replace: true,
            transclude: true
        }
    })
    .directive('zan',['$http','$stateParams','appConfig',function($http,$stateParams,appConfig){
        return{
            restrict:'AE',
            template:'<div ng-click="zan()" ng-class="{zan:detail.content.isMeLiked,zan2:!detail.content.isMeLiked}" ng-transclude>' +
                '</div>',
            controller:function($scope){
                $scope.zan=function(){
                    if (!$scope.detail.content.isMeLiked) {
                        $scope.detail.content.like_count++;
                        $scope.detail.content.isMeLiked = true;
                    } else {
                        $scope.detail.content.like_count--;
                        $scope.detail.content.isMeLiked = false;
                    }
                    $http({
                        method: 'POST',
                        url: 'http://test.kisenwo.com:1337/Rest/Content/Like',
                        data: { postid: $stateParams.id },
                        withCredentials: true
                    }).then(function(data) {

                    })
                }
            },
            replace:true,
            transclude: true
        }
    }])

    