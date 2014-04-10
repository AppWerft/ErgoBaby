Ti.Map = require('ti.map');

var Map = function() {
	this.view = Ti.Map.createView({
		mapType : Ti.Map.TERRAIN_TYPE,
		enableZoomControls : false,
		region : {
			latitude : 53.5270540,
			longitude : 10,
			latitudeDelta : 2,
			longitudeDelta : 2
		},
		animate : true,
		regionfit : true,
		height : '80%',
		userLocationButton : false,
		backgroundColor : 'orange',
		userLocation : true
	});
	console.log('Info: this.view created');
	/*	this.view.addEventListener('click', function(_e) {
	 if (_e.annotation && (_e.clicksource != 'pin')) {
	 require('ui/vendorpath2.window').create(JSON.parse(_e.annotation.itemId)).open();
	 }

	 });*/
	return this;
};

Map.prototype.getView = function() {
	return this.view;
};

Map.prototype.addAnnotations = function(pois) {
	var annotations1 = annotations2 = [],that=this;
	Ti.UI.createNotification({
		message : 'Adding of ' + pois.length + ' vendors'
	}).show();
	for (var i = 0; i < pois.length && i < 100; i++) {
		var p = pois[i];
		annotations1.push(Ti.Map.createAnnotation({
			latitude : p.lat,
			longitude : p.lng,
			title : p.title,
			image :'/assets/'+Ti.Platform.displayCaps.density+'-pin.png',	
			subtitle : p.address.replace(/\n/g, ' '),
			itemId : JSON.stringify(p)
		}));
	}
	this.view.addAnnotations(annotations1);
	setTimeout(function() {
		for (var i = 100; i < pois.length; i++) {
			var p = pois[i];
			annotations2.push(Ti.Map.createAnnotation({
				latitude : p.lat,
				longitude : p.lng,
				title : p.title,
				image : '/assets/'+Ti.Platform.displayCaps.density+'-pin.png',
				subtitle : p.address.replace(/\n/g, ' '),
				itemId : JSON.stringify(p)
			}));
		}
		that.view.addAnnotations(annotations2);
		that.view.selectAnnotation(annotations1[0]);
	}, 2000);
};

module.exports = Map;
