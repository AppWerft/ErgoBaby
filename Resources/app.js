! function() {
	Ti.App.Twitter = new (require('controls/twitter_adapter'))();
	require('ui/tabgroup').create().open();
}();
