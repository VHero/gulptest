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
