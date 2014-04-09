var abextras = require('com.alcoapps.actionbarextras');

exports.create = function(title) {
	var self = require('vendor/window').create({
		title : 'ErgoBaby'
	});
	self.filtervisible = false;
	var colorfilter = require('ui/shop/colorfilter.widget').create();
	var pricefilter = require('ui/shop/pricefilter.widget').create();
	var cats = require('model/shop');
	self.listview = Ti.UI.createListView({
		sections : [Ti.UI.createListSection({
			headerTitle : null,

		})],
		top : 0,
		templates : {
			'template' : require('ui/TEMPLATES').items
		},
		defaultItemTemplate : 'template'
	});
	self.add(self.listview);
	var rows = [];
	for (var i = 0; i < cats.length; i++) {
		if (cats[i].items) {
			for (var j = 0; j < cats[i].items.length; j++) {
				if (cats[i].items.title)
					rows.push({
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
	self.listview.getSections()[0].setItems(rows);
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
				} else {
					colorfilter.animate({
						top : 0
					});
					self.listview.animate({
						top : '40dp',
						bottom : '80dp'
					});
					pricefilter.animate({
						bottom : 0
					});
					self.filtervisible = true;
				}
			});
			/*			e.menu.add({
			 showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
			 }).addEventListener("click", function() {

			 });*/
		};
	});
	self.addEventListener('touchmove', function() {
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
	});
	return self;
};
