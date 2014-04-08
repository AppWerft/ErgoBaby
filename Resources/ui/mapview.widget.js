exports.create = function(pois, RATIO) {
	Ti.Map = require('ti.map');
	var annotations1 = annotations2 = [];
	var self = Ti.Map.createView({
		mapType : Ti.Map.TERRAIN_TYPE,
		enableZoomControls : false,
		top : 0,
		region : {
			latitude : 53.5270540,
			longitude : 10,
			latitudeDelta : 2,
			longitudeDelta : 2
		},
		animate : false,
		height : RATIO,
		backgroundColor : 'orange',
		userLocation : true
	});
	Ti.UI.createNotification({
		message : 'Adding of ' + pois.length + ' vendors'
	}).show();
	self.addEventListener('complete', function() {
		for (var i = 0; i < pois.length && i < 100; i++) {
			var p = pois[i];
			annotations1.push(Ti.Map.createAnnotation({
				latitude : p.lat,
				longitude : p.lng,
				title : p.title,
				image : '/assets/appicon.png',
				subtitle : p.address.replace(/\n/g, ' '),
				itemId : JSON.stringify(p)
			}));
		}
		self.addAnnotations(annotations1);
		/*setTimeout(function() {
			for (var i = 100; i < pois.length; i++) {
				var p = pois[i];
				annotations2.push(Ti.Map.createAnnotation({
					latitude : p.lat,
					longitude : p.lng,
					title : p.title,
					image : '/assets/appicon.png',
					subtitle : p.address.replace(/\n/g, ' '),
					itemId : JSON.stringify(p)
				}));
			}
			self.addAnnotations(annotations2);
			self.selectAnnotation(annotations1[0]);
		}, 2000);
		*/
	});
	self.addEventListener('click', function(_e) {
		if (_e.annotation && (_e.clicksource != 'pin')) {
			require('ui/vendorpath2.window').create(JSON.parse(_e.annotation.itemId)).open();
		}
	});

	return self;
};
