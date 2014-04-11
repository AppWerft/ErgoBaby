var youtube = require('vendor/youtube');

exports.create = function() {
	function getPreview(_v) {
		var self = Ti.UI.createView({
			height : 110,
			opacity : 0.5,
			backgroundColor : 'white',
			borderWidth : 0.5,
			borderColor : 'gray',
			itemId : _v
		});
		self.add(Ti.UI.createImageView({
			left : 0,
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
			text : 'Laufzeit: ' + _v.duration,
			color : '#222',
			font : {
				fontSize : 12,
				fontFamily : 'Centabel Book'
			}
		}));
		youtube(_v.id, function(err, clip_url) {
			if (!err && clip_url) {
				self.setOpacity(1);
				self.itemId.url = clip_url;
			} else {
				console.error(err);
			}
		});
		return self;
	}

	var options = arguments[0] || {};
	var ready = false;
	var pins = [];
	var self = Ti.UI.createWindow({
		fullscreen : true
	});
	self.container = Ti.UI.createScrollView({
		scrollType : 'vertical',
		layout : 'vertical',
		height : Ti.UI.FILL
	});
	/*self.container.add(Ti.UI.createView({
	 backgroundColor : 'yellow',
	 height : 48,
	 left : 0,
	 width : Ti.Platform.displayCaps.platformWidth / 2 / Ti.Platform.displayCaps.logicalDensityFactor
	 }));
	 */
	var videos = require('model/videos').yt;
	for (var i = 0; i < videos.length; i++) {
		self.container.add(getPreview(videos[i]));
	}
	self.add(self.container);
	self.container.addEventListener('click', function(_e) {
		require('ui/youtube.window').create(_e.source.itemId);
	});
	return self;

};

