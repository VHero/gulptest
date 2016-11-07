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
