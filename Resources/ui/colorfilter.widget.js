exports.create = function(color) {
	var self = Ti.UI.createView({
		left : 2,
		right : 2,
		width : '13%',
		height : 40,
		top : 0,
		backgroundColor : color,
		borderColor : 'gray',
		borderWidth : 0.5
	});
	self.addEventListener('click', function() {
		if (self.height == 40)
			self.height = 60;
		else
			self.height = 40;
	});
	return self;

};
