exports.create = function() {// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	Titanium.UI.setBackgroundColor('#000');
	var self = Titanium.UI.createTabGroup({
		fullscreen : true
	});
	var tab1 = Titanium.UI.createTab({
		title : 'Dealer',
		window : require('ui/map.window').create()
	});
	var tab2 = Titanium.UI.createTab({
		title : 'Videos',
		window : require('ui/videos.window').create()
	});
	var win3 = Titanium.UI.createWindow({
		backgroundColor : '#fff'
	});
	var tab3 = Titanium.UI.createTab({
		title : 'Blog',
		window : win3
	});
	var tab4 = Titanium.UI.createTab({
		title : 'Twitter',
		window : require('ui/twitter/window').create()
	});
	var tab5 = Titanium.UI.createTab({
		title : 'Pinterest',
		window : require('ui/pinterest.window').create()
	});
	var tab6 = Titanium.UI.createTab({
		title : 'facebook',
		window : require('ui/facebook.window').create()
	});
	self.addTab(tab2);
	self.addTab(tab5);
	self.addTab(tab1);
	self.addTab(tab4);
	self.addTab(tab6);
	self.addEventListener('open', function() {
		if (!Ti.Android)
			return;
		var activity = self.getActivity();
		if (!activity.actionBar)
			return;
		activity.actionBar.setDisplayHomeAsUp(false);
		activity.actionBar.setTitle(' ErgoBaby');
		activity.onCreateOptionsMenu = function(e) {
		};

	});
	return self;
	// open tab group
};
