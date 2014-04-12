exports.create = function(_cat) {
	var self = Ti.UI.createView({
		width : 320,
		height : 400,
		itemId : _cat.title

	});
	self.add(Ti.UI.createImageView({
		image : _cat.bigimage || _cat.image,
		width : 320,
		height : 400,
	}));
	
	return self;
};
