exports.create = function(_ratio,_callbacks) {
	var self = require('ti.draggable').createView({
		left : 0,zIndex:999,
		center : {
			x : '50%',
			y : _ratio
		},
		minTop : '50dp',
		maxTop : Ti.Platform.displayCaps.ydpi,
		width : Ti.UI.FILL,
		height : '50dp',
		axis : 'y'
	});
	self.add(Ti.UI.createView({
		backgroundColor : 'gray',
		touchEnabled : false,
		height : '1dp'
	}));
	self.add(Ti.UI.createImageView({
		right : '10dp',zIndex:1999,
		image : '/assets/ergobaby.png',
		height : Ti.UI.FILL,
		touchEnabled : false
	}));
	self.addEventListener('move', function(e) {
		_callbacks.onmove(e.center.y / Ti.Platform.displayCaps.logicalDensityFactor);
	});
	self.addEventListener('start', function(e) {
		_callbacks.onstart();
	});
	self.addEventListener('end', function(e) {
		_callbacks.onend();
	});
	return self;
};
