Ti.Map = require('ti.map');
var Draggable = require('ti.draggable');

exports.create = function(_args) {
	var self = require('vendor/window').create({
		title : _args.title
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
		height : '50%',
		userLocation : true
	});
	self.add(self.mapview);
	self.listview = Ti.UI.createListView({
		top : '50%',
	});
	self.add(self.listview);

	Ti.App.POIs.getRoute({
		lat : _args.lat,
		lng : _args.lng
	}, {
		onload : function(_res) {
			var routeoptions = {
				color : 'red',
				width : '10dp',
				points : _res.route,
			};
			self.mapview.addRoute(Ti.Map.createRoute(routeoptions));
			console.log(_res);
		}
	});
	var horizontal = Draggable.createView({
		left : 0,
		center : {
			x : '50%',
			y : '50%'
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
		self.mapview.setHeight(e.center.y / Ti.Platform.displayCaps.logicalDensityFactor);
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
			});
			e.menu.add({
				title : "Bicycling",
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
				itemId : 2,
				checked : false
			}).addEventListener("click", function() {
				clearAllChecked();
				e.menu.getItem(2).checked = true;
			});
			e.menu.add({
				title : "Transit",
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
				itemId : 3,
				checked : false
			}).addEventListener("click", function() {
				clearAllChecked();
				e.menu.getItem(3).checked = true;
			});
		};
	});
	return self;
};
