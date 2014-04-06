var POIs = function() {
	this.poismap = require('model/poi').de;
	this.lastlocation = null;
	if (Ti.Geolocation.lastGeolocation) {
		console.log('Info: lastlocation detected');
		this.lastlocation = JSON.parse(Ti.Geolocation.lastGeolocation);
	};
	var that = this;
	Ti.Geolocation.addEventListener('location', function(_e) {
		if (_e.success) {
			console.log('Info: location detected');
			Ti.UI.createNotification({
				message : 'Your location detected.'
			}).show();
			that.lastlocation = _e.coords;
		}
	});
	return this;
};

POIs.prototype.getAll = function(_args) {
	var getDistance = function(lat1, lon1, lat2, lon2) {
		var R = 6371000;
		// m (change this constant to get miles)
		var dLat = (lat2 - lat1) * Math.PI / 180;
		var dLon = (lon2 - lon1) * Math.PI / 180;
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		return Math.round(d);
	};
	var pois = [];
	for (var i in this.poismap) {
		pois.push(this.poismap[i]);
	}
	console.log(this.lastlocation);
	if (this.lastlocation == null)
		return pois;
	else {
		for (var i = 0; i < pois.length; i++) {
			pois[i].dist = getDistance(pois[i].lat, pois[i].lng, this.lastlocation.latitude, this.lastlocation.longitude);
		}
		pois.sort(function(a, b) {
			if (a.dist < b.dist) {
				return -1;
			}
			if (a.dist > b.dist) {
				return 1;
			}
			return 0;
		});
		return pois;
	}
};

module.exports = POIs;
