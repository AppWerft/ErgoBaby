exports.create = function() {
	var self = Ti.UI.createScrollView({
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
		self.add(Ti.UI.createImageView({
			top : 0,
			left : 0,
			width : '60dp',
			right : '2dp',
			height : '50dp',
			image : '/assets/flags/' + dir[i],
			country : dir[i].replace(/\.png$/, '')
		}));
	}
	self.addEventListener('click', function(_e) {
		Ti.UI.createNotification({
			message : _e.source.country
		}).show();
		Ti.App.POIs.resolveAddress(_e.source.country, function(_region) {
			self.fireEvent('flagclick', {
				country : _e.source.country,
				region : _region
			});
		});
	});
	return self;
};
