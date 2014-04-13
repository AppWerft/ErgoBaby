exports.create = function() {
	function getPreview(_v) {
		var self = Ti.UI.createView({
			height : Ti.UI.SIZE,
			opacity : (Ti.Android) ? 0.5 : 1,
			backgroundColor : 'white',
			borderWidth : 0.5,
			barColor : '#CF6500',
			borderColor : 'gray',
			itemId : _v
		});

		self.add(Ti.UI.createImageView({
			left : 0,top:0,
			width : 160,
			touchEnabled : false,
			defaultImage : '/assets/logo.png',
			height : 100,
			image : 'https://i1.ytimg.com/vi/' + _v.id + '/mqdefault.jpg'
		}));
		self.add(Ti.UI.createLabel({
			left : 170,
			right : 10,
			top : 5,
			textAlign : 'left',
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			touchEnabled : false,

			text : _v.title,
			color : '#444',
			font : {
				fontWeight : 'bold',
				fontSize : 19,
				fontFamily : 'Centabel Book'
			}
		}));
		self.add(Ti.UI.createLabel({
			left : 170,
			right : 10,
			bottom : 10,
			touchEnabled : false,
			textAlign : 'right',
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			//text : 'Laufzeit: ' + _v.duration,
			color : '#222',
			font : {
				fontSize : 12,
				fontFamily : 'Centabel Book'
			}
		}));
		require('vendor/youtube').getClipURL(_v.id, function(_res) {
			if (_res.url != null) {
				self.setOpacity(1);
				self.itemId.url = _res.url;
				self.add(Ti.UI.createLabel({
					left : 10,
					right : 10,
					top : 110,
					touchEnabled : false,
					textAlign : 'left',
					width : Ti.UI.FILL,
					height : Ti.UI.SIZE,bottom:5,
					text : _res.video.description,
					color : '#222',
					font : {
						fontSize : 14,
						fontFamily : 'Centabel Book'
					}
				}));
			}
		});
		return self;
	}

	var options = arguments[0] || {};
	var ready = false;
	var pins = [];
	var self = Ti.UI.createWindow({
		fullscreen : true,
		title : 'HOWTO Videos',
		barColor : '#CF6500'

	});
	self.container = Ti.UI.createScrollView({
		scrollType : 'vertical',
		width : Ti.UI.FILL,
		contentWidth : Ti.UI.FILL,
		contentHeight : Ti.UI.SIZE,
		layout : 'vertical',
		height : Ti.UI.FILL
	});

	var videos = require('model/videos').yt;
	for (var i = 0; i < videos.length; i++) {
		self.container.add(getPreview(videos[i]));
	}
	self.add(self.container);
	self.container.addEventListener('click', function(_e) {
		var win = require('ui/youtube.window').create(_e.source.itemId);
		if (Ti.Android)
			win.open();
		else {
			self.tab.fireEvent('hidetabgroup!', {});
			self.tab.open(win);
		}
	});
	return self;

};

