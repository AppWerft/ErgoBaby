exports.create = function() {
	var self = require('vendor/window').create({
		title : 'ErgoBaby Shop'
	});
	self.listview = Ti.UI.createListView({
		templates : {
			'template' : require('ui/TEMPLATES').shopcategories
		},
		defaultItemTemplate : 'template'
	});
	self.add(self.listview);
	var cats = require('model/shop');
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
	return self;
};
