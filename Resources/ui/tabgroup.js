exports.create = function() {// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	var self = Ti.UI.createTabGroup({
		fullscreen : true

	});
	var tab1 = Ti.UI.createTab({
		title : 'Videos',
		icon : '/assets/46-movie-2.png',
		window : require('ui/videos.window').create({
			title : 'Videos'
		})
	});
	tab1.addEventListener('hidetabgroup!', function() {
		self.setBottom(-50);
	});
	tab1.addEventListener('showtabgroup!', function() {
		self.bottom = 0;
	});
	var tab2 = Ti.UI.createTab({
		title : 'Shop',
		icon : '/assets/76-baby.png',
		window : require('ui/shop/categoryselector.window').create({
			title : 'Shop'
		})
	});
	var tab3 = Ti.UI.createTab({
		title : 'Vendors',
		icon : '/assets/73-radar.png',
		window : require('ui/vendorsmapandlist.window').create({
			title : 'Vendors'
		})
	});
	var tab4 = Ti.UI.createTab({
		title : 'Pinterest',
		icon : '/assets/pinterest_icon.png',
		window : require('ui/pinterest.window').create({
			title : 'Pinterest'
		})
	});
	var tab5 = Ti.UI.createTab({
		title : 'Twitter',
		icon : '/assets/210-twitterbird.png',
		window : require('ui/twitter/window').create({
			title : 'Twitter'
		})
	});
	var tab6 = Ti.UI.createTab({
		title : 'facebook',
		window : require('ui/facebook.window').create()
	});
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);
	self.addTab(tab5);
	//self.addTab(tab6);
	self.open();
	self.setActiveTab(1);
	Ti.Android && self.addEventListener('open', function() {
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
};
