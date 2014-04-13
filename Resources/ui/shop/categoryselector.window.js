exports.create = function() {
	var self = require('vendor/window').create({
		title : 'ErgoBaby Shop',
		barColor : '#CF6500',
	});
	var cats = require('model/shop');
	if (Ti.Android) {
		self.listview = Ti.UI.createListView({
			templates : {
				'template' : require('ui/TEMPLATES').shopcategories
			},
			defaultItemTemplate : 'template'
		});
		self.add(self.listview);

		var dataitems = [];
		for (var i = 0; i < cats.length; i++) {
			var cat = cats[i];
			//console.log(cat.title);
			//console.log(cat.description);
			dataitems.push({
				properties : {
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
					itemId : cat.title
				},
				categorytitle : {
					text : cat.title
				},
				categorydescription : {
					text : cat.description
				},
				thumb : {
					image : cat.image
				}
			});
		}
		var section = Ti.UI.createListSection({
			headerTitle : null
		});
		section.setItems(dataitems);
		self.listview.sections = [section];

		self.listview.addEventListener('itemclick', function(_e) {
			var win = require('ui/shop/productlist.window').create({
				title : _e.itemId
			});
			if (Ti.Android)
				win.open();
			else
				self.tab.open(win);
		});
	} else {
		var views = [];
		for (var i = 0; i < cats.length; i++) {
			views.push(require('ui/shop/carouselviews.widget').create(cats[i]));
		}
		Ti.App.Carousel = require('com.obscure.ticarousel');
		self.carousel = Ti.App.Carousel.createCarouselView({
			top : 0,
			carouselType : Ti.App.Carousel.CAROUSEL_TYPE_CYLINDER,
			views : views,
			itemWidth : 350,
			numberOfVisibleItems : 7,
			wrap : true,
		});
		self.add(self.carousel);

		self.addEventListener('focus', function() {
			self.carousel.scrollToIndex(3, {
				duration : 1000
			});
		});
		self.carousel.reloadData();
		self.carousel.addEventListener('select', function(_e) {
			var ndx =self.carousel.currentItemIndex;
			var win = require('ui/shop/productlist.window').create({
				title : cats[ndx].title
			});
			self.tab.open(win);
		});
		self.carousel.addEventListener('change', function(_e) {
			var ndx = self.carousel.currentItemIndex;
			category.setText(cats[ndx].title);
		});
		var category = Ti.UI.createLabel({
			bottom : 0,
			width : 300,
			color : 'orange',
			zIndex : 9999,
			textAlign : 'center',
			height : 30,
			font : {
				fontSize : 26,
				fontFamily : 'Centabel Book'
			}
		});
		self.add(category);
	}
	return self;
};
