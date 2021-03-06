exports.create = function() {
	var RATIO = '70%', done = false, Map = null;
	var options = arguments[0] || {};
	var pois = Ti.App.POIs.getAll();
	var self = Ti.UI.createWindow({
		title : options.title,barColor : '#CF6500',
		fullscreen : true
	});
	self.container = Ti.UI.createView();
	if (Ti.Android)
		self.container.bottom = 44;
	else
		self.container.top = 44;
	Map = new (require('ui/mapview.widget'))();
	self.mapview = Map.getView('80%');
	self.mapview.setHeight(RATIO);
	self.mapview.setTop(0);
	self.listview = require('ui/vendors.listview').create(self, pois, RATIO);
	self.addEventListener('open', function() {
		console.log('Info: mapwindow opened!');
		if (self.listview)
			self.container.add(self.listview);
	});
	self.addEventListener('focus', function() {
		console.log('Info: mapwindow focused!');
		if (!done) {
			done = true;
			console.log('Info: mapwindow focused, try to add mapview to window');
			self.container.add(self.mapview);
			console.log('Info: mapview added');
			self.mapview.addEventListener('complete', function(_e) {
				Map.addAnnotations(pois);
				console.log(_e);
			});
		}
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
	self.countries = require('ui/flags.widget').create();
	if (Ti.Android) {
		self.add(self.container);
		self.add(self.countries);
		self.countries.top = 0;
	} else {
		self.add(self.countries);
		self.add(self.container);
		self.countries.bottom = 0;
	}
	self.countries.addEventListener('flagclick', function(_res) {
		self.mapview.setRegion(_res.region);
	});
	return self;
};

