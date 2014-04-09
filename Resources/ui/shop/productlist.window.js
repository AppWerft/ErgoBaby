var abextras = require('com.alcoapps.actionbarextras');

exports.create = function(title) {
	var self = require('vendor/window').create({
		title : 'ErgoBaby'
	});
	self.filtervisible = false;
	self.showFilter = function() {
		colorfilter.animate({
			top : 0
		});
		self.listview.animate({
			top : '40dp'
		});
		pricefilter.animate({
			bottom : 0
		});
		self.filtervisible = true;
	};
	self.hideFilter = function() {
		if (self.filtervisible) {
			colorfilter.animate({
				top : '-60dp'
			});
			pricefilter.animate({
				bottom : '-60dp'
			});
			self.listview.animate({
				top : 0,
				bottom : 0
			});
			self.filtervisible = false;
		}
	};

	var colorfilter = require('ui/shop/colorfilter.widget').create();
	var pricefilter = require('ui/shop/pricefilter.widget').create();

	self.listview = Ti.UI.createListView({
		sections : [Ti.UI.createListSection({
			headerTitle : null,
		})],
		top : 0,
		bottom : 0,
		templates : {
			'template' : require('ui/TEMPLATES').items
		},
		defaultItemTemplate : 'template'
	});
	self.add(self.listview);
	var itemdata = [];
	var cats = require('model/shop');
	self.listview.updateList = function(_args) {
		console.log(_args);
		itemdata = [];
		var maxprice = _args.maxprice || 999;
		console.log(maxprice);
		for (var i = 0; i < cats.length; i++) {
			if (cats[i].items) {
				for (var j = 0; j < cats[i].items.length; j++) {
					if (cats[i].items[j].title && cats[i].items[j].title.price < maxprice)
						itemdata.push({
							properties : {
								accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
								itemId : cats[i].items[j].title
							},
							title : {
								text : cats[i].items[j].title
							},
							color : {
								text : 'Color: ' + cats[i].items[j].color || 'unknown'
							},
							price : {
								text : 'Price: ' + parseFloat(cats[i].items[j].price).toFixed(2) + ' €'
							},
							image : {
								image : cats[i].items[j].image
							}
						});
				}
			}
		}
		self.listview.getSections()[0].setItems(itemdata);
	};
	self.listview.updateList({
		maxprice : 999
	})
	pricefilter.addEventListener('changed', function(_data) {
		self.listview.updateList({
			maxprice : _data.maxprice
		});
	});
	self.add(colorfilter);
	self.add(pricefilter);
	self.addEventListener('open', function() {
		if (!Ti.Android)
			return;
		var activity = self.getActivity();
		if (!activity.actionBar)
			return;
		abextras.setExtras({
			title : 'ErgoBaby',
			subtitle : title
		});
		activity.onCreateOptionsMenu = function(e) {
			e.menu.add({
				title : 'Basket',
				showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				icon : '/assets/basket.png'
			}).addEventListener("click", function() {
				Ti.Android && Ti.UI.createNotification({
					message : 'Your basket is empty.'
				}).show();
			});
			e.menu.add({
				title : 'Filter',
				showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				icon : '/assets/filter.png'
			}).addEventListener("click", function() {
				(self.filtervisible) ? self.hideFilter() : self.showFilter();
			});
		};
	});
	self.addEventListener('touchmove', self.hideFilter);

	return self;
};
