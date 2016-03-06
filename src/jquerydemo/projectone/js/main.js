$(function() {
    $(".carousel").carousel({ interval: 8000 });

});
$(".carousel-inner").swipe({
	swipeRight:function(event, direction, distance, duration, fingerCount){
		$(this).parent().carousel('prev');
	},
	swipeLeft:function(event, direction, distance, duration, fingerCount){
		$(this).parent().carousel('next');
	}
})