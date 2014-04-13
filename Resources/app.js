! function() {
	Ti.App.Twitter = new (require('controls/twitter_adapter'))();
	Ti.App.POIs = new (require('controls/poi.adapter'))();
	Ti.UI.backgroundColor = '#ddd';
	require('ui/tabgroup').create();
	//tabgroup.open();
}();
