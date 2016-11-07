<?php  
  
    $appid = "wx6122157781036f96";  
    $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri=http://www.kisenwo.com/kimama/fn_callback.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';  
    // header("Location:".$url);  
    header("Location:".$url);  
  
?>  

<!-- 
=GetWeiXinCode('wx6122157781036f96','1b622eb0887b137411ce988a3620a1e2','www.kisenwo.com');

-->