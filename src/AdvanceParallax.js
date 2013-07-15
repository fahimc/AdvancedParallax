var AdvancedParallaxJS = {
	scrollbar : null,
	scrollhandle : null,
	scrollhandleHeight : 20,
	scrollbarWidth : 20,
	scrollPosition : 0,
	options : {

	},
	id : {
		parallaxHolder : "parallaxHolder"
	},
	currentIndex : 0,
	children : [],
	init : function() {

		this.holder = document.getElementById(this.id.parallaxHolder)
		if (this.holder) {
			this.createScroller();
			this.setChildren(true);
			this.setHolder();
			var root = this;
			Utensil.addListener(window, "resize", function() {
				root.resize();
			});
			Utensil.addListener(window, "scroll", function() {
				root.onScroll();
			});
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
		this.scrollbar.className = "scroller";
		document.body.appendChild(this.scrollbar);

		this.scrollhandle = document.createElement("div");
		this.scrollhandle.style.position = "absolute";
		this.scrollhandle.style.top = "0";
		this.scrollhandle.style.width = this.scrollbarWidth + "px";
		this.scrollhandle.style.height = this.scrollhandleHeight + "px";
		this.scrollhandle.style.zIndex = "999";
		this.scrollhandle.className = "scrollerhandle";

		this.scrollbar.appendChild(this.scrollhandle);

		var root = this;
		Utensil.addListener(this.scrollbar, "mousedown", function(event) {
			root.scrollerMouseDown(event);
		});
		Utensil.addListener(document, "mouseout", function(event) {
			root.mouseLeave(event);
		});

		//mousewheel
		var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"//FF doesn't recognize mousewheel as of FF3.x

		if (document.attachEvent)//if IE (and Opera depending on user setting)
			document.attachEvent("on" + mousewheelevt,  function(event) {
			root.mouseWheel(event);
		});
		else if (document.addEventListener)//WC3 browsers
			document.addEventListener(mousewheelevt,  function(event) {
			root.mouseWheel(event);
		}, false);

	},
	scrollerMouseDown : function() {
		
		var root = this;
		Utensil.addListener(document.body, "mouseup", AdvancedParallaxJS.scrollerMouseUp);
		Utensil.addListener(document.body, "mousemove", AdvancedParallaxJS.scrollerMouseMove);
	},
	scrollerMouseUp : function() {
		
		Utensil.removeListener(document.body, "mouseup", AdvancedParallaxJS.scrollerMouseUp);
		Utensil.removeListener(document.body, "mousemove", AdvancedParallaxJS.scrollerMouseMove);
	},
	mouseLeave : function(event) {
		if (event.toElement == null && event.relatedTarget == null)
			this.scrollerMouseUp(event);
	},
	mouseWheel : function(event) {
		
		var delta = event.detail ? event.detail * (-120) : event.wheelDelta//check for detail first so Opera uses that instead of wheelDelta
		this.scrollPosition += delta>0?10:-10;
		if(this.scrollPosition <0)this.scrollPosition =0;
		this.moveHandle();
	},
	scrollerMouseMove : function(event) {
		AdvancedParallaxJS.scrollPosition = Utensil.mouseY(document.body, event);

		AdvancedParallaxJS.moveHandle();
		
	},
	moveHandle : function() {
		this.scrollhandle.style.top = ((this.scrollPosition > Utensil.stageHeight() - this.scrollhandleHeight) ? Utensil.stageHeight() - this.scrollhandleHeight : this.scrollPosition) + "px";
		this.moveView();
	},
	moveView:function()
	{
		//current position
		var cpos = this.currentScrollPercentage() *100;
		
		
		for(var a=0;a<this.children.length;a++)
		{
			var child = this.children[a];
			if(child.getAttribute && child.getAttribute("in"))
			{
				var show = Number(child.getAttribute("in"))*100;
				var end = Number(child.getAttribute("out"))*100;
				var showPer =((show-(show-cpos))/show);
				var endPer =((end-(end-cpos))/end);
				// if(child.className=="green")
				// {
					// console.log(child.className,cpos,showPer);
					// console.log(Utensil.stageHeight(),(Utensil.stageHeight() * a),(Utensil.stageHeight() * a)-(Utensil.stageHeight() * a)*showPer);
				// }
				// if(show>0 && showPer<=1 )child.style.top =  (Utensil.stageHeight() * a)-(child.clientHeight *showPer )+"px";
				if(show>0 && showPer<=1 )child.style.top =  ((Utensil.stageHeight() * a)-(Utensil.stageHeight() * a)*showPer)+"px";
				// if(endPer>1)child.style.top =  (Utensil.stageHeight())-(child.clientHeight *endPer )+"px";
				if(endPer>1)child.style.top =  ((Utensil.stageHeight() * a)-(Utensil.stageHeight() * a)*endPer)+"px";
				if(showPer>=1)console.log(child.className,showPer);
				
			}
		}
		//this.children[this.currentIndex].style.top = -(this.children[this.currentIndex].clientHeight *per )+"px";
	},
	setChildren : function(add) {
		var count=0;
		for (var a = 0; a < this.holder.childNodes.length; a++) {
			var child = this.holder.childNodes[a];
			if (child.tagName && child.tagName == "DIV") {
				
				child.style.width = (Utensil.stageWidth() - this.scrollbarWidth) + "px";
				child.style.position = "absolute";
				child.style.overflow = "hidden";
				child.style.top = ((count==0)?0:Utensil.stageHeight())  + "px";
				//child.style.zIndex = this.holder.childNodes.length - a;
				child.style.height = Utensil.stageHeight() + "px";
				if (add)
					this.children.push(child);
				count++;
			}
		}
	},
	setHolder : function() {
		this.holder.style.width = "100%";
		this.holder.style.height = "100%";
		this.holder.style.position = "relative";
		// this.holder.style.height = (this.children.length * Utensil.stageHeight()) + "px";

	},
	
	
	currentScrollPercentage : function() {
		
		return Number(this.scrollPosition / (Utensil.stageHeight())).toFixed(2);
	},
	resize : function() {
		this.setChildren();
	}
}
