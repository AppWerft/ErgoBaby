Ti.Map = require('ti.map');
exports.create = function(_args) {
	var route = null;
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
				Ti.Android && Ti.UI.createNotification({
					message : _res.meta
				}).show();
				var routeoptions = {
					color : '#009900',
					width : 2 + parseInt(500 / Ti.Platform.displayCaps.dpi * Ti.Platform.displayCaps.logicalDensityFactor, 10),
					points : _res.route,
				};
				route = Ti.Map.createRoute(routeoptions);
				self.mapview.setRegion(_res.region);
				self.mapview.addRoute(route);
			},
			onerror : function() {
			}
		});
	}

	var self = require('vendor/window').create({
		title : _args.title
	});
	self.mapview = Ti.Map.createView({
		mapType : Ti.Map.NORMAL_TYPE,
		enableZoomControls : false,
		region : Ti.App.POIs.getRegion({
			lat : _args.lat,
			lng : _args.lng
		}),
		userLocationButton : false,
		animate : true,
		height : '80%',
		top : 0,
		userLocation : true
	});
	self.mapview.addEventListener('complete', function() {
		self.mapview.setHeight('80%');
	});
	self.mapview.addAnnotation(Ti.Map.createAnnotation({
		latitude : _args.lat,
		longitude : _args.lng,
		image : '/assets/' + Ti.Platform.displayCaps.density + '-pin.png'
	}));
	self.listview = Ti.UI.createListView({
		sections : [Ti.UI.createListSection({
			headerTitle : 'Germany',
		})],
		templates : {
			'template' : require('ui/TEMPLATES').steps
		},
		defaultItemTemplate : 'template',
		top : '80%'
	});
	self.add(self.mapview);
	self.add(self.listview);
	addRoute2Map('driving');
	self.slider = require('ui/viewslider.widget').create('80%', {
		onmove : function(_ratio) {
			self.mapview.setHeight(_ratio);
			self.listview.setTop(_ratio);
		},
		onstart : function() {
			region = self.mapview.getRegion();
		},
		onend : function() {
			self.mapview.setRegion(region);
		}
	});
	self.add(self.slider);
	Ti.Android && self.addEventListener('open', function() {
		var activity = self.getActivity();
		
		activity.onCreateOptionsMenu = function(e) {
			var addMenu = function(i, name) {
				e.menu.add({
					title : name,
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
					checkable : true,
					checked : (i) ? false : true,
					visible : true
				}).addEventListener("click", function() {
					var items = e.menu.getItems(), item;
					while ( item = items.pop()) {
						item.setChecked(false);
					}
					e.menu.getItem(i).checked = true;
					addRoute2Map(name.toLowerCase());
				});
			};
			e.menu.add({
				title : 'StreetView',
				showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				icon : Ti.App.Android.R.drawable.ic_action_streetview,
			}).addEventListener("click", function() {
				require('ui/streetview/window').create(_args).open();
			});
			var menuitems = ['Driving', 'Bicycling', 'Walking'];
			for (var i = 0; i < menuitems.length; i++)
				addMenu(i, menuitems[i]);
		};
	});
	return self;
};
