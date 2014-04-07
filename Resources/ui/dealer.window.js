Ti.Map = require('ti.map');
var Draggable = require('ti.draggable');

exports.create = function(_args) {
	var route = null;
	console.log('displayCaps.ydpi=' + Ti.Platform.displayCaps.ydpi);

	function addRoute2Map(mode) {
		if (route) {
			self.mapview.removeRoute(route);
			route = null;
		}
		Ti.App.POIs.getRoute({
			lat : _args.lat,
			lng : _args.lng,
			mode : mode || 'driving'
		}, {
			onload : function(_res) {
				var routeoptions = {
					color : '#009900',
					width : 10,
					points : _res.route,
				};

				route = Ti.Map.createRoute(routeoptions);
				self.mapview.addRoute(route);
			},
			onerror : function() {
			}
		});

	}

	var self = require('vendor/window').create({
		title : _args.title,
		layout : 'vertical'
	});
	var region = Ti.App.POIs.getRegion({
		lat : _args.lat,
		lng : _args.lng
	});
	self.mapview = Ti.Map.createView({
		mapType : Ti.Map.NORMAL_TYPE,
		enableZoomControls : false,
		region : region,
		userLocationButton : false,
		top : 0,
		animate : false,
		height : '80%',
		userLocation : true
	});

	self.mapview.addAnnotation(Ti.Map.createAnnotation({
		latitude : _args.lat,
		longitude : _args.lng,
		image : '/assets/appicon.png'
	}));

	self.listview = Ti.UI.createListView({
		top : 0,
		headerTitle : 'Title',
		footerTitle : 'footerTitle',
		borderWidth : 1,
		height : Ti.UI.FILL,
		borderColor : 'red'
	});
	self.add(self.mapview);
	self.add(self.listview);
	addRoute2Map('driving');
	var horizontal = Draggable.createView({
		left : 0,
		center : {
			x : '50%',
			y : '80%'
		},
		minTop : '50dp',
		width : Ti.UI.FILL,
		height : '50dp',
		axis : 'y'
	});
	horizontal.add(Ti.UI.createView({
		backgroundColor : 'gray',
		touchEnabled : false,
		height : '3dp'
	}));
	horizontal.add(Ti.UI.createImageView({
		right : '10dp',
		image : '/assets/ergobaby.png',
		height : Ti.UI.FILL,
		touchEnabled : false
	}));
	horizontal.addEventListener('move', function(e) {
		var ratio = 100 * e.center.y / (Ti.Platform.displayCaps.logicalDensityFactor * Ti.Platform.displayCaps.ydpi - 48);
		console.log(ratio);
		self.mapview.setHeight(e.center.y / Ti.Platform.displayCaps.logicalDensityFactor);
		//	self.listviewcontainer.setHeight(Ti.Platform.displayCaps.ydpi - e.center.y / Ti.Platform.displayCaps.logicalDensityFactor);

	});
	horizontal.addEventListener('start', function(e) {
		region = self.mapview.getRegion();
	});
	horizontal.addEventListener('end', function(e) {
		self.mapview.setRegion(region);
	});
	self.add(horizontal);

	self.addEventListener('open', function() {
		var activity = self.getActivity();
		activity.onCreateOptionsMenu = function(e) {
			if (e.actionBar) {
			}
			var clearAllChecked = function() {
				return;
				var items = e.menu.getItems(), item;
				while ( item = items.pop()) {
					item.setChecked(false);
				}
			};
			e.menu.add({
				title : "Driving",
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
				itemId : 0,
				checked : true,
				visible : true
			}).addEventListener("click", function() {
				clearAllChecked();
				e.menu.getItem(0).checked = true;
				addRoute2Map('driving');
			});
			e.menu.add({
				title : "Walking",
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
				itemId : 1,
				checked : false,
				visible : true
			}).addEventListener("click", function() {
				clearAllChecked();
				e.menu.getItem(1).checked = true;
				addRoute2Map('walking');
			});
			e.menu.add({
				title : "Bicycling",
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
				itemId : 2,
				checked : false
			}).addEventListener("click", function() {
				clearAllChecked();
				e.menu.getItem(2).checked = true;
				addRoute2Map('bicycling');
			});

		};
	});
	console.log('H=' + self.getRect().height);
	return self;
};
