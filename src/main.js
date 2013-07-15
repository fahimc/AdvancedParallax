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
		AdvancedParallaxJS.addListener("view1",AdvancedParallaxJS.events.ON_VIEW_SCROLL_DOWN,onView1Move);
		AdvancedParallaxJS.addListener("view1",AdvancedParallaxJS.events.ON_VIEW_SCROLL_UP,onView1Move);
		
		AdvancedParallaxJS.addListener("view2",AdvancedParallaxJS.events.ON_VIEW_SCROLL_DOWN,onView2Move);
		AdvancedParallaxJS.addListener("view2",AdvancedParallaxJS.events.ON_VIEW_SCROLL_UP,onView2Move);
		
		// AdvancedParallaxJS.addListener("view0",AdvancedParallaxJS.events.ON_VIEW_SCROLL_DOWN,onView0Move);
		AdvancedParallaxJS.addListener("view0",AdvancedParallaxJS.events.ON_VIEW_SCROLL_UP,onView0MoveOut);
		AdvancedParallaxJS.addListener("parallaxHolder",AdvancedParallaxJS.events.ON_VIEW_CHANGE,onViewChange);
		// AdvancedParallaxJS.setView(0,{delay:10})
		
	};
	
	function onView1Move(event)
	{
		//console.log(event.percentage);
		var box = document.getElementById("cardetail");
		box.style.left = (100 * event.percentage)+"%";
		box.style.backgroundPositionX = (100 * event.percentage)+"%";
	}
	function onView2Move(event)
	{
		
		var box = document.getElementById("victoria");
		box.style.top = (100 * event.percentage)+"px";
	}
	function onView0MoveOut(event)
	{
		var box = document.getElementById("heading1");
		box.style.top = -(50 * event.percentage)+"px";
	}
	function onViewChange(event)
	{
		//console.log(event);
	}
	Main();
}
)(window); 