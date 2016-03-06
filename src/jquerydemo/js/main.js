require.config({
    baseUrl: 'js',
    paths: {
        jquery: ["http://libs.baidu.com/jquery/1.11.3/jquery", "../bootstrap/jquery-1.11.3.min"],
        vquery:"vquery",
        bsjs:["cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js","../bootstrap/bootstrap.min"],

    }
});
require(["jquery"], function($) {
    $(".jqlist > li > p").click(function() {

        if (!$(this).next().is(':visible')) {
            $('.jqlist ul').slideUp(300);
        }
        $(this).next().slideToggle(300);
    });



});

require(["jquery","vquery"],function($,result){
	var oDiv=$('.logo');
	result.drag(oDiv);
	result.picplay();
	result.movetosrc();
    result.ajaximg();
})