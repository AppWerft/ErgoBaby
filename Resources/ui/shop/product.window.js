var abextras = require('com.alcoapps.actionbarextras');
var titouchgallery = require("com.gbaldera.titouchgallery");
exports.create = function(_product) {
	var w = Ti.Platform.displayCaps.xdpi;
	var h= w/1.9;
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
	var bigimg = titouchgallery.createTouchGallery({
		images : [_product.bigimage],
		top : 0,
		width : w,
		
		currentPage : 0
	});
	self.topview.add(bigimg);
	var description = Ti.UI.createLabel({
		text : _product.description,
		width : Ti.UI.FILL,
		top : h + 5,
		color : 'black',
		left : '10dp',
		right : '10dp'
	});
	self.add(description);
	self.addEventListener('open', function() {
		if (!Ti.Android)
			return;
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
				icon : '/assets/basket.png'
			}).addEventListener("click", function() {
				Ti.Android && Ti.UI.createNotification({
					message : 'Your basket is empty.'
				}).show();
			});
		};
	});
	return self;
};
