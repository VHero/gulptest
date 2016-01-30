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
            aOlli.click(function() {
                iNow = $(this).index();
                fnFade();
            });
            autoPlay();
            oDiv.hover(function() {
                clearInterval(timer);
            }, autoPlay);

            function autoPlay() {
                timer = setInterval(function() {
                    iNow++;
                    iNow %= aUlli.length;
                    fnFade();
                }, 3000);
            }

            function fnFade() {
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
    return{
    	drag:drag,
    	picplay:picPlay,
    	movetosrc:movetosrc
    };
    	
})