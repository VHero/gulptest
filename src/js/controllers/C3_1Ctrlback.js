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
