// /**
//  * Created by lanmao on 16/6/2.
//  */

// /**
//  * Created by lanmao on 16/6/2.
//  */

// kimama
//     .controller('B1Ctrl', function($rootScope, $scope, $http, MainService, appConfig) {
//         $scope.url = 'PARENTING_TIPS';
//         $scope.age = $rootScope.initAge;
//         // $scope.busy = false;
//         MainService.login(MainService.getUnionid())
//         $scope.nodata = true;
//         $scope['contentList1'] = [];
//         $scope['contentList2'] = [];
//         $scope['contentList3'] = [];
//         $scope['contentList4'] = [];
//         $scope.parentingTip = MainService.test();
//         //初始化
//         $scope.init = function() {
//             for (var i = 1; i < 5; i++) {
//                 $scope['switch' + i] = true;
//             }
//         }
//         $scope.init();
//         $scope.switch1 = false;
//         // 切换年龄段栏目
//         $scope.clickage = function(num) {
//             $scope.init();
//             $scope['switch' + num] = false;
//             $scope.age = num;
//             $rootScope.initAge = num;
//             $scope.nodata = true;
//         }

//         $scope.clickage($rootScope.initAge);

//         // infinite触发的函数
//         $scope.pagePublic = function(num) {
//                 if ($scope.parentingTip.GetContentList(num)) {
//                     $scope['contentList' + num] = $scope.parentingTip.GetContentList(num);
//                     if (document.body.scrollHeight - document.body.scrollTop <= window.screen.height && document.body.scrollHeight - window.screen.height != 0) {
//                         $scope.requestData(num);
//                     }
//                 } else {


//                     if($scope.parentingTip.NameArry.length!=0){
//                         $scope.requestData(num);
//                         return;
//                     }
//                     parent_tips($scope.url, num);
//                 }
//             }
//             // 请求的数据大于后台数据时停止请求
//         $scope.requestData = function(num) {
//                 //第一次请求数据
//                 if ($scope.parentingTip.GetContentList(num).length == 0) {
//                     getAgeRange($scope.parentingTip.GetNameArry()[num - 1].name, num);
//                 } else if ($scope.parentingTip.GetContentList(num).length < $scope.parentingTip.GetTotalLength(num)) {

//                     getAgeRange($scope.parentingTip.GetNameArry()[num - 1].name, num);
//                 } else {
//                     $scope.nodata = false;
//                 }

//             }
//             //获取年龄段栏目
//         function parent_tips(url, num) {
//             MainService.getAgeGroup(url)
//                 .then(function(res) {
//                     console.log(res);
//                     $scope.parentingTip.SetNameArry(res);
//                     getAgeRange($scope.parentingTip.GetNameArry()[num - 1].name, num);
//                 })
//         }
//         // 获取列表项数据
//         function getAgeRange(ageRange, num) {
//             // isLoading加载的标志,并且防止一次加载多条数据
//             if ($rootScope.isLoading === true) {
//                 return;
//             }
//             $rootScope.isLoading = true;

//             MainService.getList(ageRange, $scope.parentingTip.GetPage(num), 10)
//                 .then(function(res) {
//                     console.log(res);
//                     $rootScope.isLoading = false;
//                     //第一次请求GetTotalLength值为0
//                     if ($scope.parentingTip.GetTotalLength(num) == 0) {
//                         //存储列表的总条数
//                         $scope.parentingTip.SetTotalLength(res.totalCount, num);
//                     }
//                     if (res.lists.length != 0) {
//                         if ($scope['contentList' + num].length == 0) {
//                             $scope['contentList' + num] = res.lists;
//                         } else {
//                             $scope['contentList' + num].push.apply($scope['contentList' + num], res.lists);
//                         }
//                         $scope.parentingTip.SetContentList(num, $scope['contentList' + num]);

//                         $scope.num = $scope.parentingTip.GetPage(num) + 1;
//                         $scope.parentingTip.SetPage($scope.num, num);

//                     } else {
//                         $scope['switch' + num] = true;
//                         $scope.nodata = false;
//                         console.log('无数据');
//                     }
//                 })

//         }
//     })
//kimama.controller('B1Ctrl', ['$scope', 'freePopup',function($scope,freePopup){
//
//
//
//}])
kimama.controller('B1Ctrl', ['$scope','MainService', function($scope,MainService){
        $scope.info={
            catName:"STARS",
            lists:[],
            desc:"",
            page:1,
            limit:10,
            loadMore:null,
            domore:false
        };
        var query={
            catName:$scope.info.catName,
            limit:$scope.info.limit,
            page:$scope.info.page
          };
          $scope.info.loadMore = function() {
            MainService.content.lists({
            catName:$scope.info.catName,
            limit:$scope.info.limit,
            page:$scope.info.page
          })
        .then(function(data){
            if (data.lists.length < 1) {
                $scope.info.domore = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            }
            for (index in data.lists){
                data.lists[index].desc=MainService.tool.toWrapStr(data.lists[index].desc,40);
                data.lists[index].created_dt=MainService.tool.timeStr(data.lists[index].created_dt);
            }
            $scope.info.lists.push.apply($scope.info.lists, data.lists);
            $scope.info.page++;
            console.log($scope.info.lists);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
  };
}])
