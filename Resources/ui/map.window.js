Ti.Map = require('ti.map');

exports.create = function() {
	var options = arguments[0] || {};
	var ready = false;
	var pins = [];
	var self = Ti.UI.createWindow({
		fullscreen : true
	});
	self.mapview = Ti.Map.createView({
		mapType : Ti.Map.TERRAIN_TYPE,
		enableZoomControls : false,
		region : {
			latitude : 53.5270540,
			longitude : 10,
			latitudeDelta : 5,
			longitudeDelta : 5
		},
		animate : true,
		regionFit : true,
		userLocation : true
	});
	self.mapview.addEventListener('complete', function() {
	});
	self.addEventListener('open', function() {
		if (!ready) {
			self.add(self.mapview);
			ready = true;
		}
		var pois = require('model/poi').de;
		var annotations = [];
		for (var i in pois) {
			annotations.push(Ti.Map.createAnnotation({
				latitude : pois[i].lng,
				longitude : pois[i].lat,
				title : pois[i].title,
				image : '/appicon.png',
				subtitle : pois[i].address
			}));
		}
		self.mapview.addAnnotations(annotations);
	});
	self.addEventListener('blur', function() {
		//self.mapview.removeAllAnnotations(pins);
	});
	self.mapview.addEventListener('click', function(_e) {
		if (_e.annotation && (_e.clicksource == 'rightPane' || _e.clicksource == 'title' || _e.clicksource == 'subtitle')) {
		}
	});
	return self;

};

