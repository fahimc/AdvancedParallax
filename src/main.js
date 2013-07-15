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
		AdvancedParallaxJS.addListener("view1",AdvancedParallaxJS.events.ON_VIEW_SCROLL_DOWN,onViewMove);
		AdvancedParallaxJS.addListener("view1",AdvancedParallaxJS.events.ON_VIEW_SCROLL_UP,onViewMove);
		AdvancedParallaxJS.addListener("parallaxHolder",AdvancedParallaxJS.events.ON_VIEW_CHANGE,onViewChange);
		// AdvancedParallaxJS.setView(0,{delay:10})
		
	};
	
	function onViewMove(event)
	{
		var box = document.getElementById("box");
		box.style.left = (300 * event.percentage)+"px";
	}
	function onViewChange(event)
	{
		//console.log(event);
	}
	Main();
}
)(window); 