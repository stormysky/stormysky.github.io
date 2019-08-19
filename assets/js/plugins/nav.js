(function(){
	var o = false;
	var t=0,l=0;
	function sh(){
		var s = $(".list-nav");
		o = o ? (s.css("opacity","0"),false) : (s.css("opacity","0.8"),true);
	}
	function down(e){
		l = e.offsetX;
		t = e.offsetY;
		$(document).bind("selectstart",function(){return false;})
		$(document).bind("mousemove", mv);
		$(document).bind("mouseup",function(){
			$(document).unbind("mousemove");
			$(document).unbind("selectstart");
			$(document).unbind("mouseup");
		});
	}
	function mv(e){
		e.preventDefault();
		e.stopPropagation();
		var width = $(".list-nav").width();
		var x = e.clientX - l - width;
		var y = e.clientY - t;
		$(".nav").css({"left":x,"top":y});
	}

	$(".bn-nav").bind("click",sh);
	$(".bn-nav").bind("mousedown",down);
}());