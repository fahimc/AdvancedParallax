(function(window) {
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	};

	function onLoad() {
		AdvancedParallaxJS.init();
		AdvancedParallaxJS.addListener("view1",AdvancedParallaxJS.events.ON_VIEW_SCROLL_IN,onView1Move);
		// AdvancedParallaxJS.addListener("view1",AdvancedParallaxJS.events.ON_VIEW_SCROLL_OUT,onView1Move);
		
		AdvancedParallaxJS.addListener("view2",AdvancedParallaxJS.events.ON_VIEW_SCROLL_IN,onView2Move);
		// AdvancedParallaxJS.addListener("view2",AdvancedParallaxJS.events.ON_VIEW_SCROLL_OUT,onView2Move);
		
		// AdvancedParallaxJS.addListener("view0",AdvancedParallaxJS.events.ON_VIEW_SCROLL_DOWN,onView0Move);
		AdvancedParallaxJS.addListener("view0",AdvancedParallaxJS.events.ON_VIEW_SCROLL_IN,onView0MoveIn);
		AdvancedParallaxJS.addListener("view0",AdvancedParallaxJS.events.ON_VIEW_SCROLL_OUT,onView0MoveOut);
		AdvancedParallaxJS.addListener("parallaxHolder",AdvancedParallaxJS.events.ON_VIEW_CHANGE,onViewChange);
		// AdvancedParallaxJS.setView(0,{delay:10})
		AdvancedParallaxJS.setScrollerState("disable");
		AdvancedParallaxJS.setScrollerState("enable");
	};
	
	function onView1Move(event)
	{
		//console.log(event.percentage);
		var box = document.getElementById("cardetail");
		
		// box.style.left = (100 * event.percentage)+"%";
		//TweenLite.killTweensOf(box);
		TweenLite.to(box,0.5,{css:{left:(100 * event.percentage)+"%",backgroundPositionX:(100 * event.percentage)+"%"}});
		// box.style.backgroundPositionX = (100 * event.percentage)+"%";
	}
	function onView2Move(event)
	{
		
		var victoria = document.getElementById("victoria");
		TweenLite.killTweensOf(victoria);
		TweenLite.to(victoria,0.5,{css:{top:(300 * event.percentage)+"px"}});
		
	}
	function onView0MoveOut(event)
	{
		
		var box = document.getElementById("heading1");
		var view = document.getElementById("view0");
		TweenLite.to(box,0.5,{css:{top: -(100 * event.percentage)}});
		TweenLite.to(view,0.8,{css:{backgroundPositionY: -300+"px"}});
	}
	function onView0MoveIn(event)
	{
		
		var box = document.getElementById("heading1");
		var view = document.getElementById("view0");
		TweenLite.to(box,0.5,{css:{top: (100 * event.percentage)}});
		TweenLite.to(view,0.8,{css:{backgroundPositionY: (-1 * event.percentage)+"px"}});
	}
	function onViewChange(event)
	{
		console.log(AdvancedParallaxJS.currentIndex);
	}
	Main();
}
)(window); 