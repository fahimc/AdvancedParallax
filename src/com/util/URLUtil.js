var URLUtil =function()
{
	this.checkDeepLink=function()
	{
		 var pageName = location.hash.replace("#","");
		 if(pageName)
		 {
		 	return pageName;
		 }
	}
};
