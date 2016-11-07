<?php

$appid = "wx6122157781036f96";
$secret = "1b622eb0887b137411ce988a3620a1e2";
$code = $_GET["code"];
$get_token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$secret.'&code='.$code.'&grant_type=authorization_code';

$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$get_token_url);
curl_setopt($ch,CURLOPT_HEADER,0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
$res = curl_exec($ch);
curl_close($ch);
$json_obj = json_decode($res,true);

//����openid��access_token��ѯ�û���Ϣ
$access_token = $json_obj['access_token'];
$openid = $json_obj['openid'];
//https://api.weixin.qq.com/sns/userinfo?
//https://api.weixin.qq.com/cgi-bin/user/info?
$get_user_info_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token.'&openid='.$openid.'&lang=zh_CN';

$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$get_user_info_url);
curl_setopt($ch,CURLOPT_HEADER,0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
$res = curl_exec($ch);
curl_close($ch);

//����json

session_start();
$user_obj = json_decode($res,true);
$_SESSION['user'] = $user_obj;
$_SESSION['unionid'] = $user_obj['unionid'];
$unionid=$_SESSION['unionid'];
$_SESSION['userinfo']=$res;

print_r($unionid);
//print_r($user);
//print_r($openid);
//print_r($user_obj);
//print_r($user_obj);
//header("Location:http://www.kisenwo.com/WX_MAMA/Kimama.php#/b1");
  //header("Location:".$_SESSION['comefrom']."invitecode=".$rv);

header("Location:".$_SESSION['comefrom']);


//echo "1234";
?>