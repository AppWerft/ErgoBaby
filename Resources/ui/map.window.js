Ti.Map = require('ti.map');

exports.create = function() {
	var options = arguments[0] || {};
	var ready = false;
	var pins = [];
	var self = Ti.UI.createWindow({
		fullscreen : true
	});
	self.container = Ti.UI.createScrollableView();
	self.add(self.container);
	self.mapview = Ti.Map.createView({
		mapType : Ti.Map.TERRAIN_TYPE,
		enableZoomControls : false,
		region : {
			latitude : 53.5270540,
			longitude : 10,
			latitudeDelta : 5,
			longitudeDelta : 5
		},
		//animate : true,
		//	regionFit : true,
		userLocation : true
	});
	self.listview = Ti.UI.createListView({
		sections : [Ti.UI.createListSection({
			headerTitle : 'Germany'
		})],
		backgroundColor : 'white'
	});

	self.addEventListener('open', function() {
		if (!ready) {
			self.container.addView(self.mapview);
			self.container.addView(self.listview);

			ready = true;
		}
		var pois = require('model/poi').de;
		var annotations = [];
		var ndx = 0;
		for (var i in pois) {
			if (ndx % 10 == 0) {
				annotations.push(Ti.Map.createAnnotation({
					latitude : pois[i].lat,
					longitude : pois[i].lng,
					title : pois[i].title,
					image : '/assets/appicon.png',
					subtitle : pois[i].address
				}));
			}
			ndx++;
		}
		self.mapview.addAnnotations(annotations);
		ndx=0;
		setTimeout(function() {
			annotations = [];
			for (var i in pois) {
				if (ndx % 10 != 0) {
					annotations.push(Ti.Map.createAnnotation({
						latitude : pois[i].lat,
						longitude : pois[i].lng,
						title : pois[i].title,
						image : '/assets/appicon.png',
						subtitle : pois[i].address
					}));
				}
				ndx++;
			}
			self.mapview.addAnnotations(annotations);
		}, 200);
	});
	self.addEventListener('blur', function() {
		//self.mapview.removeAllAnnotations(pins);
	});
	self.mapview.addEventListener('click', function(_e) {
		if (_e.annotation && (_e.clicksource != 'pin')) {
			self.container.scrollToView(1);
		}
	});
	return self;

};

