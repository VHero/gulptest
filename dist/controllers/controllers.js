
kimama
    .controller('A1Ctrl', function() {
    })


kimama
    .controller('A2Ctrl', function() {
    })
/*kimama
    .controller('A3Ctrl', function($rootScope, $scope, $http, MainService) {
        $scope.url = 'NEWSFEED';
        $scope.share = MainService.onePageNew();
        $scope.pagePublic = function() {
            if ($scope.share.getDataArray().length == 0) {
                MainService.login(MainService.getUnionid())
                    .then(function(res) {
                        getData();
                    })
            } else {
                if ($scope.share.getDataArray().length < $scope.share.getTotalLength()) {
                    getData();
                } else {
                    $scope.A3 = $scope.share.getDataArray();
                }
            }


        }

        function getData() {
            if ($rootScope.isLoading === true) {
                return;
            }
            $rootScope.isLoading = true;
            MainService.getList($scope.url, 1, 10)
                .then(function(res) {
                    $rootScope.isLoading = false;
                    console.log(res);
                    if ($scope.share.getTotalLength == 0) {
                        $scope.share.setTotalLength(res.totalCount);
                        $scope.share.setDataArray(res.lists);
                        $scope.A3 = res.lists;
                    }
                    if (res.lists.length != 0) {
                        if ($scope.share.getDataArray().length == 0) {
                            $scope.share.setDataArray(res.lists);
                            $scope.A3 = $scope.share.getDataArray();
                        } else {
                            $scope.share.setDataArray(res.lists);
                            $scope.share.DataArray.push.apply($scope.share.DataArray, res.lists);
                        }
                    }

                })
        }

    })
*/
kimama.controller('A3Ctrl', ['$scope', function($scope){
    
}])
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

kimama.controller('A4Ctrl', ['$scope','MainService', function($scope,MainService){


        $scope.info={
            catName:"NEWSFEED",
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
          // 加载
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
kimama.controller('A5Ctrl', ['$scope','MainService', function($scope,MainService){
	$scope.info=MainService.tool.getUserInfo('userinfo');
	console.log($scope.info);
}])
kimama.controller('A5_1Ctrl', ['$scope', '$ionicHistory', 'MainService', function($scope, $ionicHistory, MainService) {
    $scope.goBack = function() {
        $ionicHistory.goBack(-1);
    }
    $scope.info = {
        lists: [],
        desc: "",
    };
    var query = {
        catName: $scope.info.catName,
        limit: $scope.info.limit,
        page: $scope.info.page
    };

    MainService.content.getUserArticle()
        .then(function(data) {
            console.log(data);
            for (index in data) {
                data[index].desc = MainService.tool.toWrapStr(data[index].desc, 40);
                data[index].created_dt = MainService.tool.getFullDate(data[index].created_dt);
            }
            $scope.info.lists = data;
            console.log($scope.info.lists);
        })

}])

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
kimama.controller('A5_1_1Ctrl', ['$scope', '$ionicHistory', 'MainService', '$http', function($scope, $ionicHistory, MainService, $http) {
    $scope.goBack = function() {
            $ionicHistory.goBack(-1);
        }
        var carArray = ["TIPS_ZERO_TWO", "TIPS_THREE_FOUR", "TIPS_FIVE_SIX", "TIPS_SEVEN_EIGHT"];
    $scope.info = {
        lists: [],
        desc: "",
    };

    getUserArticle({on_cat:carArray[0]});
    getUserArticle({on_cat:carArray[1]});
    getUserArticle({on_cat:carArray[2]});
    getUserArticle({on_cat:carArray[3]});
    function getUserArticle(query) {
        MainService.content.getUserArticle(query)
            .then(function(data) {
                console.log(data);
                for (index in data) {
                    data[index].desc = MainService.tool.toWrapStr(data[index].desc, 40);
                    data[index].created_dt = MainService.tool.getFullDate(data[index].created_dt);
                    $scope.info.lists.push(data[index]);
                }
            })
    }
}])

kimama.controller('A5_1_2Ctrl', ['$scope', '$ionicHistory', 'MainService', function($scope, $ionicHistory, MainService) {
    $scope.goBack = function() {
        $ionicHistory.goBack(-1);
    }
    var carArray = ["TRAVEL_ZERO_TWO", "TRAVEL_THREE_FOUR", "TRAVEL_FIVE_SIX", "TRAVEL_SEVEN_EIGHT"];
    $scope.info = {
        lists: [],
        desc: "",
    };

    getUserArticle({ on_cat: carArray[0] });
    getUserArticle({ on_cat: carArray[1] });
    getUserArticle({ on_cat: carArray[2] });
    getUserArticle({ on_cat: carArray[3] });

    function getUserArticle(query) {
        MainService.content.getUserArticle(query)
            .then(function(data) {
                console.log(data);
                for (index in data) {
                    data[index].desc = MainService.tool.toWrapStr(data[index].desc, 40);
                    data[index].created_dt = MainService.tool.getFullDate(data[index].created_dt);
                    $scope.info.lists.push(data[index]);
                }
            })
    }
}])

kimama.controller('A5_1_3Ctrl', ['$scope', '$ionicHistory', 'MainService', function($scope, $ionicHistory, MainService) {
    $scope.goBack = function() {
        $ionicHistory.goBack(-1);
    }
    var carArray = ["ANSWER_ZERO_TWO", "ANSWER_THREE_FOUR", "ANSWER_FIVE_SIX", "ANSWER_SEVEN_EIGHT"];
    $scope.info = {
        lists: [],
        desc: "",
    };

    getUserArticle({ on_cat: carArray[0] });
    getUserArticle({ on_cat: carArray[1] });
    getUserArticle({ on_cat: carArray[2] });
    getUserArticle({ on_cat: carArray[3] });

    function getUserArticle(query) {
        MainService.content.getUserArticle(query)
            .then(function(data) {
                console.log(data);
                for (index in data) {
                    data[index].desc = MainService.tool.toWrapStr(data[index].desc, 40);
                    data[index].created_dt = MainService.tool.getFullDate(data[index].created_dt);
                    $scope.info.lists.push(data[index]);
                }
            })
    }
}])

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
kimama.controller('A5_3Ctrl', ['$scope', '$ionicHistory', '$ionicActionSheet', '$timeout', 'ionicDatePicker', 'FileUploader','MainService','$location', function($scope, $ionicHistory, $ionicActionSheet, $timeout, ionicDatePicker, FileUploader,MainService,$location) {
    $scope.goBack = function() {
        $ionicHistory.goBack(-1);
    }
    $scope.info = {
        nickname: "",
        birthday: "",
        gender: "",
        headimg: "",
        delivery_address: "",
        profession: "",
        education: ""
    }
    MainService.user.info().then(function(data){
        $scope.info.nickname=data.nickname;
        $scope.info.birthday=MainService.tool.getYmdDate(data.birthday);
        $scope.info.gender=data.gender;
        console.log($scope.info.gender);
        $scope.info.delivery_address=data.delivery_address;
        $scope.info.profession=data.profession;
        $scope.info.education=data.education;
        console.log(data);

    })

    var query = {
        nickname: "",
        birthday: "",
        gender: "",
        headimg: "",
        delivery_address: "",
        profession: "",
        education: ""
    };
    $scope.addbaby = false;
    $scope.submit = function() {
        query.nickname = $scope.info.nickname;
        query.delivery_address=$scope.info.delivery_address;
        query.profession=$scope.info.profession;
        query.education=$scope.info.education;
        query.gender=$scope.info.gender;
        query.birthday=$scope.info.birthday;
        console.log(query.birthday);
        MainService.user.updateProfile(query).then(function(data) {
        	console.log(data);
            MainService.tool.setUserInfo(data);
        })
    }


    // 选择性别 
    $scope.click_sex = click_sex;
    //出生日期  第三方控件
    $scope.click_date = click_date;
    function click_sex() {
        $ionicActionSheet.show({
            buttons: [
                { text: "<img src='img/boys.png' /> " },
                { text: "<img src='img/default.png' /> " },
                { text: "<img src='img/grils.png' /> " },
            ],
            //destructiveText: 'Delete',
            titleText: '性别选择<i>x</i>',
            cancelText: '取消',
            cancel: function() {
                console.log("取消");
            },
            buttonClicked: function(index) {
                console.log(index);
                switch (index) {
                    case 0:
                        console.log("男");
                        $scope.info.gender = '男';
                        break;
                    case 1:
                        console.log("保密");
                        $scope.info.gender = '保密';
                        break;
                    case 2:
                        console.log("女");
                        $scope.info.gender = '女';
                        break;
                    default:
                        // this.cancel();
                        break;
                }
                return true;
            },
            cssClass: 'freePopup'
        });
    }

    function click_date() {
        ionicDatePicker.openDatePicker(ipObj1);
    }
  
    var ipObj1 = {
        callback: function(val) { //Mandatory
           	$scope.info.birthday=MainService.tool.getYmdDate(val);
        },
        disabledDates: "", //Optional,
        from: new Date(2008, 1, 1), //Optional
        to: new Date(2016, 10, 30), //Optional
        inputDate: new Date(), //Optional
        mondayFirst: false, //Optional
        disableWeekdays: [], //Optional
        closeOnSelect: false, //Optional
        templateType: 'popup', //Optional
    };

}])

kimama.controller('A5_3_1Ctrl', ['$scope', '$ionicHistory', '$ionicActionSheet', 'ionicDatePicker', 'FileUploader', 'MainService', function($scope, $ionicHistory, $ionicActionSheet, ionicDatePicker, FileUploader, MainService) {
    $scope.goBack = function() {
        $ionicHistory.goBack(-1);
    }

    $scope.addbaby = true; // 控制显示添加宝宝的按钮
    $scope.babyinfo = {
            lists: [],
        }
        // 传递给后台的参数
    var query = {
        babies: [],
        delivery_phonenum:"",
        delivery_address:""
    };

    getUserInfo();
    $scope.submit = submit;

    $scope.click_sex = click_sex;

    $scope.click_date = click_date;

    // 选择性别 
    function click_sex(aIndex) {
        $ionicActionSheet.show({
            buttons: [
                { text: "<img src='img/boys.png' /> " },
                { text: "<img src='img/default.png' /> " },
                { text: "<img src='img/grils.png' /> " },
            ],
            //destructiveText: 'Delete',
            titleText: '性别选择<i>x</i>',
            cancelText: '取消',
            cancel: function() {
                console.log("取消");
            },
            buttonClicked: function(index) {
                console.log(index);
                switch (index) {
                    case 0:
                        console.log("男");
                        $scope.babyinfo.lists[aIndex].gender = "男";
                        break;
                    case 1:
                        console.log("保密");
                        $scope.babyinfo.lists[aIndex].gender = "男";
                        break;
                    case 2:
                        console.log("女");
                        $scope.babyinfo.lists[aIndex].gender = "女";
                        break;
                    default:
                        // this.cancel();
                        break;
                }
                return true;
            },
            cssClass: 'freePopup'
        });
    }

    //出生日期  第三方控件
    function click_date(aIndex) {
        ionicDatePicker.openDatePicker(ipObj1);
        localStorage.setItem('birthdayIndex', aIndex);
    }

    var ipObj1 = {
        callback: function(val) { //Mandatory
            var aIndex = parseInt(localStorage.getItem('birthdayIndex'));
            $scope.babyinfo.lists[aIndex].birthday = MainService.tool.getYmdDate(val);
        },
        disabledDates: "", //Optional,
        from: new Date(2008, 1, 1), //Optional
        to: new Date(2016, 10, 30), //Optional
        inputDate: new Date(), //Optional
        mondayFirst: false, //Optional
        disableWeekdays: [], //Optional
        closeOnSelect: false, //Optional
        templateType: 'popup', //Optional
    };
    // 提交按钮的函数
    function submit() {
        console.log($scope.babyinfo.lists);
        query.babies = $scope.babyinfo.lists;
        MainService.user.updateProfile(query).then(function(data){
            console.log(data);
            MainService.tool.setUserInfo(data);
        })
        console.log(query);
    }

    function getUserInfo() {
        // 获取用户信息，并且将后台数据处理
        MainService.user.info().then(function(data) {
            // 数据处理
            for (index in data.babies) {
                data.babies[index].birthday = MainService.tool.getYmdDate(data.babies[index].birthday);
                data.babies[index].gender = MainService.tool.getGender(data.babies[index].gender);
            }
            $scope.babyinfo.lists = data.babies;
            console.log()
            
        })
    }
}])

kimama.controller('A5_3_2Ctrl', ['$scope', '$ionicHistory', '$ionicActionSheet', '$timeout', 'ionicDatePicker', 'FileUploader', 'MainService', function($scope, $ionicHistory, $ionicActionSheet, $timeout, ionicDatePicker, FileUploader, MainService) {
    $scope.goBack = function() {
        $ionicHistory.goBack(-1);
    }
    $scope.info = {
        nickname: "",
        birthday: "",
        gender: "",
        headimg: "",
        relationship: ""
    }
    var baby={
            //如果不传送ID，就会为用户新增一个宝宝
            babyname:"",
            birthday:"",
            gender:"",
            headimg:null,
            relationship: {
                "id":38,
                "etype":"RELATION_BABY",
                "name":"BABY_FATHER",
                "display_name":"宝宝的爸"
            }
        };
    var query = {
        babies:[]
    }
    $scope.submit = submit;

    function submit() {
        baby.babyname = $scope.info.nickname;
        baby.birthday = $scope.info.birthday;
        baby.gender = $scope.info.gender;
        query.babies.push(baby);
        console.log(query);
        MainService.user.updateProfile(query).then(function(data) {
            console.log(data);
            MainService.tool.setUserInfo(data);
        })
    }
    $scope.click_sex = click_sex;
    //出生日期  第三方控件
    $scope.click_date = click_date;

    function click_sex() {
        $ionicActionSheet.show({
            buttons: [
                { text: "<img src='img/boys.png' /> " },
                { text: "<img src='img/default.png' /> " },
                { text: "<img src='img/grils.png' /> " },
            ],
            //destructiveText: 'Delete',
            titleText: '性别选择<i>x</i>',
            cancelText: '取消',
            cancel: function() {
                console.log("取消");
            },
            buttonClicked: function(index) {
                console.log(index);
                // 宝宝的性别只能传递数字，所以将其$scope.info.gender=index
                switch (index) {
                    case 0:
                        console.log("男");
                        $scope.info.gender = index+1;
                        $scope.info.sex="男";
                        break;
                    case 1:
                        console.log("保密");
                        $scope.info.gender = index;
                        $scope.info.sex="保密";
                        break;
                    case 2:
                        console.log("女");
                        $scope.info.gender = index;
                        $scope.info.sex="女";
                        break;
                    default:
                        // this.cancel();
                        break;
                }
                return true;
            },
            cssClass: 'freePopup'
        });
    }

    function click_date() {
        ionicDatePicker.openDatePicker(ipObj1);
    }

    var ipObj1 = {
        callback: function(val) { //Mandatory
            $scope.info.birthday = MainService.tool.getYmdDate(val);
        },
        disabledDates: "", //Optional,
        from: new Date(2008, 1, 1), //Optional
        to: new Date(2016, 10, 30), //Optional
        inputDate: new Date(), //Optional
        mondayFirst: false, //Optional
        disableWeekdays: [], //Optional
        closeOnSelect: false, //Optional
        templateType: 'popup', //Optional
    };
}])

kimama.controller('A5_4Ctrl', ['$scope', '$ionicHistory', 'MainService', '$location', function($scope, $ionicHistory, MainService, $location) {
    $scope.goBack = function() {
        $ionicHistory.goBack(-1);
    }
    $scope.info = {
        delivery_address: "",
        delivery_name: "",
        delivery_phonenum: ""
    }
    $scope.submit = submit;
    var query = {
        delivery_address: "",
        delivery_name: "",
        delivery_phonenum: ""
    };

    function submit() {
        query.delivery_address = $scope.info.delivery_address;
        query.delivery_name = $scope.info.delivery_name;
        query.delivery_phonenum = $scope.info.delivery_phonenum;
        console.log(query);
        MainService.user.updateProfile(query).then(function(data) {
            console.log(data);
        })
        $location.path("/tab/a5-4-1");
    }
}])

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
kimama.controller('A6Ctrl', ['$scope', '$ionicHistory', 'MainService', '$location', function($scope, $ionicHistory, MainService, $location) {

    var ageGroup = ['TIPS_ZERO_TWO', 'TIPS_THREE_FOUR', 'TIPS_FIVE_SIX', 'TIPS_SEVEN_EIGHT'];
    var query = {
        title: "",
        desc: "",
        on_cat: ageGroup[0]
    }
    $scope.htmlContent = {
        title: "",
        content: ""
    };
    $scope.goBack = goBack;
    $scope.choice = [true, false, false, false];
    $scope.publish = publish;
    $scope.change = function change(index) {
        clickChoice(index);
    };

    function clickChoice(index) {
        for (var i = 0; i < $scope.choice.length; i++) {
            $scope.choice[i] = false;
        }
        $scope.choice[index] = true;
        query.on_cat = ageGroup[index];
    }

    function publish() {
        query.title = $scope.htmlContent.title;
        query.desc = $scope.htmlContent.content;
        if ($scope.htmlContent.title != undefined && $scope.htmlContent.title != "") {
            MainService.user.createArticle(query).then(function(data) {
                console.log(data);
                $location.path('/tab/a5-1');
            })
        } else {
            alert("标题不能为空");
        }

    }

    function goBack() {
        $ionicHistory.goBack(-1);
    }

}])

kimama.controller('A6_1Ctrl', ['$scope', '$ionicHistory','MainService','$location',function($scope, $ionicHistory,MainService,$location) {

    var ageGroup = ['TRAVEL_ZERO_TWO', 'TRAVEL_THREE_FOUR', 'TRAVEL_FIVE_SIX', 'TRAVEL_SEVEN_EIGHT'];
    var query = {
        title: "",
        desc: "",
        on_cat: ageGroup[0]
    }
    $scope.htmlContent = {
        title:"",
        content: ""
    };
    $scope.goBack = goBack;
    $scope.choice = [true, false, false, false];
    $scope.publish = publish;
    $scope.change = function change(index) {
        clickChoice(index);
    };

    function clickChoice(index) {
        for (var i = 0; i < $scope.choice.length; i++) {
            $scope.choice[i] = false;
        }
        $scope.choice[index] = true;
        query.on_cat = ageGroup[index];
        console.log(query);
    }

    function publish() {
        query.title=$scope.htmlContent.title;
        query.desc=$scope.htmlContent.content;
        if ($scope.htmlContent.title != undefined && $scope.htmlContent.title != "") {
            MainService.user.createArticle(query).then(function(data) {
                console.log(data);
                $location.path('/tab/a5-1');
            })
        } else {
            alert("标题不能为空");
        }

        
    }

    function goBack() {
        $ionicHistory.goBack(-1);
    }

}])

kimama.controller('A6_2Ctrl', ['$scope', '$ionicHistory','MainService','$location',function($scope, $ionicHistory,MainService,$location) {

    var ageGroup = ['ANSWER_ZERO_TWO', 'ANSWER_THREE_FOUR', 'ANSWER_FIVE_SIX', 'ANSWER_SEVEN_EIGHT'];
    var query = {
        title: "",
        desc: "",
        on_cat: ageGroup[0]
    }
    $scope.htmlContent = {
        title:"",
        content: ""
    };
    $scope.goBack = goBack;
    $scope.choice = [true, false, false, false];
    $scope.publish = publish;
    $scope.change = function change(index) {
        clickChoice(index);
    };

    function clickChoice(index) {
        for (var i = 0; i < $scope.choice.length; i++) {
            $scope.choice[i] = false;
        }
        $scope.choice[index] = true;
        query.on_cat = ageGroup[index];
        console.log(query);
    }

    function publish() {
        query.title=$scope.htmlContent.title;
        query.desc=$scope.htmlContent.content;
        if ($scope.htmlContent.title != undefined && $scope.htmlContent.title != "") {
            MainService.user.createArticle(query).then(function(data) {
                console.log(data);
                $location.path('/tab/a5-1');
            })
        } else {
            alert("标题不能为空");
        }
        
    }

    function goBack() {
        $ionicHistory.goBack(-1);
    }

}])

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

/**
 * Created by lanmao on 16/6/2.
 */

/*kimama
.controller('B1_1Ctrl', ['$scope','$http','$stateParams','MainService','$location','$rootScope', function($scope, $http, $stateParams, MainService) {
        MainService.login(MainService.getUnionid())
            .then(function() {
                MainService.getDetail($stateParams.id).then(function(data) {
                    console.log(data);
                    $scope.info = data;
                   
                })
            })
    }])*/
kimama.controller('B1_1Ctrl', ['$scope', '$ionicHistory','$stateParams','MainService', function($scope,$ionicHistory,$stateParams,MainService){
        $scope.goBack=function(){
        $ionicHistory.goBack(-1);
    }
       $scope.detail={
        content:""
    }
    var query={id:$stateParams.id};
    MainService.content.detail(query).then(function(data){
        data.created_dt=MainService.tool.getFullDate(data.created_dt);
        $scope.detail.content=data;
        console.log($scope.detail.content);
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
}])



kimama.controller('B2Ctrl', ['$scope','MainService' ,function($scope,MainService){


     $scope.info={
            catName:"EXPERT_GUIDANCE",
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
            console.log(data);
            if (data.lists.length < 1) {
                $scope.info.domore = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            }
            for (index in data.lists){
                data.lists[index].desc=MainService.tool.toWrapStr(data.lists[index].desc,40);
                data.lists[index].created_dt=MainService.tool.getFullDate(data.lists[index].created_dt);
            }
            
            $scope.info.lists.push.apply($scope.info.lists, data.lists);
            $scope.info.page++;
            
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
  };
}])
/*kimama
    .controller('B2_1Ctrl', function($scope, $http, $stateParams, MainService) {
        MainService.login(MainService.getUnionid())
            .then(function() {
                MainService.getDetail($stateParams.id).then(function(data) {
                    console.log(data);
                    $scope.info = data;
                })
            })

    })
*/
kimama.controller('B2_1Ctrl', ['$scope', '$ionicHistory','$stateParams','MainService', function($scope,$ionicHistory,$stateParams,MainService){
        $scope.goBack=function(){
        $ionicHistory.goBack(-1);
    }
    $scope.share=function(){
        alert("分享的接口");
    }
    $scope.detail={
        content:""
    }
    var query={id:$stateParams.id};
    MainService.content.detail(query).then(function(data){
        data.created_dt=MainService.tool.getYmdDate(data.created_dt);
        $scope.detail.content=data;
        console.log($scope.detail.content);
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
}])
kimama.controller('B3Ctrl', ['$scope', 'MainService', function($scope, MainService) {
    $scope.info = {
        catName: "PARENTING_TIPS",
        lists: [],
        desc: "",
        page: 1,
        limit: 10,
        loadMore: null,
        domore: false,
        title: "育儿心得"
    };
    var query = {
        catName: $scope.info.catName,
        limit: $scope.info.limit,
        page: $scope.info.page
    };
    $scope.info.loadMore = function() {
        MainService.content.lists({
                catName: $scope.info.catName,
                limit: $scope.info.limit,
                page: $scope.info.page
            })
            .then(function(data) {
                if (data.lists.length < 1) {
                    $scope.info.domore = true;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    return;
                }
                for (index in data.lists) {
                    data.lists[index].desc = MainService.tool.toWrapStr(data.lists[index].desc, 40);
                    data.lists[index].created_dt = MainService.tool.getFullDate(data.lists[index].created_dt);
                }
                $scope.info.lists.push.apply($scope.info.lists, data.lists);
                $scope.info.page++;
                console.log($scope.info.lists);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
    };

}])

kimama.controller('B3_1Ctrl', ['$scope', '$ionicHistory', '$stateParams', 'MainService', function($scope, $ionicHistory, $stateParams, MainService) {

    $scope.detail = {
        content: ""
    }
    var query = { id: $stateParams.id };
    MainService.content.detail(query).then(function(data) {
        data.created_dt = MainService.tool.getYmdDate(data.created_dt);
        $scope.detail.content = data;
        console.log($scope.detail.content);
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
    $scope.goBack = function() {
        $ionicHistory.goBack(-1);
    }
    $scope.share = function() {
        alert("分享的接口");

    }
}])


    kimama.controller('B4Ctrl', ['$scope','MainService', function($scope,MainService){
                $scope.info={
            catName:"FAMILY_TRAVEL",
            lists:[],
            desc:"",
            page:1,
            limit:10,
            loadMore:null,
            domore:false,
            title:"亲子游"
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
                data.lists[index].created_dt=MainService.tool.getFullDate(data.lists[index].created_dt);
            }
            $scope.info.lists.push.apply($scope.info.lists, data.lists);
            $scope.info.page++;
            console.log($scope.info.lists);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
  };
    }])

/*
kimama
    .controller('B4_1Ctrl', function($scope,$http,$stateParams,MainService) {

MainService.login(MainService.getUnionid())
            .then(function() {
                MainService.getDetail($stateParams.id).then(function(data) {
                    console.log(data);
                    $scope.info = data;
                })
            })
    })

*/
kimama.controller('B4_1Ctrl', ['$scope','$ionicHistory','$stateParams','MainService', function($scope,$ionicHistory,$stateParams,MainService){
	$scope.goBack=function(){
        $ionicHistory.goBack(-1);
    }
    $scope.share=function(){
        alert("分享的接口");
    }
    $scope.detail={
        content:""
    }
    var query={id:$stateParams.id};
    MainService.content.detail(query).then(function(data){
        data.created_dt=MainService.tool.getYmdDate(data.created_dt);
        $scope.detail.content=data;
        console.log($scope.detail.content);
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
}])

kimama.controller('B5Ctrl', ['$scope','MainService', function($scope,MainService){
            $scope.info={
            catName:"MOM_ANSWER",
            lists:[],
            desc:"",
            page:1,
            limit:10,
            loadMore:null,
            domore:false,
            title:"妈妈想知道"
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
                data.lists[index].created_dt=MainService.tool.getFullDate(data.lists[index].created_dt);
            }
            $scope.info.lists.push.apply($scope.info.lists, data.lists);
            $scope.info.page++;
            console.log($scope.info.lists);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
  };
}])

kimama.controller('B5_1Ctrl', ['$scope','$ionicHistory','$stateParams','MainService', function($scope,$ionicHistory,$stateParams,MainService){
    $scope.goBack=function(){
        $ionicHistory.goBack(-1);
    }
    $scope.share=function(){
        alert("分享的接口");
    }
    $scope.detail={
        content:""
    }
    var query={id:$stateParams.id};
    MainService.content.detail(query).then(function(data){
        data.created_dt=MainService.tool.getYmdDate(data.created_dt);
        $scope.detail.content=data;
        console.log($scope.detail.content);
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
}])
kimama.controller('B6Ctrl', ['$scope', '$ionicHistory','MainService','$location',function($scope, $ionicHistory,MainService,$location) {

    var ageGroup = ['TIPS_ZERO_TWO', 'TIPS_THREE_FOUR', 'TIPS_FIVE_SIX', 'TIPS_SEVEN_EIGHT'];
    var query = {
        title: "",
        desc: "",
        on_cat: ageGroup[0]
    }
    $scope.htmlContent = {
        title:"",
        content: ""
    };
    $scope.goBack = goBack;
    $scope.choice = [true, false, false, false];
    $scope.publish = publish;
    $scope.change = function change(index) {
        clickChoice(index);
    };

    function clickChoice(index) {
        for (var i = 0; i < $scope.choice.length; i++) {
            $scope.choice[i] = false;
        }
        $scope.choice[index] = true;
        query.on_cat = ageGroup[index];
    }

    function publish() {
        query.title=$scope.htmlContent.title;
        query.desc=$scope.htmlContent.content;
        if ($scope.htmlContent.title != undefined && $scope.htmlContent.title != "") {
            MainService.user.createArticle(query).then(function(data) {
                console.log(data);
                $location.path('/tab/a5-1');
            })
        } else {
            alert("标题不能为空");
        }
        
    }

    function goBack() {
        $ionicHistory.goBack(-1);
    }

}])

kimama.controller('B6_1Ctrl', ['$scope', '$ionicHistory','MainService','$location',function($scope, $ionicHistory,MainService,$location) {

    var ageGroup = ['TRAVEL_ZERO_TWO', 'TRAVEL_THREE_FOUR', 'TRAVEL_FIVE_SIX', 'TRAVEL_SEVEN_EIGHT'];
    var query = {
        title: "",
        desc: "",
        on_cat: ageGroup[0]
    }
    $scope.htmlContent = {
        title:"",
        content: ""
    };
    $scope.goBack = goBack;
    $scope.choice = [true, false, false, false];
    $scope.publish = publish;
    $scope.change = function change(index) {
        clickChoice(index);
    };

    function clickChoice(index) {
        for (var i = 0; i < $scope.choice.length; i++) {
            $scope.choice[i] = false;
        }
        $scope.choice[index] = true;
        query.on_cat = ageGroup[index];
        console.log(query);
    }

    function publish() {
        query.title=$scope.htmlContent.title;
        query.desc=$scope.htmlContent.content;
        if ($scope.htmlContent.title != undefined && $scope.htmlContent.title != "") {
            MainService.user.createArticle(query).then(function(data) {
                console.log(data);
                $location.path('/tab/a5-1');
            })
        } else {
            alert("标题不能为空");
        }
        
    }

    function goBack() {
        $ionicHistory.goBack(-1);
    }

}])

kimama.controller('B6_2Ctrl', ['$scope', '$ionicHistory','MainService','$location',function($scope, $ionicHistory,MainService,$location) {

    var ageGroup = ['ANSWER_ZERO_TWO', 'ANSWER_THREE_FOUR', 'ANSWER_FIVE_SIX', 'ANSWER_SEVEN_EIGHT'];
    var query = {
        title: "",
        desc: "",
        on_cat: ageGroup[0]
    }
    $scope.htmlContent = {
        title:"",
        content: ""
    };
    $scope.goBack = goBack;
    $scope.choice = [true, false, false, false];
    $scope.publish = publish;
    $scope.change = function change(index) {
        clickChoice(index);
    };

    function clickChoice(index) {
        for (var i = 0; i < $scope.choice.length; i++) {
            $scope.choice[i] = false;
        }
        $scope.choice[index] = true;
        query.on_cat = ageGroup[index];
        console.log(query);
    }

    function publish() {
        query.title=$scope.htmlContent.title;
        query.desc=$scope.htmlContent.content;
        if ($scope.htmlContent.title != undefined && $scope.htmlContent.title != "") {
            MainService.user.createArticle(query).then(function(data) {
                console.log(data);
                $location.path('/tab/a5-1');
            })
        } else {
            alert("标题不能为空");
        }
        
    }

    function goBack() {
        $ionicHistory.goBack(-1);
    }

}])


// kimama
//     .controller('C1Ctrl', function($scope, $http, MainService) {

//         var restaraunts = [{ name: "谢谢您的参与" }];
//         var turnplate = {
//             restaraunts: [], //大转盘奖品名称
//             colors: [], //大转盘奖品区块对应背景颜色
//             outsideRadius: 186, //大转盘外圆的半径
//             textRadius: 155, //大转盘奖品位置距离圆心的距离
//             insideRadius: 50, //大转盘内圆的半径
//             startAngle: 0, //开始角度
//             bRotate: false //false:停止;ture:旋转
//         };
//         MainService.login("oVNnev1_m5OQXjsV_IpyhFqRBDL0")
//             .then(function(data) {
//             })
//                 nums = ReList();
//         function ReList() {
//             MainService.getReList()
//                 .then(function(res) {
//                     console.log(res);
//                     var obj = {
//                         code: 0,
//                         created_dt: 0,
//                         id: 0,
//                         in_stock_count: 0,
//                         is_active: 0,
//                         name: "谢谢您的参与"
//                     }
//                     for (var ind = 0; ind < res.length; ind++) {
//                         //turnplate.restaraunts[ind]=res[ind].name;
//                         turnplate.restaraunts[2 * ind] = obj.name;
//                         turnplate.restaraunts[2 * ind + 1] = res[ind].name;
//                         restaraunts[2 * ind] = obj;
//                         restaraunts[2 * ind + 1] = res[ind];
//                     }
//                     console.log(restaraunts);
//                     drawRouletteWheel();
//                     winner_List();
//                 })
//         }

//         //动态添加大转盘的奖品与奖品区域背景颜色
//         //turnplate.restaraunts = ["谢谢参与", "咭星坞公仔", "谢谢参与", "咭星坞书包", "谢谢参与"];
//         turnplate.colors = ["#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32"];
//         var rotateTimeOut = function() {
//             $('#wheelcanvas').rotate({
//                 angle: 0,
//                 animateTo: 2160,
//                 duration: 8000,
//                 callback: function() {
//                     alert('网络超时，请检查您的网络设置！');
//                 }
//             });
//         };
//         //旋转转盘 item:奖品位置; txt：提示语;
//         var rotateFn = function(item, txt) {
//             //console.log(item)
//             //				console.log(txt)
//             var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));

//             if (angles < 270) {
//                 angles = 270 - angles;
//             } else {
//                 angles = 360 - angles + 270;
//             }
//             $('#wheelcanvas').stopRotate();
//             $('#wheelcanvas').rotate({
//                 angle: 0,
//                 animateTo: angles + 1800,
//                 duration: 8000,
//                 callback: function() {
//                     alert(txt);
//                     console.log(txt);
//                     turnplate.bRotate = !turnplate.bRotate;
//                 }
//             });
//         };
//         $('.pointer').click(function() {
//             /*
//              *
//              *  思路：
//              *
//              *
//              *  在点击时直接访问后台接口
//              *  等待后台数据返回时，再触发转动效果；
//              *  待实践：2016-07-01；
//              *  编写人：smallfalt401;
//              *
//              * */
//             if (turnplate.bRotate) return;
//             turnplate.bRotate = !turnplate.bRotate;

//             StartDraw();
//             //获取随机数(奖品个数范围内)
//             //var item = rnd();
//             //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
//             //rotateFn(item, turnplate.restaraunts[item - 1]);

//         });
//         function StartDraw() {
//             MainService.getStartDraw()
//                 .then(function(res) {
//                     console.log("code:随机抛出异常，以下为查看：")
//                     console.log(res);
//                     if (res.isDrawn == true) {
//                         alert("您已经参加过抽奖了")
//                         return rotateFn(1, restaraunts[1 - 1].name);
//                     }
//                     if (res.isWon == false) {
//                         console.log("有异常");
//                         return rotateFn(1, restaraunts[1 - 1].name);
//                     }
//                     //ide 为数组下标  rotateFn(ide+1, restaraunts[ide].name);  ide+1表示 在绘制中的实际位置 ，restaraunts[ide].name 表示在当前数组中的下标
//                     var ide = 0;
//                     for (ide; ide < restaraunts.length; ide++) { //匹配数组
//                         if (restaraunts[ide].code == res.isWon.on_reward_id.code) {
//                             console.log("pipei：" + (ide + 1));
//                             return rotateFn(ide + 1, restaraunts[ide].name);
//                         }
//                     }
//                     console.log(ide);
//                     console.log(restaraunts.length);
//                     if (ide == restaraunts.length) {
//                         console.log("未能匹配:1");
//                         return rotateFn(1, restaraunts[1 - 1].name); //如果未能匹配则表示未中奖；
//                     }
//                 })
//         }
//         //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
//         function drawRouletteWheel() {
//             var canvas = document.getElementById("wheelcanvas");
//             if (canvas.getContext) {
//                 //根据奖品个数计算圆周角度
//                 var arc = Math.PI / (turnplate.restaraunts.length / 2);
//                 var ctx = canvas.getContext("2d");
//                 //在给定矩形内清空一个矩形
//                 ctx.clearRect(0, 0, 422, 422);
//                 //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
//                 ctx.strokeStyle = "#FFBE04";
//                 //font 属性设置或返回画布上文本内容的当前字体属性
//                 ctx.font = '16px Microsoft YaHei';
//                 for (var i = 0; i < turnplate.restaraunts.length; i++) {
//                     var angle = turnplate.startAngle + i * arc;
//                     ctx.fillStyle = turnplate.colors[i];
//                     ctx.beginPath();
//                     //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
//                     ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
//                     ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
//                     ctx.stroke();
//                     ctx.fill();
//                     //锁画布(为了保存之前的画布状态)
//                     ctx.save();
//                     //----绘制奖品开始----
//                     ctx.fillStyle = "#E5302F";
//                     var text = turnplate.restaraunts[i];
//                     var line_height = 17;
//                     //translate方法重新映射画布上的 (0,0) 位置
//                     ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
//                     //rotate方法旋转当前的绘图
//                     ctx.rotate(angle + arc / 2 + Math.PI / 2);
//                     /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
//                     if (text.indexOf("M") > 0) { //流量包
//                         var texts = text.split("M");
//                         for (var j = 0; j < texts.length; j++) {
//                             ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
//                             if (j == 0) {
//                                 ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
//                             } else {
//                                 ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
//                             }
//                         }
//                     } else if (text.indexOf("M") == -1 && text.length > 8) { //奖品名称长度超过一定范围
//                         text = text.substring(0, 8) + "||" + text.substring(8);
//                         var texts = text.split("||");
//                         for (var j = 0; j < texts.length; j++) {
//                             ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
//                         }
//                     } else {
//                         //在画布上绘制填色的文本。文本的默认颜色是黑色
//                         //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
//                         ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
//                     }
//                     ctx.restore();
//                     //----绘制奖品结束----
//                 }
//             }
//         }
//         function winner_List() {

//             MainService.Get_Winner_List()
//                 .then(function(res) {
//                     console.log(res);

//                     $scope.winners = res.data.data;
//                     console.log(res.data.data);
//                     setInterval(startmarquee(34, 90, 0), 1000);
//                 })
//                 ///setInterval("startmarquee(34,90,0)",1000);
//         }

//         function startmarquee(lh, speed, delay) {
//             console.log(11111);
//             var t;
//             var o = document.getElementById("marquee");
//             console.log(document.getElementById("marquee"));

//             if (o.getElementsByTagName('li').length <= 5) {
//                 console.log("exit");
//                 clearInterval(startmarquee);
//             }
//             if (o.getElementsByTagName('li').length >= 6 && o.getElementsByTagName('li').length < 9) {
//                 console.log("copy");
//                 o.innerHTML += o.innerHTML + o.innerHTML;
//             }

//             o.scrollTop = 0;

//             function start() {
//                 t = setInterval(scrolling, speed);
//                 o.scrollTop += 2;
//             }

//             function scrolling() {
//                 if (o.scrollTop % lh != 0) {
//                     o.scrollTop += 2;
//                     if (o.scrollTop >= o.scrollHeight / 2) {
//                         o.scrollTop = 0;
//                     }
//                 } else {
//                     clearInterval(t);
//                     setTimeout(start, delay);
//                 }
//             }
//             setTimeout(start, delay);
//         }
//     });


kimama
    .controller('C1Ctrl', function($scope, $http, MainService) {

        var restaraunts = [{ name: "谢谢您的参与" }];
        var turnplate = {
            restaraunts: [], //大转盘奖品名称
            colors: [], //大转盘奖品区块对应背景颜色
            outsideRadius: 186, //大转盘外圆的半径
            textRadius: 155, //大转盘奖品位置距离圆心的距离
            insideRadius: 50, //大转盘内圆的半径
            startAngle: 0, //开始角度
            bRotate: false //false:停止;ture:旋转
        };
        /*MainService.login("oVNnev1_m5OQXjsV_IpyhFqRBDL0")
            .then(function(data) {
            })*/
                nums = ReList();
        function ReList() {
            MainService.rewards.list()
                .then(function(res) {
                    console.log(res);
                    var obj = {
                        code: 0,
                        created_dt: 0,
                        id: 0,
                        in_stock_count: 0,
                        is_active: 0,
                        name: "谢谢您的参与"
                    }
                    for (var ind = 0; ind < res.length; ind++) {
                        //turnplate.restaraunts[ind]=res[ind].name;
                        turnplate.restaraunts[2 * ind] = obj.name;
                        turnplate.restaraunts[2 * ind + 1] = res[ind].name;
                        restaraunts[2 * ind] = obj;
                        restaraunts[2 * ind + 1] = res[ind];
                    }
                    console.log(restaraunts);
                    drawRouletteWheel();
                    winner_List();
                })
        }

        //动态添加大转盘的奖品与奖品区域背景颜色
        //turnplate.restaraunts = ["谢谢参与", "咭星坞公仔", "谢谢参与", "咭星坞书包", "谢谢参与"];
        turnplate.colors = ["#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32"];
        var rotateTimeOut = function() {
            $('#wheelcanvas').rotate({
                angle: 0,
                animateTo: 2160,
                duration: 8000,
                callback: function() {
                    alert('网络超时，请检查您的网络设置！');
                }
            });
        };
        //旋转转盘 item:奖品位置; txt：提示语;
        var rotateFn = function(item, txt) {
            //console.log(item)
            //              console.log(txt)
            var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));

            if (angles < 270) {
                angles = 270 - angles;
            } else {
                angles = 360 - angles + 270;
            }
            $('#wheelcanvas').stopRotate();
            $('#wheelcanvas').rotate({
                angle: 0,
                animateTo: angles + 1800,
                duration: 8000,
                callback: function() {
                    alert(txt);
                    console.log(txt);
                    turnplate.bRotate = !turnplate.bRotate;
                }
            });
        };
        $('.pointer').click(function() {
            /*
             *
             *  思路：
             *
             *
             *  在点击时直接访问后台接口
             *  等待后台数据返回时，再触发转动效果；
             *  待实践：2016-07-01；
             *  编写人：smallfalt401;
             *
             * */
            if (turnplate.bRotate) return;
            turnplate.bRotate = !turnplate.bRotate;

            StartDraw();
            //获取随机数(奖品个数范围内)
            //var item = rnd();
            //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
            //rotateFn(item, turnplate.restaraunts[item - 1]);

        });
        function StartDraw() {
            MainService.rewards.startDraw()
                .then(function(res) {
                    console.log("code:随机抛出异常，以下为查看：")
                    console.log(res);
                    if (res.isDrawn == true) {
                        alert("您已经参加过抽奖了")
                        return rotateFn(1, restaraunts[1 - 1].name);
                    }
                    if (res.isWon == false) {
                        console.log("有异常");
                        return rotateFn(1, restaraunts[1 - 1].name);
                    }
                    //ide 为数组下标  rotateFn(ide+1, restaraunts[ide].name);  ide+1表示 在绘制中的实际位置 ，restaraunts[ide].name 表示在当前数组中的下标
                    var ide = 0;
                    for (ide; ide < restaraunts.length; ide++) { //匹配数组
                        if (restaraunts[ide].code == res.isWon.on_reward_id.code) {
                            console.log("pipei：" + (ide + 1));
                            return rotateFn(ide + 1, restaraunts[ide].name);
                        }
                    }
                    console.log(ide);
                    console.log(restaraunts.length);
                    if (ide == restaraunts.length) {
                        console.log("未能匹配:1");
                        return rotateFn(1, restaraunts[1 - 1].name); //如果未能匹配则表示未中奖；
                    }
                })
        }
        //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
        function drawRouletteWheel() {
            var canvas = document.getElementById("wheelcanvas");
            if (canvas.getContext) {
                //根据奖品个数计算圆周角度
                var arc = Math.PI / (turnplate.restaraunts.length / 2);
                var ctx = canvas.getContext("2d");
                //在给定矩形内清空一个矩形
                ctx.clearRect(0, 0, 422, 422);
                //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
                ctx.strokeStyle = "#FFBE04";
                //font 属性设置或返回画布上文本内容的当前字体属性
                ctx.font = '16px Microsoft YaHei';
                for (var i = 0; i < turnplate.restaraunts.length; i++) {
                    var angle = turnplate.startAngle + i * arc;
                    ctx.fillStyle = turnplate.colors[i];
                    ctx.beginPath();
                    //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                    ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
                    ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
                    ctx.stroke();
                    ctx.fill();
                    //锁画布(为了保存之前的画布状态)
                    ctx.save();
                    //----绘制奖品开始----
                    ctx.fillStyle = "#E5302F";
                    var text = turnplate.restaraunts[i];
                    var line_height = 17;
                    //translate方法重新映射画布上的 (0,0) 位置
                    ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
                    //rotate方法旋转当前的绘图
                    ctx.rotate(angle + arc / 2 + Math.PI / 2);
                    /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                    if (text.indexOf("M") > 0) { //流量包
                        var texts = text.split("M");
                        for (var j = 0; j < texts.length; j++) {
                            ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
                            if (j == 0) {
                                ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
                            } else {
                                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                            }
                        }
                    } else if (text.indexOf("M") == -1 && text.length > 8) { //奖品名称长度超过一定范围
                        text = text.substring(0, 8) + "||" + text.substring(8);
                        var texts = text.split("||");
                        for (var j = 0; j < texts.length; j++) {
                            ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                        }
                    } else {
                        //在画布上绘制填色的文本。文本的默认颜色是黑色
                        //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                    }
                    ctx.restore();
                    //----绘制奖品结束----
                }
            }
        }
        function winner_List() {

            MainService.Get_Winner_List()
                .then(function(res) {
                    console.log(res);

                    $scope.winners = res.data.data;
                    console.log(res.data.data);
                    setInterval(startmarquee(34, 90, 0), 1000);
                })
                ///setInterval("startmarquee(34,90,0)",1000);
        }

        function startmarquee(lh, speed, delay) {
            console.log(11111);
            var t;
            var o = document.getElementById("marquee");
            console.log(document.getElementById("marquee"));

            if (o.getElementsByTagName('li').length <= 5) {
                console.log("exit");
                clearInterval(startmarquee);
            }
            if (o.getElementsByTagName('li').length >= 6 && o.getElementsByTagName('li').length < 9) {
                console.log("copy");
                o.innerHTML += o.innerHTML + o.innerHTML;
            }

            o.scrollTop = 0;

            function start() {
                t = setInterval(scrolling, speed);
                o.scrollTop += 2;
            }

            function scrolling() {
                if (o.scrollTop % lh != 0) {
                    o.scrollTop += 2;
                    if (o.scrollTop >= o.scrollHeight / 2) {
                        o.scrollTop = 0;
                    }
                } else {
                    clearInterval(t);
                    setTimeout(start, delay);
                }
            }
            setTimeout(start, delay);
        }
    });



kimama
    .controller('C1Ctrl', function($scope, $http, MainService) {

        var restaraunts = [{ name: "谢谢您的参与" }];
        var turnplate = {
            restaraunts: [], //大转盘奖品名称
            colors: [], //大转盘奖品区块对应背景颜色
            outsideRadius: 186, //大转盘外圆的半径
            textRadius: 155, //大转盘奖品位置距离圆心的距离
            insideRadius: 50, //大转盘内圆的半径
            startAngle: 0, //开始角度
            bRotate: false //false:停止;ture:旋转
        };
        MainService.login("oVNnev1_m5OQXjsV_IpyhFqRBDL0")
            .then(function(data) {
                nums = ReList();
            })
        function ReList() {
            MainService.getReList()
                .then(function(res) {
                    console.log(res);
                    var obj = {
                        code: 0,
                        created_dt: 0,
                        id: 0,
                        in_stock_count: 0,
                        is_active: 0,
                        name: "谢谢您的参与"
                    }
                    for (var ind = 0; ind < res.length; ind++) {
                        //turnplate.restaraunts[ind]=res[ind].name;
                        turnplate.restaraunts[2 * ind] = obj.name;
                        turnplate.restaraunts[2 * ind + 1] = res[ind].name;
                        restaraunts[2 * ind] = obj;
                        restaraunts[2 * ind + 1] = res[ind];
                    }
                    console.log(restaraunts);
                    drawRouletteWheel();
                    winner_List();
                })
        }

        //动态添加大转盘的奖品与奖品区域背景颜色
        //turnplate.restaraunts = ["谢谢参与", "咭星坞公仔", "谢谢参与", "咭星坞书包", "谢谢参与"];
        turnplate.colors = ["#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32"];
        var rotateTimeOut = function() {
            $('#wheelcanvas').rotate({
                angle: 0,
                animateTo: 2160,
                duration: 8000,
                callback: function() {
                    alert('网络超时，请检查您的网络设置！');
                }
            });
        };
        //旋转转盘 item:奖品位置; txt：提示语;
        var rotateFn = function(item, txt) {
            //console.log(item)
            //				console.log(txt)
            var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));

            if (angles < 270) {
                angles = 270 - angles;
            } else {
                angles = 360 - angles + 270;
            }
            $('#wheelcanvas').stopRotate();
            $('#wheelcanvas').rotate({
                angle: 0,
                animateTo: angles + 1800,
                duration: 8000,
                callback: function() {
                    alert(txt);
                    console.log(txt);
                    turnplate.bRotate = !turnplate.bRotate;
                }
            });
        };
        $('.pointer').click(function() {
            /*
             *
             *  思路：
             *
             *
             *  在点击时直接访问后台接口
             *  等待后台数据返回时，再触发转动效果；
             *  待实践：2016-07-01；
             *  编写人：smallfalt401;
             *
             * */
            if (turnplate.bRotate) return;
            turnplate.bRotate = !turnplate.bRotate;

            StartDraw();
            //获取随机数(奖品个数范围内)
            //var item = rnd();
            //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
            //rotateFn(item, turnplate.restaraunts[item - 1]);

        });
        function StartDraw() {
            MainService.getStartDraw()
                .then(function(res) {
                    console.log("code:随机抛出异常，以下为查看：")
                    console.log(res);
                    if (res.isDrawn == true) {
                        alert("您已经参加过抽奖了")
                        return rotateFn(1, restaraunts[1 - 1].name);
                    }
                    if (res.isWon == false) {
                        console.log("有异常");
                        return rotateFn(1, restaraunts[1 - 1].name);
                    }
                    //ide 为数组下标  rotateFn(ide+1, restaraunts[ide].name);  ide+1表示 在绘制中的实际位置 ，restaraunts[ide].name 表示在当前数组中的下标
                    var ide = 0;
                    for (ide; ide < restaraunts.length; ide++) { //匹配数组
                        if (restaraunts[ide].code == res.isWon.on_reward_id.code) {
                            console.log("pipei：" + (ide + 1));
                            return rotateFn(ide + 1, restaraunts[ide].name);
                        }
                    }
                    console.log(ide);
                    console.log(restaraunts.length);
                    if (ide == restaraunts.length) {
                        console.log("未能匹配:1");
                        return rotateFn(1, restaraunts[1 - 1].name); //如果未能匹配则表示未中奖；
                    }
                })
        }
        //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
        function drawRouletteWheel() {
            var canvas = document.getElementById("wheelcanvas");
            if (canvas.getContext) {
                //根据奖品个数计算圆周角度
                var arc = Math.PI / (turnplate.restaraunts.length / 2);
                var ctx = canvas.getContext("2d");
                //在给定矩形内清空一个矩形
                ctx.clearRect(0, 0, 422, 422);
                //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
                ctx.strokeStyle = "#FFBE04";
                //font 属性设置或返回画布上文本内容的当前字体属性
                ctx.font = '16px Microsoft YaHei';
                for (var i = 0; i < turnplate.restaraunts.length; i++) {
                    var angle = turnplate.startAngle + i * arc;
                    ctx.fillStyle = turnplate.colors[i];
                    ctx.beginPath();
                    //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                    ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
                    ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
                    ctx.stroke();
                    ctx.fill();
                    //锁画布(为了保存之前的画布状态)
                    ctx.save();
                    //----绘制奖品开始----
                    ctx.fillStyle = "#E5302F";
                    var text = turnplate.restaraunts[i];
                    var line_height = 17;
                    //translate方法重新映射画布上的 (0,0) 位置
                    ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
                    //rotate方法旋转当前的绘图
                    ctx.rotate(angle + arc / 2 + Math.PI / 2);
                    /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                    if (text.indexOf("M") > 0) { //流量包
                        var texts = text.split("M");
                        for (var j = 0; j < texts.length; j++) {
                            ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
                            if (j == 0) {
                                ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
                            } else {
                                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                            }
                        }
                    } else if (text.indexOf("M") == -1 && text.length > 8) { //奖品名称长度超过一定范围
                        text = text.substring(0, 8) + "||" + text.substring(8);
                        var texts = text.split("||");
                        for (var j = 0; j < texts.length; j++) {
                            ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                        }
                    } else {
                        //在画布上绘制填色的文本。文本的默认颜色是黑色
                        //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                    }
                    ctx.restore();
                    //----绘制奖品结束----
                }
            }
        }
        function winner_List() {

            MainService.Get_Winner_List()
                .then(function(res) {
                    console.log(res);

                    $scope.winners = res.data.data;
                    console.log(res.data.data);
                    setInterval(startmarquee(34, 90, 0), 1000);
                })
                ///setInterval("startmarquee(34,90,0)",1000);
        }

        function startmarquee(lh, speed, delay) {
            console.log(11111);
            var t;
            var o = document.getElementById("marquee");
            console.log(document.getElementById("marquee"));

            if (o.getElementsByTagName('li').length <= 5) {
                console.log("exit");
                clearInterval(startmarquee);
            }
            if (o.getElementsByTagName('li').length >= 6 && o.getElementsByTagName('li').length < 9) {
                console.log("copy");
                o.innerHTML += o.innerHTML + o.innerHTML;
            }

            o.scrollTop = 0;

            function start() {
                t = setInterval(scrolling, speed);
                o.scrollTop += 2;
            }

            function scrolling() {
                if (o.scrollTop % lh != 0) {
                    o.scrollTop += 2;
                    if (o.scrollTop >= o.scrollHeight / 2) {
                        o.scrollTop = 0;
                    }
                } else {
                    clearInterval(t);
                    setTimeout(start, delay);
                }
            }
            setTimeout(start, delay);
        }
    });





kimama
    .controller('C1CtrlDemo', function($scope,$http) {






        $scope.res = {
            data: {
                id: 50,
                test: 'assaaas'
            }
        }






var turnplate = {
				restaraunts: [], //大转盘奖品名称
				colors: [], //大转盘奖品区块对应背景颜色
				outsideRadius: 186, //大转盘外圆的半径
				textRadius: 155, //大转盘奖品位置距离圆心的距离
				insideRadius: 50, //大转盘内圆的半径
				startAngle: 0, //开始角度
				bRotate: false //false:停止;ture:旋转
			};


				//动态添加大转盘的奖品与奖品区域背景颜色
				turnplate.restaraunts = ["谢谢参与", "咭星坞公仔", "谢谢参与", "咭星坞书包", "谢谢参与", "咭星坞公仔T恤", "谢谢参与 ", "红包", "谢谢参与", "红包"];
				turnplate.colors = ["#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff"];
				var rotateTimeOut = function() {
					console.log("111");
					$('#wheelcanvas').rotate({
						angle: 0,
						animateTo: 2160,
						duration: 8000,
						callback: function() {
							alert('网络超时，请检查您的网络设置！');
						}
					});
				};
				//旋转转盘 item:奖品位置; txt：提示语;
				var rotateFn = function(item, txt) {

					var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));

					if (angles < 270) {
						angles = 270 - angles;
					} else {
						angles = 360 - angles + 270;
					}
					$('#wheelcanvas').stopRotate();
					$('#wheelcanvas').rotate({
						angle: 0,
						animateTo: angles + 1800,
						duration: 8000,
						callback: function() {
							//alert(txt);
							console.log(txt);
							turnplate.bRotate = !turnplate.bRotate;
						}
					});
				};
				$('.pointer').click(function() {

					if (turnplate.bRotate) return;
					turnplate.bRotate = !turnplate.bRotate;
					//获取随机数(奖品个数范围内)
					var item = rnd(1, turnplate.restaraunts.length);

					//奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
					rotateFn(item, turnplate.restaraunts[item - 1]);

				});


			//随机函数   与接口调通后 改由后台传递返回值
			function rnd(n, m) {

				var suns=Math.random() * (m - n + 1) + n;
				var random = Math.floor(suns);

				console.log(suns);

				//接口 ：    ajax      返回信息  已抽奖 中奖 没有中奖
				return 1;//后台返回值
			}
			//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染


				drawRouletteWheel();


			function drawRouletteWheel() {
				var canvas = document.getElementById("wheelcanvas");
				if (canvas.getContext) {
					//根据奖品个数计算圆周角度
					var arc = Math.PI / (turnplate.restaraunts.length / 2);
					var ctx = canvas.getContext("2d");
					//在给定矩形内清空一个矩形
					ctx.clearRect(0, 0, 422, 422);
					//strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
					ctx.strokeStyle = "#FFBE04";
					//font 属性设置或返回画布上文本内容的当前字体属性
					ctx.font = '16px Microsoft YaHei';
					for (var i = 0; i < turnplate.restaraunts.length; i++) {
						var angle = turnplate.startAngle + i * arc;
						ctx.fillStyle = turnplate.colors[i];
						ctx.beginPath();
						//arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
						ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
						ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
						ctx.stroke();
						ctx.fill();
						//锁画布(为了保存之前的画布状态)
						ctx.save();
						//----绘制奖品开始----
						ctx.fillStyle = "#E5302F";
						var text = turnplate.restaraunts[i];
						var line_height = 17;
						//translate方法重新映射画布上的 (0,0) 位置
						ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
						//rotate方法旋转当前的绘图
						ctx.rotate(angle + arc / 2 + Math.PI / 2);
						/** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
						if (text.indexOf("M") > 0) { //流量包
							var texts = text.split("M");
							for (var j = 0; j < texts.length; j++) {
								ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
								if (j == 0) {
									ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
								} else {
									ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
								}
							}
						} else if (text.indexOf("M") == -1 && text.length > 4) { //奖品名称长度超过一定范围
							text = text.substring(0, 4) + "||" + text.substring(4);
							var texts = text.split("||");
							for (var j = 0; j < texts.length; j++) {
								ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
							}
						} else {
							//在画布上绘制填色的文本。文本的默认颜色是黑色
							//measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
							ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
						}
						////添加对应图标
						//if (text.indexOf("恤") > 0) {
						//	var img = document.getElementById("tshirt-img");
						//	//var img =new Image();
						//	//img.src="img/tshirt.png"
						//	console.log("11");
						//	img.onload = function() {
                        //
						//		ctx.drawImage(img, -15, 10);
						//	};
						//	ctx.drawImage(img, -15, 22);
						//}
						//else if (text.indexOf("谢谢参与") >= 0) {
						//	var img = document.getElementById("sorry-img");
						//	console.log("22");
						//	img.onload = function() {
						//		ctx.drawImage(img, -15, 10);
						//	};
						//	ctx.drawImage(img, -15, 22);
						//}
						//else if (text.indexOf("红包") >= 0) {
						//	var img = document.getElementById("red-img");
						//	console.log("33");
						//	img.onload = function() {
						//		ctx.drawImage(img, -15, 10);
						//	};
						//	ctx.drawImage(img, -15, 15);
						//}
						//else if (text.indexOf("书包") >= 0) {
						//	console.log("44");
						//	var img = document.getElementById("bookbag-img");
						//	img.onload = function() {
						//		ctx.drawImage(img, -15, 10);
						//	};
						//	ctx.drawImage(img, -15, 22);
						//}
						//else if (text.indexOf("公仔") >= 0) {
						//	console.log("55");
						//	var img = document.getElementById("doll-img");
						//	img.onload = function() {
						//		ctx.drawImage(img, -15, 10);
						//	};
						//	ctx.drawImage(img, -15, 22);
						//}
						//把当前画布返回（调整）到上一个save()状态之前
						ctx.restore();
						//----绘制奖品结束----
					}
				}
			}





    });

kimama.controller('C2Ctrl', ['$scope', 'MainService', function($scope, MainService) {
    $scope.rewards = {
        lists: [],
        loadMore: null,
        domore: false,
        page: 1,
        limit: 5,
        exchange_status: 'EXCH_WAITING_CONFIRM',
        is_my_exchange_history: true,
        delivery_name: [],
        delivery_phonenum: [],
        delivery_address: [],
        exchange:[]
    }
    var query = {
    	rewardid:"",
        name: "",
        address: "",
        phone: ""
    }
    $scope.rewards.loadMore = loadMore;
    $scope.submit = submit;
    $scope.exchange=exchange;
    function loadMore() {
        MainService.rewards.rewardsHistory({
            exchange_status: $scope.rewards.exchange_status,
            is_my_exchange_history: $scope.rewards.exchange_status,
            page: $scope.rewards.page,
            limit: $scope.rewards.limit
        }).then(function(data) {
            console.log(data);
            if (data.length < 1) {
                $scope.rewards.domore = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            }
            $scope.rewards.lists.push.apply($scope.rewards.lists, data);
            $scope.rewards.page++;
            console.log($scope.rewards.lists);
            $scope.$broadcast('scroll.infiniteScrollComplete');

        })

    }

    function submit(index) {
        query.name = $scope.rewards.delivery_name[index];
        query.phone = $scope.rewards.delivery_phonenum[index];
        query.address = $scope.rewards.delivery_address[index];
        query.rewardid=$scope.rewards.lists[index].id;
        console.log(query);
       MainService.rewards.exchange(query).then(function(data){
       	console.log(data);
       })
    }

    function exchange(index) {
    	$scope.rewards.exchange[index]=true;
    }
}])

kimama.controller('C2_1Ctrl', ['$scope', 'MainService', function($scope, MainService) {
    $scope.rewards = {
        lists: [],
        loadMore: null,
        domore: false,
        page: 1,
        limit: 5,
        exchange_status: 'EXCH_DENIED',
        is_my_exchange_history: true,
    }
    $scope.rewards.loadMore = loadMore;

    function loadMore() {
        MainService.rewards.rewardsHistory({
            exchange_status: $scope.rewards.exchange_status,
            is_my_exchange_history: $scope.rewards.exchange_status,
            page: $scope.rewards.page,
            limit: $scope.rewards.limit
        }).then(function(data) {
            console.log(data);
            if (data.length < 1) {
                $scope.rewards.domore = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            }
            $scope.rewards.lists.push.apply($scope.rewards.lists, data);
            $scope.rewards.page++;
            console.log($scope.rewards.lists);
            $scope.$broadcast('scroll.infiniteScrollComplete');

        })

    }
}])

kimama.controller('C2_2Ctrl', ['$scope','MainService', function($scope,MainService){
	 $scope.rewards = {
        lists: [],
        loadMore: null,
        domore: false,
        page: 1,
        limit: 5,
        exchange_status: 'EXCH_COMPLETED',
        is_my_exchange_history: true,
    }
    $scope.rewards.loadMore = loadMore;

    function loadMore() {
        MainService.rewards.rewardsHistory({
            exchange_status: $scope.rewards.exchange_status,
            is_my_exchange_history: $scope.rewards.exchange_status,
            page: $scope.rewards.page,
            limit: $scope.rewards.limit
        }).then(function(data) {
            console.log(data);
            if (data.length < 1) {
                $scope.rewards.domore = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            }
            $scope.rewards.lists.push.apply($scope.rewards.lists, data);
            $scope.rewards.page++;
            console.log($scope.rewards.lists);
            $scope.$broadcast('scroll.infiniteScrollComplete');

        })

    }
}])
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

kimama
    .controller('C3_1Ctrl', ['$ionicActionSheet', '$timeout', 'ionicDatePicker', 'FileUploader', 'MainService', '$scope', '$location', function($ionicActionSheet, $timeout, ionicDatePicker, FileUploader, MainService, $scope, $location) {
        $scope.babyinfo = {
            lists: [],
        }
        $scope.info = {
                delivery_phonenum: "",
                delivery_address: ""
            }
            // 传递给后台的参数
        var query = {
            babies: [],
            delivery_phonenum: "",
            delivery_address: ""
        };

        getUserInfo();
        $scope.submit = submit;

        $scope.click_sex = click_sex;

        $scope.click_date = click_date;

        // 选择性别 
        function click_sex(dIndex) {
            $ionicActionSheet.show({
                buttons: [
                    { text: "<img src='img/boys.png' /> " },
                    { text: "<img src='img/default.png' /> " },
                    { text: "<img src='img/grils.png' /> " },
                ],
                //destructiveText: 'Delete',
                titleText: '性别选择<i>x</i>',
                cancelText: '取消',
                cancel: function() {
                    console.log("取消");
                },
                buttonClicked: function(index) {
                    console.log(index);
                    switch (index) {
                        case 0:
                            console.log("男");
                            $scope.babyinfo.lists[dIndex].gender = "男";
                            break;
                        case 1:
                            console.log("保密");
                            $scope.babyinfo.lists[dIndex].gender = "男";
                            break;
                        case 2:
                            console.log("女");
                            $scope.babyinfo.lists[dIndex].gender = "女";
                            break;
                        default:
                            // this.cancel();
                            break;
                    }
                    return true;
                },
                cssClass: 'freePopup'
            });
        }

        //出生日期  第三方控件
        function click_date(dIndex) {
            ionicDatePicker.openDatePicker(ipObj1);
            localStorage.setItem('dateIndex', dIndex);
        }

        var ipObj1 = {
            callback: function(val) { //Mandatory
                var dIndex = parseInt(localStorage.getItem('dateIndex'));
                $scope.babyinfo.lists[dIndex].birthday = MainService.tool.getYmdDate(val);
            },
            disabledDates: "", //Optional,
            from: new Date(2008, 1, 1), //Optional
            to: new Date(2016, 10, 30), //Optional
            inputDate: new Date(), //Optional
            mondayFirst: false, //Optional
            disableWeekdays: [], //Optional
            closeOnSelect: false, //Optional
            templateType: 'popup', //Optional
        };
        // 提交按钮的函数
        function submit() {

            query.babies = $scope.babyinfo.lists;
            query.delivery_address = $scope.info.delivery_address;
            query.delivery_phonenum = $scope.info.delivery_phonenum;
            for (index in query.babies) {
                query.babies[index].gender = MainService.tool.genderToNumber(query.babies[index].gender);
            }
            console.log(query);

            MainService.user.updateProfile(query).then(function(data) {
                console.log(data);
                MainService.tool.setUserInfo(data);
            })
            $location.path('/tab/c3');
        }

        function getUserInfo() {
            // 获取用户信息，并且将后台数据处理
            MainService.user.info().then(function(data) {
                // 数据处理
                for (index in data.babies) {
                    data.babies[index].birthday = MainService.tool.getYmdDate(data.babies[index].birthday);
                    data.babies[index].gender = MainService.tool.getGender(data.babies[index].gender);
                }
                $scope.babyinfo.lists = data.babies;

                // console.log($scope.babyinfo.lists);
            })
        }
    }]);

kimama
    .controller('C3_1Ctrl', ['$ionicActionSheet', '$timeout', 'ionicDatePicker', 'FileUploader', 'MainService', '$scope', '$location', function($ionicActionSheet, $timeout, ionicDatePicker, FileUploader, MainService, $scope, $location) {
        //思路   默认显示一个宝宝   在点击添加后 添加一个form项
        //实现   scope 的babies中默认存在一个未填写的baby项  点击add后 向babies中push一个 在tpl中使用ng——repeat 来实现动态添加
        $scope.hide_baby_btn = false;
        var baby={
            babyname:"",
                gender: "1",
                birthday:"",
                relationship: {
                    "id": 38,
                    "etype": "RELATION_BABY",
                    "name": "BABY_FATHER",
                    "display_name": "宝宝的爸"
                }
        }
        var query={babies:[],delivery_phonenum:"",delivery_address:""}
        $scope.UpdateProfile = {
            babies: [{
                // id: 122, //如果不传送ID，就会为用户新增一个宝宝
                //birthday: '1999-09-09',
                babyname:"",
                gender: '',
                birthday:" ",
                relationship: {
                    "id": 38,
                    "etype": "RELATION_BABY",
                    "name": "BABY_FATHER",
                    "display_name": "宝宝的爸"
                }
            }]
        };
        // 选择性别
        $scope.click_sex = click_sex;
        //出生日期  第三方控件
        $scope.click_date = click_date;
        // 上传资料
        $scope.addBaby = addBaby;
        $scope.submit = submit;
        //$scope.newbabie = {//新添宝宝讯息
        //    // id: 122, //如果不传送ID，就会为用户新增一个宝宝
        //    //birthday: '1999-09-09',
        //    gender: '',
        //    relationship: {
        //        "id": 38,
        //        "etype": "RELATION_BABY",
        //        "name": "BABY_FATHER",
        //        "display_name": "宝宝的爸"
        //    }
        //};

/*        if ($scope.UpdateProfile.babies.length > 5) { //baby人数超过5人时 添加宝宝按钮隐藏
            $scope.hide_baby_btn = true;
        }*/

/*        function addBaby() {
            if ($scope.UpdateProfile.babies.length > 5) { //baby人数超过5人时 添加宝宝按钮隐藏
                return;
            }
            // $scope.UpdateProfile.babies.push($scope.newbabie);//为什么不行？？？？？ 提示ng－repeat异常
            $scope.UpdateProfile.babies[$scope.UpdateProfile.babies.length] = { //新添宝宝讯息
                // id: 122, //如果不传送ID，就会为用户新增一个宝宝
                //birthday: '1999-09-09',
                babyname: '',
                gender: '',
                birthday:"",
                relationship: {
                    "id": 38,
                    "etype": "RELATION_BABY",
                    "name": "BABY_FATHER",
                    "display_name": "宝宝的爸"
                }
            }
            if ($scope.UpdateProfile.babies.length == 5) { //baby人数超过5人时 添加宝宝按钮隐藏
                $scope.hide_baby_btn = true;
            }
        }*/

        function click_sex(dIndex) {
            $ionicActionSheet.show({
                buttons: [
                    { text: "<img src='img/boys.png' /> " },
                    { text: "<img src='img/default.png' /> " },
                    { text: "<img src='img/grils.png' /> " },
                ],
                //destructiveText: 'Delete',
                titleText: '性别选择<i>x</i>',
                cancelText: '取消',
                cancel: function() {
                    console.log("取消");
                },
                buttonClicked: function(index) {
                    console.log(index);
                    // 宝宝的性别只能传递数字
                    switch (index) {
                        case 0:
                            console.log("男");
                            $scope.UpdateProfile.babies[dIndex].gender = index + 1;
                            // $scope.info.sex = "男";
                            $scope.UpdateProfile.babies[dIndex].sex = "男";
                            break;
                        case 1:
                            console.log("保密");
                            $scope.UpdateProfile.babies[dIndex].gender = index;
                            // $scope.info.sex = "男";
                            $scope.UpdateProfile.babies[dIndex].sex = "男";
                            break;
                        case 2:
                            console.log("女");
                            $scope.UpdateProfile.babies[dIndex].gender = index;
                            // $scope.info.sex = "女";
                            $scope.UpdateProfile.babies[dIndex].sex = "女";
                            break;
                        default:
                            // this.cancel();
                            break;
                    }
                    return true;
                },
                cssClass: 'freePopup'
            });
        }

        function click_date(dIndex) {

            ionicDatePicker.openDatePicker(ipObj1);
            localStorage.setItem('dateIndex',dIndex);
        }

        var ipObj1 = {
            callback: function(val) { //Mandatory
                var dIndex=parseInt(localStorage.getItem('dateIndex'));
                $scope.UpdateProfile.babies[dIndex].birthday = MainService.tool.getYmdDate(val);
            },
            disabledDates: "", //Optional,
            from: new Date(2008, 1, 1), //Optional
            to: new Date(2016, 10, 30), //Optional
            inputDate: new Date(), //Optional
            mondayFirst: false, //Optional
            disableWeekdays: [], //Optional
            closeOnSelect: false, //Optional
            templateType: 'popup', //Optional
        };



        function submit() {
            for (index in $scope.UpdateProfile.babies) {
                baby.gender=$scope.UpdateProfile.babies[index].gender;
                baby.babyname=$scope.UpdateProfile.babies[index].babyname;
                baby.babyname=$scope.UpdateProfile.babies[index].babyname;
                baby.birthday=$scope.UpdateProfile.babies[index].birthday;
                query.babies.push(baby);
            }
            console.log(query);
            localStorage.setItem('participants',2+$scope.UpdateProfile.babies.length);
            // MainService.user.updateProfile(query).then(function(data){
            //     console.log(data);
            // })
            $location.path('/tab/c3');
        }
    }]);

kimama
// A菜单控制器
  .controller('A', function($scope,$http,$filter, JMM) {
    $scope.A3=JMM.getA3info();
    $scope.A2=JMM.getA2info();
    $scope.A1=JMM.getA1info();
    $scope.A4=JMM.getA4info();
//  $scope.Games = KiKnowledge.getAllGames();
//  $scope.games = KiKnowledge.getAllGames();
//  $scope.chTab = function(tab){
//    $scope.selectedTab = tab;
//  };

  })

  .controller('B', function($scope,$http, $filter,JMM) {
      $scope.age=1;
    $scope.B1=JMM.getB1info();
    $scope.clickage=function(num){
      $scope.age=num;
    }
		

  })

  .controller('SharesDetailCtrl', function($scope, $stateParams, JMM) {
    $scope.chat = JMM.get($stateParams.chatId);
  })

  .controller('ScoresCtrl', function($scope) {
    $scope.selectedTab = 'tab1';
    $scope.chTab = function(tab){
      $scope.selectedTab = tab;
    };
    $scope.settings = {
      enableFriends: true
    };
  });
