exports.create = function(title) {
	var self =require('vendor/window').create({
		title : title
	});
	var colorfilter = Ti.UI.createView({
		top : 0,
		layout : 'horizontal',
		horizontalWrap : false
	});
	var colors = ['red', 'blue', 'green', 'yellow', 'gray', 'orange', 'black'];
	for (var i = 0; i < colors.length; i++) {
		colorfilter.add(require('ui/colorfilter.widget').create(colors[i]));
	}
	self.add(colorfilter);
	return self;
};
