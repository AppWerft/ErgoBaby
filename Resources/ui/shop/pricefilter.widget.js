exports.create = function() {

	var self = Ti.UI.createView({
		bottom : '-60dp',
		height : '60dp',
		bubbleParent : false
	});
	self.add(Ti.UI.createView({
		backgroundColor : 'black',
		opacity : 0.7
	}));
	var priceslider = Titanium.UI.createSlider({
		min : 100,
		max : 200,
		left : '10dp',
		right : '110dp',
		value : 100,
		value : 200,
		zIndex : 9999
	});
	priceslider.addEventListener('change', function(_e) {
		price.setText(parseInt(_e.value) + ',– €');
	});
	priceslider.addEventListener('stop', function(_e) {
		self.fireEvent('changed', {
			maxprice : _e.value
		});
	});
	var pricelabel = Ti.UI.createView({
		backgroundImage : '/assets/price.png',
		width : '90dp',
		height : '45dp',
		right : '5dp',
		transform : Ti.UI.create2DMatrix({
			rotate : -5
		})
	});
	var price = Ti.UI.createLabel({
		text : '200 €',
		color : 'black',
		font : {
			fontSize : '30dp',
			fontFamily : 'SteelfishRG-Regular'
		}
	});

	pricelabel.add(price);
	self.add(pricelabel);
	self.add(Ti.UI.createLabel({
		text : 'max. price',
		top : '5dp'
	}));

	self.add(priceslider);

	return self;

};
