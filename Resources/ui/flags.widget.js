var DEFAULTCOUNTRY = 'Germany';

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
	var flags = [];
	for (var i = 0; i < dir.length; i++) {
		var country = dir[i].replace(/\.png$/, '');
		flags[i] = Ti.UI.createImageView({
			top : 0,
			left : 0,
			width : '60dp',
			right : '2dp',
			height : '50dp',
			opacity : (country == DEFAULTCOUNTRY) ? 1 : 0.5,
			image : '/assets/flags/' + dir[i],
			country : country
		});
		self.add(flags[i]);
	}
	self.addEventListener('click', function(_e) {
		Ti.UI.createNotification({
			message : _e.source.country
		}).show();
		for (var i = 0; i < flags.length; i++)
			flags[i].opacity = 0.5;
		_e.source.opacity = 1;
		Ti.App.POIs.resolveAddress(_e.source.country, function(_region) {
			self.fireEvent('flagclick', {
				country : _e.source.country,
				region : _region
			});
		});
	});
	return self;
};
