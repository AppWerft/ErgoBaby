exports.create = function() {
	var options = arguments[0] || {};
	var done, pois = Ti.App.POIs.getAll();
	var self = Ti.UI.createWindow({
		fullscreen : true,
		backgroundColor : 'white'
	});
	self.flags = Ti.UI.createScrollView({
		scrollType : 'horizontal',
		layout : 'horizontal',
		backgroundColor : '#333',
		horizontalWrap : false,
		height : '50dp',
		touchEnabled : false,
		bottom : 0
	});
	var dir = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, '/assets/flags/').getDirectoryListing();
	for (var i = 0; i < dir.length; i++) {
		self.flags.add(Ti.UI.createImageView({
			top : 0,
			left : 0,
			width : '60dp',
			right : '2dp',
			height : '50dp',
			image : '/assets/flags/' + dir[i],
			country : dir[i].replace(/\.png$/, '')
		}));
	}
	self.add(self.flags);
	self.container = Ti.UI.createScrollableView({
		bottom : '50dp',
		height : Ti.UI.FILL
	});
	self.add(self.container);
	//self.addEventListener('open', function() {
		if (!done) {
			self.container.addView(require('ui/mapview.widget').create(pois));
			self.container.addView(require('ui/dealer.listview').create(pois));
			self.container.getViews()[0].addEventListener('click', function(_e) {
				if (_e.annotation && (_e.clicksource != 'pin')) {
					self.container.scrollToView(1);
				}
			});
		}
		done = true;
	//});
	self.flags.addEventListener('click', function(_e) {
		Ti.UI.createNotification({
			message : _e.source.country
		}).show();
	});
	return self;
};

