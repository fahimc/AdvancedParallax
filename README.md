AdvancedParallax
================
#Usage

##In the HTML

Include the following scripts:

```
<script type="text/javascript" src="lib/com/greensock/TweenLite.js"></script> 
<script type="text/javascript" src="lib/com/greensock/plugins/CSSPlugin.js"></script>
<script type="text/javascript" src="lib/com/greensock/plugins/CSSRulePlugin.js"></script>
<script type="text/javascript" src="lib/com/greensock/plugins/ScrollToPlugin.js"></script> 
<script type="text/javascript" src="lib/com/greensock/easing/EasePack.js"></script> 
<script type="text/javascript" src="src/AdvanceParallax.js"></script>
```

Inside the **BODY** tag place a DIV with the ID set to 'parallaxHolder' then add you pages wrapped in a DIV. Give each holding/wrapping DIV an attribute called **'out'** set the percentage of page scroll you wish to scroll out of that DIV. For Example if you set it to '0.1' at 1- percentage of the page scroll the DIV will move out.

###Example:

```
<body>
		<div id="parallaxHolder">
			<div id="view0"  class="red" out="0.01" >
				
				
			</div>
			<div id="view2" class="green"  out="0.3">
				
			</div>
               </div>
...
```

##In the CSS

Include the CSS classes for the scrollbar:

```
.scroller
{
	border: 1px solid 000;
	background-color: #efefef;
}
.scrollerhandle
{
	border: 1px solid 000;
	background-color: #cdcdcd;
	cursor: pointer;
}
```

## In a JavaScript File

Inside a JS file create a method to detect when the page has loaded and call the 'init' method:

```
AdvancedParallaxJS.init();
```

#API

##Listen to When a Section Scrolls IN or OUT

You need to add a listener to the scroll in and scroll out events. Give your wrapping/holding DIV an ID then pass it into the 'addListener' method followed by the event name and the callback method.

###addListener Parameters
```
addListener(elementID:String,eventName:String,callback:Function);
```

###Event names
ON_VIEW_SCROLL_IN: to listen to a section scrolling in.
ON_VIEW_SCROLL_OUT: to listen to a section scrolling out.

### Scroll IN/OUT Returns
```
{
percentage:Number,
outPercentage:Number,
inPercentage:Number
}
```

percentage: The percentage of how much the section is in or out of view.  
outPercentage: scroll percentage of when the view will go out.  
inPercentage: scroll percentage of when the view will come in.  

###Example:
```
AdvancedParallaxJS.addListener("view1",AdvancedParallaxJS.events.ON_VIEW_SCROLL_IN,onView1Move);

function onView1Move(event)
{
}
```

##Listen to When a Section Changes

You need to add a listener to check when the section has changed. You will pass in the holder ID as the element ID.

###addListener Parameters
```
addListener(elementID:String,eventName:String,callback:Function);
```

###Event name
ON_VIEW_CHANGE: listen to when a view changes.

### View Change Returns
```
{
targetID:String,
index:Number
}
```

targetID: is the ID of the holder.  
index: is the index of the current section.  

###Example:

```
AdvancedParallaxJS.addListener("parallaxHolder",AdvancedParallaxJS.events.ON_VIEW_CHANGE,onViewChange);
function onViewChange(event)
{
	console.log(AdvancedParallaxJS.currentIndex);
}
```

##Enable and Disable Page Scrolling

To disable or enable the scrollbar you can call a method called 'setScrollerState' and pass in the state.

###setScrollerState Method
```
AdvancedParallaxJS.setScrollerState(state:String)
```

###States
'enable': to enable the scrollbar.
'disable':to disable the scrollbar.

###Example:

```
AdvancedParallaxJS.setScrollerState("disable");
```

##Auto Scroll to a Section
To scroll to a particular section you can use the 'navigateTo' method. You need to provide the index of the section and the speed you wish to goto that section. You can get the child index if you have a deep link name (See getChildIndexByName method).

###navigateTo parameters
```
AdvancedParallaxJS.navigateTo(index:Number,speed:Number);
```

## Get Section Index by Deep link Name
You can obtain the section index if you specify a deep link name. To set a deep link name add an attribute called 'data-pagename' the a section can provide a string value as the name.

Example:

```
<div id="view1" class="blue"  data-out="0.6" data-pagename="Car_Detail">   
```  

Then you can use the 'getChildIndexByName' method to obtain the index.

Example:

```  
var index = AdvancedParallaxJS.getChildIndexByName('Car_Detail');
console.log(index);
```  
