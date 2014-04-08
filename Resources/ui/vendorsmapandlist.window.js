exports.create = function() {
	var RATIO = '70%';
	var options = arguments[0] || {};
	var pois = Ti.App.POIs.getAll();
	var self = Ti.UI.createWindow({
		fullscreen : true
	});
	self.container = Ti.UI.createView({
		bottom : '50dp',
		height : Ti.UI.FILL
	});
	self.mapview = require('ui/mapview.widget').create(pois, RATIO);
	console.log('Info: mapview_widget created');
	self.listview = require('ui/vendors.listview').create(pois, RATIO);
	console.log('Info: listview_widget created');
	self.addEventListener('open', function() {
		console.log('Info: mapwindow opened, try to add mapview to window');
		if (self.mapview)
			self.container.add(self.mapview);
		console.log('Info: mapwindow opened, try to add listview to window');
		if (self.listview)self.container.add(self.listview);
	});
	self.container.add(require('ui/viewslider.widget').create(RATIO, {
		onmove : function(RATIO) {
			self.mapview.setHeight(RATIO);
			self.listview.setTop(RATIO);
		},
		onstart : function() {
			region = self.mapview.getRegion();
		},
		onend : function() {
			self.mapview.setRegion(region);
		}
	}));
	self.add(self.container);
	self.countries = require('ui/flags.widget').create();
	self.add(self.countries);
	self.countries.addEventListener('flagclick', function(_res) {
		self.mapview.setRegion(_res.region);
	});
	return self;
};

