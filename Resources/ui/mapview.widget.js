Ti.Map = require('ti.map');
exports.create = function(pois) {
	var annotations1 = annotations2 = [];
	var self = Ti.Map.createView({
		mapType : Ti.Map.TERRAIN_TYPE,
		enableZoomControls : false,
		region : {
			latitude : 53.5270540,
			longitude : 10,
			latitudeDelta : 1,
			longitudeDelta : 1
		},
		animate : true,
		userLocation : true
	});

	self.addEventListener('complete', function() {
		for (var i = 0; i < pois.length && i < 50; i++) {
			annotations1.push(Ti.Map.createAnnotation({
				latitude : pois[i].lat,
				longitude : pois[i].lng,
				title : pois[i].title,
				image : '/assets/appicon.png',
				subtitle : pois[i].address
			}));
		}
		self.addAnnotations(annotations1);
		self.selectAnnotation(annotations1[0]);

		setTimeout(function() {
			for (var i = 50; i < pois.length; i++) {
				annotations2.push(Ti.Map.createAnnotation({
					latitude : pois[i].lat,
					longitude : pois[i].lng,
					title : pois[i].title,
					image : '/assets/appicon.png',
					subtitle : pois[i].address
				}));
			}
			self.addAnnotations(annotations2);
		}, 5000);
		Ti.Geolocation.addEventListener('location', function(_e) {
			if (_e.coords) {
				self.setRegion({
					latitude : _e.coords.latitude,
					longitude : _e.coords.longitude,
					latitudeDelta : 0.5,
					longitudeDelta : 0.5
				});
			}
		});
	});
	
	return self;
};
