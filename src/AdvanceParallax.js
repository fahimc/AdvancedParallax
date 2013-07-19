var AdvancedParallaxJS = {
	scrollbar : null,
	scrollhandle : null,
	scrollhandleHeight : 20,
	scrollbarWidth : 20,
	scrollPosition : 0,
	scrollPositionPrevious : 0,
	navigateTimer : null,
	moveIndex : 0,
	moveDirection : 0,
	options : {

	},
	id : {
		parallaxHolder : "parallaxHolder"
	},
	events : {
		ON_VIEW_SCROLL_IN : "ON_VIEW_SCROLL_IN",
		ON_VIEW_SCROLL_OUT : "ON_VIEW_SCROLL_OUT",
		ON_VIEW_CHANGE : "ON_VIEW_CHANGE"
	},
	classNames : {
		scroller : "scroller",
		scrollerHandle : "scrollerhandle"
	},
	states : {
		scroller : {
			state : "enable",
			DISABLED : "disable",
			ENABLED : "enable"
		}
	},
	att:
	{
		pageName:"data-pagename"
	},
	handlers : [],
	callbacks : [],
	currentIndex : 0,
	children : [],
	mousewheelevt : ((/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"),
	init : function() {

		this.holder = document.getElementById(this.id.parallaxHolder);

		//set handlers
		var root = this;

		this.handlers["mousedown"] = function(event) {
			root.scrollerMouseDown(event);
		};

		this.handlers["mouseout"] = function(event) {
			root.mouseLeave(event);
		};

		this.handlers["mousewheel"] = function(event) {
			root.mouseWheel(event);
		}
		//set page
		if (this.holder) {
			this.createScroller();
			this.addScrollerListeners();
			this.setChildren(true);
			this.setHolder();
			var root = this;
			Utensil.addListener(window, "resize", function() {
				root.resize();
			});
			document.body.ondragstart = function(e) {
				return false;
			};
			this.resize();

		}

	},
	createScroller : function() {
		document.body.style.overflow = "hidden";

		this.scrollbar = document.createElement("div");
		this.scrollbar.style.position = "absolute";
		this.scrollbar.style.top = "0";
		this.scrollbar.style.right = "0";
		this.scrollbar.style.width = this.scrollbarWidth + "px";
		this.scrollbar.style.height = "100%";
		this.scrollbar.style.zIndex = "998";
		this.scrollbar.className = this.classNames.scroller;
		document.body.appendChild(this.scrollbar);

		this.scrollhandle = document.createElement("div");
		this.scrollhandle.style.position = "absolute";
		this.scrollhandle.style.top = "0";
		this.scrollhandle.style.width = this.scrollbarWidth + "px";
		this.scrollhandle.style.height = this.scrollhandleHeight + "px";
		this.scrollhandle.style.zIndex = "999";
		this.scrollhandle.className = this.classNames.scrollerHandle;

		this.scrollbar.appendChild(this.scrollhandle);

	},
	addScrollerListeners : function() {

		Utensil.addListener(this.scrollbar, "mousedown", this.handlers["mousedown"]);
		Utensil.addListener(document, "mouseout", this.handlers["mouseout"]);

		if (document.attachEvent)//if IE (and Opera depending on user setting)
			document.attachEvent("on" + this.mousewheelevt, this.handlers["mousewheel"]);
		else if (document.addEventListener)//WC3 browsers
			document.addEventListener(this.mousewheelevt, this.handlers["mousewheel"], false);
	},
	removeScrollerListeners : function() {

		Utensil.removeListener(this.scrollbar, "mousedown", this.handlers["mousedown"]);
		Utensil.removeListener(document, "mouseout", this.handlers["mouseout"]);

		if (document.detachEvent)//if IE (and Opera depending on user setting)
			document.detachEvent("on" + this.mousewheelevt, this.handlers["mousewheel"]);
		else {
			document.removeEventListener(this.mousewheelevt, this.handlers["mousewheel"]);
		}
	},
	setScrollerState : function(state) {
		if (this.states.scroller.state == state)
			return;
		switch(state) {
			case this.states.scroller.DISABLED:
				this.disableScroller();
				break;
			case this.states.scroller.ENABLED:
				this.enableScroller();
				break;
		}
		this.states.scroller.state = state;
	},
	disableScroller : function() {
		this.removeScrollerListeners();
	},
	enableScroller : function() {
		this.addScrollerListeners();
	},
	addListener : function(viewID, eventName, callback) {
		if (!this.callbacks[eventName])
			this.callbacks[eventName] = [];
		if (!this.callbacks[eventName][viewID])
			this.callbacks[eventName][viewID] = [];
		this.callbacks[eventName][viewID].push(callback);

	},
	removeListener : function(viewID, eventName, callback) {
		if (!this.events[eventName] && this.events[eventName][viewID])
			for (var a = 0; a < this.events[eventName][viewID].length; a++) {
				if (this.events[eventName][viewID][a] == callback) {
					this.events[eventName][viewID].splice(a, 1);
					a = this.events[eventName][viewID].length + 1;
					return;
				}
			}
	},
	scrollerMouseDown : function() {

		var root = this;
		Utensil.addListener(document, "mouseup", AdvancedParallaxJS.scrollerMouseUp);
		Utensil.addListener(document, "mousemove", AdvancedParallaxJS.scrollerMouseMove);
	},
	scrollerMouseUp : function() {

		Utensil.removeListener(document, "mouseup", AdvancedParallaxJS.scrollerMouseUp);
		Utensil.removeListener(document, "mousemove", AdvancedParallaxJS.scrollerMouseMove);
	},
	mouseLeave : function(event) {
		if (event.toElement == null && event.relatedTarget == null)
			this.scrollerMouseUp(event);
	},
	mouseWheel : function(event) {

		var delta = event.detail ? event.detail * (-120) : event.wheelDelta//check for detail first so Opera uses that instead of wheelDelta
		var movement = (Utensil.stageHeight() * 0.01);
		var move = AdvancedParallaxJS.scrollPosition - (delta > 0 ? movement : -movement);
		var endPoint = Utensil.stageHeight() - AdvancedParallaxJS.scrollhandleHeight;
		if (move < 0)
			move = 0;
		if (move > endPoint && AdvancedParallaxJS.scrollPositionPrevious <= move)
			move = Utensil.stageHeight();

		AdvancedParallaxJS.scrollPositionPrevious = AdvancedParallaxJS.scrollPosition;
		AdvancedParallaxJS.scrollPosition = move;
		AdvancedParallaxJS.moveHandle();

		if (event.preventDefault)
			event.preventDefault();
		return false;
	},
	scrollerMouseMove : function(event) {
		AdvancedParallaxJS.scrollPositionPrevious = AdvancedParallaxJS.scrollPosition;
		AdvancedParallaxJS.scrollPosition = Utensil.mouseY(document.body, event);
		AdvancedParallaxJS.setScrollPosition();

	},
	setScrollPosition : function() {
		if (AdvancedParallaxJS.scrollPosition < 0)
			AdvancedParallaxJS.scrollPosition = 0;
		if (AdvancedParallaxJS.scrollPosition > Utensil.stageHeight() - AdvancedParallaxJS.scrollhandleHeight)
			AdvancedParallaxJS.scrollPosition = Utensil.stageHeight();
		AdvancedParallaxJS.moveHandle();
	},
	moveHandle : function() {
		this.scrollhandle.style.top = ((this.scrollPosition >= Utensil.stageHeight() - this.scrollhandleHeight) ? Utensil.stageHeight() - this.scrollhandleHeight : this.scrollPosition) + "px";
		this.moveView();
	},
	moveView : function() {

		//current position
		var cpos = this.currentScrollPercentage();
		var out = Number(this.children[this.currentIndex].getAttribute("data-out"));
		var inVal = Number(this.children[this.currentIndex].getAttribute("in"));
		var viewPercentage = ((cpos * 100) / (out * 100));
		var insidePercentage = (cpos - (inVal)) / (out - inVal);
		var top = 0;
		if (out <= cpos && this.scrollPosition >= this.scrollPositionPrevious || this.scrollPosition < this.scrollPositionPrevious) {
			TweenLite.killTweensOf(this.holder);
			top = ((this.holder.clientHeight - Utensil.stageHeight()) * (cpos));
			TweenLite.to(this.holder, 0.2, {
				css : {
					top : -top + "px"
				}
			});

		} else {

			TweenLite.killTweensOf(this.holder);
			TweenLite.to(this.holder, 0.1, {
				css : {
					top : -(Utensil.stageHeight() * this.currentIndex) + "px"
				}
			});

		}

		var viewChanged = this.updatePageIndex();
		//dispatch on scroll in
		if (insidePercentage >= 0 && insidePercentage <= 1) {
			this.dispatchEvents(this.events.ON_VIEW_SCROLL_IN, this.children[this.currentIndex].id, {
				percentage : insidePercentage.toFixed(2),
				outPercentage : out,
				inPercentage : inVal,
				type : this.events.ON_VIEW_SCROLL_IN
			});
		}
		//dispatch on scroll out
		if (this.scrollPosition < this.scrollPositionPrevious) {

			var ctop = Utensil.stageHeight() * (this.currentIndex);
			insidePercentage = ((ctop - top) / Utensil.stageHeight());

			if (insidePercentage < 0)
				viewPercentage = 0;
			if (insidePercentage > 1)
				viewPercentage = 1;
			this.dispatchEvents(this.events.ON_VIEW_SCROLL_OUT, this.children[this.currentIndex].id, {
				percentage : insidePercentage.toFixed(2),
				outPercentage : out,
				inPercentage : inVal,
				type : this.events.ON_VIEW_SCROLL_OUT
			});
		}
	},
	updatePageIndex : function() {
		var previous = this.currentIndex;
		this.currentIndex = parseInt(Math.abs(Number(this.holder.style.top.replace("px", ""))) / Utensil.stageHeight());

		if (previous != this.currentIndex) {
			this.dispatchEvents(this.events.ON_VIEW_CHANGE, this.id.parallaxHolder, {
				targetID : this.id.parallaxHolder,
				index : this.currentIndex,
				type : this.events.ON_VIEW_CHANGE
			});
			this.children[this.currentIndex].setAttribute("in", this.currentScrollPercentage());
			return true;
		}

		return false;
	},
	navigateTo : function(index, speed) {
		this.setScrollerState("disable");
		this.moveDirection = this.currentIndex <= index ? 1 : -1;
		this.moveIndex = index;
		this.navigateTimer = setInterval(this.autoMove, speed);
	},
	autoMove : function() {
		var root = AdvancedParallaxJS;
		var movement = (Utensil.stageHeight() * 0.01);
		var sp = root.scrollPosition - (root.moveDirection < 0 ? movement : -movement);
		var cpos = Number(sp / (Utensil.stageHeight())).toFixed(2);
		var perOut = Number(root.children[root.moveIndex].getAttribute("data-out"));
		var perIn = Number(root.children[root.moveIndex].getAttribute("in"));
		var pos = (Utensil.stageHeight() * root.moveIndex) / root.holder.clientHeight;
		var sper = root.scrollPosition / Utensil.stageHeight();

		if (cpos >= perOut && root.moveDirection > 0 || sper <= pos && root.moveDirection < 0) {
			root.purgeNavigateTimer();
			if (root.moveDirection > 0)
				return;
			sp = pos * Utensil.stageHeight();
		}
		root.scrollPositionPrevious = root.scrollPosition;
		root.scrollPosition = sp;

		root.setScrollPosition();
	},
	purgeNavigateTimer : function() {
		clearInterval(AdvancedParallaxJS.navigateTimer);
		AdvancedParallaxJS.setScrollerState("enable");

	},
	dispatchEvents : function(eventName, viewID, parameters) {

		if (!this.callbacks[eventName] || !this.callbacks[eventName][viewID])
			return;
		for (var a = 0; a < this.callbacks[eventName][viewID].length; a++) {

			this.callbacks[eventName][viewID][a](parameters);
		}

	},
	setChildren : function(add) {
		var count = 0;
		var previousOut = 0;
		for (var a = 0; a < this.holder.childNodes.length; a++) {
			var child = this.holder.childNodes[a];
			if (child.tagName && child.tagName == "DIV") {
				child.setAttribute("in", previousOut);
				child.setAttribute("data-index", a);
				child.style.width = (Utensil.stageWidth() - this.scrollbarWidth) + "px";
				child.style.overflow = "hidden";
				child.style.height = Utensil.stageHeight() + "px";
				if (add)
					this.children.push(child);
				count++;
				previousOut = child.getAttribute("data-out");
			}
		}
	},
	getChildIndexByName: function(id) {
		
		for (var a = 0; a < this.children.length; a++) {
			if(this.children[a].getAttribute(this.att.pageName) && this.children[a].getAttribute(this.att.pageName)==id)
			return a;
		}
		return null;
	},
	setHolder : function() {
		this.holder.style.width = "100%";
		this.holder.style.position = "relative";

	},

	currentScrollPercentage : function() {

		return Number(this.scrollPosition / (Utensil.stageHeight())).toFixed(2);
	},
	resize : function() {
		this.setChildren();
	}
}
