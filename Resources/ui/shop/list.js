exports.create = function(title) {
	var self = require('vendor/window').create({
		title : title
	});
	var colorfilter = Ti.UI.createView({
		top : 0,
		backgroundColor : 'transparent',
		layout : 'horizontal',
		horizontalWrap : false,
		height : '60dp'
	});
	var colors = ['red', 'blue', 'green', 'yellow', 'gray', 'orange', 'black'];
	for (var i = 0; i < colors.length; i++) {
		colorfilter.add(require('ui/colorfilter.widget').create(colors[i]));
	}
	var cats = require('model/shop');
	self.listview = Ti.UI.createListView({
		sections : [Ti.UI.createListSection({
			headerTitle : null,

		})],
		top : '40dp',
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
				rows.push({
					properties : {
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
						itemId : cats[i].items[j].title
					},
					title : {
						text : cats[i].items[j].title
					},
					color : {
						text : cats[i].items[j].color
					},
					price : {
						text : cats[i].items[j].price
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
	return self;
};
