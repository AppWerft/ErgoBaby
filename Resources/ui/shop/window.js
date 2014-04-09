exports.create = function() {
	var self = require('vendor/window').create({});
	var cats = require('model/shop');
	self.listview = Ti.UI.createListView({
		sections : [Ti.UI.createListSection({
			headerTitle : null,
		})],
		templates : {
			'template' : require('ui/TEMPLATES').shopcategories
		},
		defaultItemTemplate : 'template'
	});
	self.add(self.listview);
	var rows = [];
	for (var i = 0; i < cats.length; i++) {
		rows.push({
			properties : {
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
				itemId : cats[i].title
			},
			title : {
				text : cats[i].title
			},
			description : {
				text : cats[i].description
			},
			image : {
				image : cats[i].image
			}
		});
	}
	self.listview.getSections()[0].setItems(rows);
	self.listview.addEventListener('itemclick', function(_e) {
		require('ui/shop/productlist.window').create(_e.itemId).open();
	});
	return self;
};
