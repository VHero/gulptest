require.config({
    baseUrl: 'js',
     shim: {
        "jqueryui":['jquery'],
        "fullpage":['jquery']
    },
    paths: {
        jquery: ["http://libs.baidu.com/jquery/1.8.3/jquery.min", "../bootstrap/jquery-1.11.3.min"],
        "jqueryui":"jquery-ui.min.js",
        "fullpage":"jquery.fullPage.min"
    }
});
require(["jquery","fullpage"],function($){
   $(function(){
    if($.browser.msie && $.browser.version < 10){
        $('body').addClass('ltie10');
    }
    $.fn.fullpage({
        verticalCentered: false,
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9', 'page10'],
        navigation: true,
        navigationTooltips: ['首页', '视觉', '交互', '皮肤', '功能', '待办邮件', '联系人邮件', '科技', '连接易信', '马上体验']
    });
});
})