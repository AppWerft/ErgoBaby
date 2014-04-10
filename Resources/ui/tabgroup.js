exports.create = function() {// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	Titanium.UI.setBackgroundColor('#000');
	var self = Titanium.UI.createTabGroup({
		fullscreen : true
	});
	var tab2 = Titanium.UI.createTab({
		title : 'Videos',
		window : require('ui/videos.window').create()
	});
	var tab1 = Titanium.UI.createTab({
		title : 'Vendors'

	});
	var tab0 = Titanium.UI.createTab({
		title : 'Shop'

	});

	var tab4 = Titanium.UI.createTab({
		title : 'Twitter'

	});
	var tab5 = Titanium.UI.createTab({
		title : 'Pinterest'
	});
	var tab6 = Titanium.UI.createTab({
		title : 'facebook'
	});
	self.addTab(tab2);
	self.addTab(tab0);
	self.addTab(tab1);
	self.addTab(tab5);
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
			e.menu.add({
				title : 'Basket',
				showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				icon : Ti.App.Android.R.drawable.ic_action_basket
			}).addEventListener("click", function() {
				Ti.Android && Ti.UI.createNotification({
					message : 'Your basket is empty.'
				}).show();
			});
		};
	});
	self.addEventListener('open', function() {
		tab0.window = require('ui/shop/window').create();
		tab1.window = require('ui/vendorsmapandlist.window').create();
		tab4.window = require('ui/twitter/window').create();
		tab5.window = require('ui/pinterest.window').create();
		tab6.window = require('ui/facebook.window').create();
	});
	return self;
};
