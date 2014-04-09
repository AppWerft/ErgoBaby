function getColor(color) {
	var self = Ti.UI.createView({
		left : 2,
		right : 2,
		width : '13%',
		height : 40,
		top : 0,
		backgroundColor : color,
		borderColor : 'gray',
		borderWidth : 0.5,
		zIndex : 9999
	});
	self.addEventListener('click', function() {
		if (self.height == 40)
			self.height = 60;
		else
			self.height = 40;
	});
	return self;
}

exports.create = function() {
	var self = Ti.UI.createView({
		height : '60dp',
		bubbleParent : false,
		top : '-60dp'
	});
	self.add(Ti.UI.createView({
		backgroundColor : 'black',
		opacity : 0.7
	}));
	self.container = Ti.UI.createView({
		layout : 'horizontal',
		horizontalWrap : false
	});
	self.add(self.container);
	var colors = ['#990000', 'blue', '#00aa00', '#dddd77', 'gray', 'orange', 'black'];
	for (var i = 0; i < colors.length; i++) {
		self.container.add(getColor(colors[i]));
	}
	return self;
};
