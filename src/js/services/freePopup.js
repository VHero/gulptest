/**
 * Created by my_cao on 16/8/3.
 */
kimama.service('freePopup',['$ionicActionSheet','$timeout' ,function($ionicActionSheet,$timeout){
 //头像
  this.click_head = function() {
    $ionicActionSheet.show({
      buttons: [
        { text: "<img src='img/click_head_phone.png' /><p>拍照</p> "},
        { text: "<img src='img/click_head_photo.png' /><p>相册</p> "},
        { text: "<img src='img/click_head_rudom.png' /><p>随机</p> "},
      ],
      //destructiveText: 'Delete',
      titleText: '头像选择<i>x</i>',
      cancelText: '取消',
      cancel: function() {
        // add cancel code..
        console.log("取消");
      },
      buttonClicked: function(index) {

        console.log(index);

        switch (index){
          case 0:
            console.log("拍照");
            break;
          case 1:
            console.log("相册");
            break;
          case 2:
            console.log("随机");
            break;
          default :
            // this.cancel();
            break;
        }
        return true;
      },
      cssClass:'freePopup'
    });
  };


//性别
  this.click_sex = function() {
    $ionicActionSheet.show({
      buttons: [
        { text: "<img src='img/boys.png' /> "},
        { text: "<img src='img/default.png' /> "},
        { text: "<img src='img/grils.png' /> "},
      ],
      //destructiveText: 'Delete',
      titleText: '性别选择<i>x</i>',
      cancelText: '取消',
      cancel: function() {
        // add cancel code..
        console.log("取消");
      },
      buttonClicked: function(index) {

        console.log(index);

        switch (index){
          case 0:
            console.log("男");
            $scope.sex='男';
            break;
          case 1:
            console.log("保密");
            $scope.sex='保密';
            break;
          case 2:
            console.log("女");
            $scope.sex='女';
            break;
          default :
            // this.cancel();
            break;
        }
        return true;
      },
      cssClass:'freePopup'
    });
  };

  //出生日期  第三方控件
  this.click_date=function(){
    ionicDatePicker.openDatePicker(ipObj1);
  };

  var ipObj1 = {
    callback: function (val) {  //Mandatory
      console.log('回调时间 : ' + val, new Date(val));
    },
    disabledDates:"",            //Optional,
    from: new Date(2008, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: false,          //Optional
    disableWeekdays: [],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup',       //Optional
  };
}])
