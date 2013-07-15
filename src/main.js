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
		
		// AdvancedParallaxJS.setView(0,{delay:10})
		
	};

	Main();
}
)(window); 