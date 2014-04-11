//! function() {
	Ti.App.Twitter = new (require('controls/twitter_adapter'))();
	Ti.App.POIs = new (require('controls/poi.adapter'))();
	require('ui/tabgroup').create();
	//tabgroup.open();
//}();
