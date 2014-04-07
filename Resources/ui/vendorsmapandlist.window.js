exports.create = function() {
	var RATIO = '70%';
	var options = arguments[0] || {};
	var pois = Ti.App.POIs.getAll();
	var self = Ti.UI.createWindow({
		fullscreen : true,
		backgroundColor : 'black'
	});
	self.container = Ti.UI.createView({
		bottom : '50dp',
		height : Ti.UI.FILL
	});
	self.mapview = require('ui/mapview.widget').create(pois, RATIO);
	self.listview = require('ui/vendors.listview').create(pois, RATIO);
	self.addEventListener('open', function() {
		self.container.add(self.mapview);
	});
	self.container.add(self.listview);
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
		console.log(_res);
		self.mapview.setRegion(_res.region);
	});
	return self;
};

