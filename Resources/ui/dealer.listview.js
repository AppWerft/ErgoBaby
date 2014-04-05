exports.create = function(pois) {
	var self = Ti.UI.createListView({
		sections : [Ti.UI.createListSection({
			headerTitle : 'Germany',
		})],
		backgroundColor : 'white',
		templates : {
			'template' : require('ui/TEMPLATES').babydealer
		},
		defaultItemTemplate : 'template'
	});
	setTimeout(function() {
		var rows = [];
		for (var i = 0; i < pois.length; i++) {
			rows.push({
				properties : {
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE,
					backgroundColor : 'white'
				},
				title : {
					text : pois[i].title
				},
				address : {
					text : pois[i].address
				},
				dist : {
					text : (pois[i].dist/1000).toFixed(1) + 'km'
				}
			});
		}		
		self.sections[0].setItems(rows);
		self.setSections(self.sections);
	}, 200);
	return self;

}; 