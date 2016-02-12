define(["jquery"],function(){
	   
    
	    function drag(obj){
    	            obj.mousedown(function(e) {
            	e.preventDefault();//阻止默认的拖拽事件
                var disX = e.pageX - $(this).position().left;
                var disY = e.pageY - $(this).position().top;
                var L;
                var T;
                $(document).mousemove(function(e) {
                    L = e.pageX - disX;//
                    T = e.pageY - disY;//
                    if (L < 0) {//防止被拖拽物体超出边界
                        L = 0;
                    }
                    if (T < 0) {//防止被拖拽物体超出边界
                        T = 0;
                    }
                    obj.css({
                        'left': L,
                        'top': T,
                    });
                    
                })
                $(document).mouseup(function() {
                    $(document).unbind('mousemove');
                    $(document).unbind('mouseup');
                    
                });
                    
            });
    }
    function picPlay(){
			var oDiv = $('.container1');
            var aOlli = oDiv.find('ol li');
            var aUlli = oDiv.find('ul li');
            var iNow = 0;
            var timer = null;
            fnFade();
            aOlli.click(function() {//点击切换焦点图
                iNow = $(this).index();
                fnFade();
                clearInterval(timer);//点击后清除定时器
                autoPlay();
            });
            autoPlay();
            function autoPlay() {//自动轮播
                timer = setInterval(function() {
                    iNow++;
                    iNow %= aUlli.length;
                    fnFade();
                }, 3000);
            }

            function fnFade() {//焦点图切换
                aUlli.each(function(i) {
                    if (i != iNow) {
                        aUlli.eq(i).fadeOut().css('zIndex', '1');
                        aOlli.eq(i).removeClass('active');
                    } else {
                        aUlli.eq(i).fadeIn().css('zIndex', '2');
                        aOlli.eq(i).addClass('active');
                    }
                });
            }

    }
    function movetosrc(){
    	var aImg=$(".ul2 li img");
    	var oImg=$(".oImg");
    	aImg.mouseover(function(){
    		// oImg.attr("src","image/img3.gif");
    		oImg.attr("src",$(this).attr("src"));
    	});
    }
    function ajaximg(){
        $.getJSON("https://api.douban.com/v2/album/74539453/photos?callback=?",function(data){

         console.log(data["photos"][0]["image"]);
         var oUl=$(".ul3");
         var length=data["photos"].length;

       
         for(var index=0;index<length;index++){
              oUl.append("<li><img src=\"\" alt=\"\"></li>");
            var imgsrc=data["photos"][index]["image"];
            var oImg=oUl.children("li").eq(index).find("img");
            oImg.attr("src",data["photos"][index]["image"]);
            if(index%4==3){
            $("li").eq(index).css({"marginRight":"0"});
            }
         }




        })
    }
    return{
    	drag:drag,
    	picplay:picPlay,
    	movetosrc:movetosrc,
        ajaximg:ajaximg
    };
    	
})