
<!DOCTYPE html>
<html lang="en" >
<head>
  <?php
  session_start();
  if(empty($_SESSION['user'])){
    $_SESSION['comefrom'] = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'] . '?' . $_SERVER['QUERY_STRING'];
    echo  $_SERVER['QUERY_STRING'];
    header("Location:http://www.kisenwo.com/kimama/fn_wx_login.php");
  }else{

    echo '<script>';
    $string = implode(',', $_SESSION['user']);
    echo 'sessionStorage.setItem("unionid", \'' . json_encode($_SESSION['unionid']) . '\');';
    echo '</script>';
  }
  require_once "jssdk.php";
  $jssdk = new JSSDK("wx6122157781036f96", "1b622eb0887b137411ce988a3620a1e2");
  $signPackage = $jssdk->GetSignPackage();
  ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=no">
    <title>咭妈妈</title>
    <script src="lib/flexible.js"></script>
    <link rel="stylesheet" href="lib/ionic/css/ionic.min.css">
    <link rel="stylesheet" href="css/base.css"/>
    <link rel="stylesheet" href="css/a1.css">
    <link rel="stylesheet" href="css/a2.css">
    <link rel="stylesheet" type="text/css" href="css/a3.css"/>
    <link rel="stylesheet" type="text/css" href="css/a3-1.css"/>
    <link rel="stylesheet" type="text/css" href="css/a4.css"/>
    <link rel="stylesheet" type="text/css" href="css/a4-1.css"/>
    <link rel="stylesheet" href="css/a5.css">
    <link rel="stylesheet" href="css/a5-1.css">
    <link rel="stylesheet" href="css/a5-1-0.css">
    <link rel="stylesheet" href="css/a5-1-1.css">
    <link rel="stylesheet" href="css/a5-1-2.css">
    <link rel="stylesheet" href="css/a5-1-3.css">
    <link rel="stylesheet" href="css/a5-2.css">
    <link rel="stylesheet" href="css/a5-3.css">
    <link rel="stylesheet" href="css/a5-3-1.css">
    <link rel="stylesheet" href="css/a5-3-2.css">
    <link rel="stylesheet" href="css/a5-4.css">
    <link rel="stylesheet" href="css/a5-4-1.css">
    <link rel="stylesheet" href="css/a6.css">
    <link rel="stylesheet" href="css/a6-1.css">
    <link rel="stylesheet" href="css/a6-2.css">
    <link rel="stylesheet" href="css/iconfont.css">
    <link rel="stylesheet" href="css/b1.css" />
    <link rel="stylesheet" href="css/b1-1.css"/>
    <link rel="stylesheet" href="css/b2.css">
    <link rel="stylesheet" href="css/b2-1.css">
    <link rel="stylesheet" href="css/b3.css">
    <link rel="stylesheet" href="css/b3-1.css"> 
    <link rel="stylesheet" href="css/b4.css">
    <link rel="stylesheet" href="css/b4-1.css">
    <link rel="stylesheet" href="css/b5.css">
    <link rel="stylesheet" href="css/b5-1.css">
    <link rel="stylesheet" href="css/c1.css">
    <link rel="stylesheet" href="css/c2.css">
    <link rel="stylesheet" href="css/c2-1.css">
    <link rel="stylesheet" href="css/c2-2.css">
    <link rel="stylesheet" href="css/c3.css">
    <link rel="stylesheet" type="text/css" href="css/c3-1.css">
  <style>
    .ionic_datepicker_popup .popup-body .selected_date_full{
      background-color: #32d7ff;
    }
  </style>
</head>
<body ng-app="Kimama">
<ion-nav-view></ion-nav-view>
<script src="lib/ionic/js/ionic.bundle.js"></script>
<script src="lib/ionic-datepicker/dist/ionic-datepicker.bundle.min.js"></script>
  <script src="js/jquery-1.8.3.min.js"></script>
  <script src="js/awardRotate.js"></script>

  <!--<script src="Lib/angular-ui/angular-ui-router.min.js"></script>-->
  <!--<script src="Libs/angular/angular-translate.min.js"></script>-->
  <!--<script src="Libs/angular/angular-sanitize.js"></script>-->
  <!--<script src="Libs/ng-infinite-scroll.js"></script>-->
  <!--  <script src="cordova.js"></script>-->

  <script src="I10n/zh_CN.js"></script>
  <script src="I10n/EN.js"></script>

  <!-- your app's js -->
  <script src="js/app.js"></script>
  <script src="js/services/appConfig.js"></script>
  <script src="../Libs/jweixin-1.0.0.js"></script>
  <script>
  /*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
  wx.config({
    debug: false,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
     jsApiList: [  //需要使用的网页服务接口
       'checkJsApi',  //判断当前客户端版本是否支持指定JS接口
       'onMenuShareTimeline', //分享给好友
       'onMenuShareAppMessage', //分享到朋友圈
       'onMenuShareQQ',  //分享到QQ
       'onMenuShareWeibo' //分享到微博
   ]
  });

</script>
  <script src="js/tabDirective.js"></script>
  <script src="../Libs/angular/angular-file-upload.min.js"></script>
  <script src="../Libs/moment.js"></script>
  <!-- 富文本编辑器的js文件 -->
  <script src="../Libs/textAngular-rangy.min.js"></script>
  <script src="../Libs/textAngular-sanitize.min.js"></script>
  <script src="../Libs/textAngular.min.js"></script>

  <script src="js/controllers/A1Ctrl.js"></script>
  <script src="js/controllers/A2Ctrl.js"></script>
  <script src="js/controllers/A3Ctrl.js"></script>
  <script src="js/controllers/A3_1Ctrl.js"></script>

  <script src="js/controllers/A4Ctrl.js"></script>
  <script src="js/controllers/A4_1Ctrl.js"></script>
  <script src="js/controllers/A5Ctrl.js"></script>
  <script src="js/controllers/A5_1Ctrl.js"></script>
  <script src="js/controllers/A5_1_0Ctrl.js"></script>
  <script src="js/controllers/A5_1_1Ctrl.js"></script>
  <script src="js/controllers/A5_1_2Ctrl.js"></script>
  <script src="js/controllers/A5_1_3Ctrl.js"></script>
  <script src="js/controllers/A5_2Ctrl.js"></script>
  <script src="js/controllers/A5_3Ctrl.js"></script>
  <script src="js/controllers/A5_3_1Ctrl.js"></script>
  <script src="js/controllers/A5_3_2Ctrl.js"></script>
  <script src="js/controllers/A5_4Ctrl.js"></script>
  <script src="js/controllers/A5_4_1Ctrl.js"></script>
  <script src="js/controllers/A6Ctrl.js"></script>
  <script src="js/controllers/A6_1Ctrl.js"></script>
  <script src="js/controllers/A6_2Ctrl.js"></script>
  <script src="js/controllers/B1Ctrl.js"></script>
  <script src="js/controllers/B1_1Ctrl.js"></script>

  <script src="js/controllers/B2Ctrl.js"></script>
  <script src="js/controllers/B2_1Ctrl.js"></script>

  <script src="js/controllers/B3Ctrl.js"></script>
  <script src="js/controllers/B3_1Ctrl.js"></script>

  <script src="js/controllers/B4Ctrl.js"></script>
  <script src="js/controllers/B4_1Ctrl.js"></script>
  <script src="js/controllers/B5Ctrl.js"></script>
  <script src="js/controllers/B5_1Ctrl.js"></script>
  <script src="js/controllers/B6Ctrl.js"></script>
  <script src="js/controllers/B6_1Ctrl.js"></script>
  <script src="js/controllers/B6_2Ctrl.js"></script>

  <script src="js/services/MainService.js"></script>
  <script src="js/services/freePopup.js"></script>
  <script src="js/controllers/C1Ctrl.js"></script>
  <script src="js/controllers/C2Ctrl.js"></script>
  <script src="js/controllers/C2_1Ctrl.js"></script>
  <script src="js/controllers/C2_2Ctrl.js"></script>
  <script src="js/controllers/C3Ctrl.js"></script>
  <script src="js/controllers/C3_1Ctrl.js"></script>

<script src="js/controllers/C1CtrlDemo.js" type="text/javascript" charset="utf-8"></script>
<script>


</script>
</body>
</html>
