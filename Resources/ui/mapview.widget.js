Ti.Map = require('ti.map');
exports.create = function(pois) {
	var annotations1 = annotations2 = [], done = false;
	var self = Ti.Map.createView({
		mapType : Ti.Map.TERRAIN_TYPE,
		enableZoomControls : false,
		region : {
			latitude : 53.5270540,
			longitude : 10,
			latitudeDelta : 2,
			longitudeDelta : 2
		},
		animate : false,
		userLocation : true
	});
	Ti.UI.createNotification({
			message : 'Adding of dealers'
		}).show();
	self.addEventListener('complete', function() {
		
		for (var i = 0; i < pois.length && i<100; i++) {
			annotations1.push(Ti.Map.createAnnotation({
				latitude : pois[i].lat,
				longitude : pois[i].lng,
				title : pois[i].title,
				image : '/assets/appicon.png',
				subtitle : pois[i].address
			}));
			/*self.addAnnotation(Ti.Map.createAnnotation({
				latitude : pois[i].lat,
				longitude : pois[i].lng,
				title : pois[i].title,
				image : '/assets/appicon.png',
				subtitle : pois[i].address
			}));**/
		}
		self.addAnnotations(annotations1);
		self.selectAnnotation(annotations1[0]);
		setTimeout(function() {
			for (var i = 100; i < pois.length; i++) {
				annotations2.push(Ti.Map.createAnnotation({
					latitude : pois[i].lat,
					longitude : pois[i].lng,
					title : pois[i].title,
					image : '/assets/appicon.png',
					subtitle : pois[i].address
				}));
			}
			self.addAnnotations(annotations2);
		}, 500);
	});

	return self;
};
