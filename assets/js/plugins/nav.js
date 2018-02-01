(function(){
	var o = false,du=false;
	function sh(){
		var l = $(".list-nav")
		o = o ? (l.css("opacity","0"),false) : (l.css("opacity","0.8"),true);
	}
	$(".bn-nav").bind("click",sh);
}());