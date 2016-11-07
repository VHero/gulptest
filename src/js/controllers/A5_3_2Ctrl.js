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
