exports.create = function(_cat) {
	var self = Ti.UI.createView({
		width : 260,
		height : 3800,
		itemId : _cat.title

	});
	self.add(Ti.UI.createImageView({
		image : _cat.bigimage || _cat.image,
		width : 260,
		height : 380,
	}));
	
	return self;
};
