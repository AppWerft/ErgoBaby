exports.create = function(_product) {
	var w = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
	var h = w / 1.9;
	var self = require('vendor/window').create({
		title : _product.title
	});
	self.topview = Ti.UI.createView({
		top : 0,
		width : w,
		height : h
	});
	self.add(self.topview);
	if (!_product.bigimage)
		return self;
	if (Ti.android) {
		var titouchgallery = require("com.gbaldera.titouchgallery");

		var bigimg = titouchgallery.createTouchGallery({
			images : [_product.bigimage],
			top : 0,
			width : w,

			currentPage : 0
		});
	} else
		var bigimg = Ti.UI.createImageView({
			image : _product.bigimage,
			top : 0,
			width : w,
		});
	self.topview.add(bigimg);
	var description = Ti.UI.createLabel({
		text : _product.description,
		width : Ti.UI.FILL,
		top : h + 5,
		color : 'black',
		left : '10dp',
		right : '10dp',
		font : {
			fontFamily : 'Centabel Book'
		}
	});
	self.add(description);
	Ti.Android && self.addEventListener('open', function() {
		var abextras = require('com.alcoapps.actionbarextras');

		var activity = self.getActivity();
		if (!activity.actionBar)
			return;
		abextras.setExtras({
			subtitle : _product.color
		});
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
	return self;
};
