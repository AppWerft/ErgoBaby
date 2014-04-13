var DEFAULTCOUNTRY = 'Germany';

exports.create = function() {
	var self = Ti.UI.createScrollView({
		top : 0,
		scrollType : 'horizontal',
		layout : 'horizontal',
		backgroundColor : '#333',
		horizontalWrap : false,
		height : 44,
		contentHeight : 44,
		width : Ti.UI.FILL,
		touchEnabled : false,
		contentWidth : Ti.UI.SIZE,
		touchEnabled : true,
	});
	var dir = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, '/assets/flags/').getDirectoryListing();
	var flags = [];
	for (var i = 0; i < dir.length; i++) {
		var country = dir[i].replace(/\.png$/, '');
		flags[i] = Ti.UI.createImageView({
			top : -10,
			left : 0,
			width : 64,
			right : 2,
			height : 44,
			opacity : (country == DEFAULTCOUNTRY) ? 1 : 0.9,
			image : '/assets/flags/' + dir[i],
			country : country,
			borderWidth : 0,
			borderColor : (country == DEFAULTCOUNTRY) ? 'white' : 'black',
		});
		self.add(flags[i]);
	}
	self.addEventListener('click', function(_e) {
		Ti.Android && Ti.UI.createNotification({
			message : _e.source.country
		}).show();
		for (var i = 0; i < flags.length; i++) {
			flags[i].borderColor = 'black';
			flags[i].opacity = 0.5;
		}
		_e.source.opacity = 1;
		_e.source.borderColor = 'white';

		Ti.App.POIs.resolveAddress(_e.source.country, function(_region) {
			self.fireEvent('flagclick', {
				country : _e.source.country,
				region : _region
			});
		});
	});
	return self;
};
