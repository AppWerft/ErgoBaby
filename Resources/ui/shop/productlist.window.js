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
		itemdata = [];
		var maxprice = _args.maxprice || 999;
		for (var i = 0; i < cats.length; i++) {
			if (cats[i].items) {
				for (var j = 0; j < cats[i].items.length; j++) {
					var item = cats[i].items[j];
					if (item.title && item.price < maxprice)
						itemdata.push({
							properties : {
								accessoryType : (item.bigimage) ?Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE:Ti.UI.LIST_ACCESSORY_TYPE_NONE,
								itemId : JSON.stringify(item)
							},
							title : {
								text : item.title
							},
							color : {
								text : 'Color: ' + item.color || 'unknown'
							},
							price : {
								text : 'Price: ' + parseFloat(item.price).toFixed(2) + ' €'
							},
							image : {
								image : item.image
							}
						});
				}
			}
		}
		self.listview.getSections()[0].setItems(itemdata);
	};
	self.listview.updateList({
		maxprice : 999
	});
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
				icon : Ti.App.Android.R.drawable.ic_action_basket
			}).addEventListener("click", function() {
				Ti.Android && Ti.UI.createNotification({
					message : 'Your basket is empty.'
				}).show();
			});
			e.menu.add({
				title : 'Filter',
				showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				icon : Ti.App.Android.R.drawable.ic_action_filter	
			}).addEventListener("click", function() {
				(self.filtervisible) ? self.hideFilter() : self.showFilter();
			});
		};
	});
	self.addEventListener('touchmove', self.hideFilter);
	self.addEventListener('itemclick', function(_e){
		require('ui/shop/product.window').create(JSON.parse(_e.itemId)).open();
	});

	return self;
};
