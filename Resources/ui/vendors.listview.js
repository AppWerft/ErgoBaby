exports.create = function(parent, pois, RATIO) {
	var self = Ti.UI.createListView({
		sections : [Ti.UI.createListSection({
			headerTitle : null,
		})],
		templates : {
			'template' : require('ui/TEMPLATES').babydealer
		},
		defaultItemTemplate : 'template',
		top : RATIO
	});
	setTimeout(function() {
		var rows = [];
		for (var i = 0; i < pois.length; i++) {
			rows.push({
				properties : {
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
					backgroundColor : 'white',
					itemId : JSON.stringify(pois[i])
				},
				title : {
					text : pois[i].title
				},
				address : {
					text : pois[i].address.replace(/\n/g, ' ')
				},
				dist : {
					text : 'Distance: ' + (pois[i].dist / 1000).toFixed(1) + 'km'
				}
			});
		}
		self.sections[0].setItems(rows);
		self.setSections(self.sections);
	}, 20);
	self.addEventListener('itemclick', function(_e) {
		var win = require('ui/vendorpath2.window').create(JSON.parse(_e.itemId));
		if (Ti.Android)
			win.open();
		else
			parent.tab.open(win);
	});
	return self;
};
