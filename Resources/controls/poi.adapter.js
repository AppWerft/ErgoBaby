var POIs = function() {
	this.poismap = require('model/poi').de;
	Ti.Geolocation.purpose= 'Retriving your position for routing to next vendor.';
	if (Ti.Geolocation.lastGeolocation) {
		this.lastlocation = JSON.parse(Ti.Geolocation.lastGeolocation);
	} else {
		console.log('Info: "lastlocation" empty');
		this.lastlocation = {latitude:53.553,longitude:10.0};
	}	
	var that = this;
	Ti.Geolocation.getCurrentPosition(function(_e) {
		if (_e.success) {
			console.log('Info: location from hardware detected');
			Ti.Android &&Ti.UI.createNotification({
				message : 'Your location detected.'
			}).show();
			that.lastlocation = _e.coords;
			Ti.App.Properties.setObject('LASTLOCATION', _e.coords);
			Ti.App.fireEvent('app:geolocation_ready', _e.coords);
		} else
			console.log('Info: lastlocation error');
	});
	return this;
};

POIs.prototype.getRegion = function(_args) {
	return {
		latitude : parseFloat(_args.lat) / 2 + parseFloat(this.lastlocation.latitude) / 2,
		latitudeDelta : 1.4 * Math.abs(parseFloat(_args.lat) - parseFloat(this.lastlocation.latitude)),
		longitude : (parseFloat(_args.lng) + parseFloat(this.lastlocation.longitude)) / 2,
		longitudeDelta : 1.4 * Math.abs(parseFloat(_args.lng) - parseFloat(this.lastlocation.longitude))
	};
};

POIs.prototype.resolveAddress = function(_country, _callback) {
	var client = Ti.Network.createHTTPClient({
		onload : function() {
			try {
				var json = JSON.parse(this.responseText);
				if (json.status == 'OK') {
					var result =  json.results[0].geometry;
					var region = {
						latitude : result.location.lat,
						longitude : result.location.lng,
						latitudeDelta : Math.abs(result.viewport.northeast.lat - result.viewport.southwest.lat),
						longitudeDelta : Math.abs(result.viewport.northeast.lng - result.viewport.southwest.lng)
					};
					_callback(region);
				}
			} catch (E) {
				console.log('Error: ' + E);
			}
		}
	});
	var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + _country + '&sensor=false';
	client.open('GET', url);
	client.send();
};

POIs.prototype.getRoute = function(_args, _callbacks) {
	var decodeLine = function(encoded) {
		var len = encoded.length;
		var index = 0;
		var array = [];
		var lat = 0;
		var lng = 0;
		while (index < len) {
			var b;
			var shift = 0;
			var result = 0;
			do {
				b = encoded.charCodeAt(index++) - 63;
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);
			var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
			lat += dlat;

			shift = 0;
			result = 0;
			do {
				b = encoded.charCodeAt(index++) - 63;
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);
			var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
			lng += dlng;
			array.push([lat * 1e-5, lng * 1e-5]);
		}
		var points = [];
		for (var i = 0; i < array.length; i++) {
			points.push({
				"latitude" : array[i][0],
				"longitude" : array[i][1]
			});
		}
		return points;
	};
	var client = Ti.Network.createHTTPClient({
		onload : function() {
			var route = JSON.parse(this.responseText).routes[0];
			console.log(route.legs[0]);
			if (route)
				_callbacks.onload({
					steps : route.legs[0].steps,
					meta : route.legs[0].distance.text + '\n' + route.legs[0].duration.text,
					"end_address" : route.legs[0]['end_address'],
					"start_address" : route.legs[0]['start_address'],
					region : {
						latitude : (route.bounds.northeast.lat + route.bounds.southwest.lat) / 2,
						longitude : (route.bounds.northeast.lng + route.bounds.southwest.lng) / 2,
						latitudeDelta : 1.2 * Math.abs(route.bounds.northeast.lat - route.bounds.southwest.lat),
						longitudeDelta : 1.2 * Math.abs(route.bounds.northeast.lng - route.bounds.southwest.lng)
					},

					route : decodeLine(route['overview_polyline'].points)
				});
			else
				_callbacks.onerror();
		}
	});
	var url = 'https://maps.googleapis.com/maps/api/directions/json?language=en&sensor=false'//
	+ '&mode=' + _args.mode// '
	+ '&origin=' + this.lastlocation.latitude + ',' + this.lastlocation.longitude//
	+ '&destination=' + _args.lat + ',' + _args.lng;
	console.log(url);
	client.open('GET', url);
	client.send();
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

