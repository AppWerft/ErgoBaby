exports.create = function() {
	function getPreview(_v) {
		var w = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
		var self = Ti.UI.createView({
			height : Ti.UI.SIZE,
			backgroundColor : 'white',
			itemId : _v.title,
			width : Ti.UI.FILL
		});
		self.add(Ti.UI.createImageView({
			left : 0,
			width : w / 2,
			itemId : _v,
			touchEnabled : false,
			height : w / 2 * 146 / 216,
			image : _v.image,
			defaultImage : '/assets/logo.png'
		}));
		self.add(Ti.UI.createView({
			left : 0,
			bottom : 0,
			width : w / 2,
			touchEnabled : false,
			height : 20,
			backgroundColor : 'black',
			opacity : 0.5
		}));
		self.add(Ti.UI.createLabel({
			left : 3,
			right : 3,
			bottom : 1,
			height : 20,
			textAlign : 'center',
			width : Ti.UI.FILL,
			touchEnabled : false,
			text : _v.title,
			color : '#f66',
			font : {
				fontSize : 12,
				fontFamily : 'Centabel Book'
			}
		}));
		return self;
	}

	var options = arguments[0] || {};
	var ready = false;
	var pins = [];
	var self = Ti.UI.createWindow({
		fullscreen : true,
		backgroundColor : 'white',
		title : 'Ergobaby @ Pinterest'
	});
	self.containers = [Ti.UI.createScrollView({
		scrollType : 'vertical',
		layout : 'vertical',
		left : 0,
		contentWidth : '50%',
		contentHeight : Ti.UI.SIZE,
		width : '50%',
		height : Ti.UI.FILL
	}), Ti.UI.createScrollView({
		scrollType : 'vertical',
		layout : 'vertical',
		contentWidth : '50%',
		contentHeight : Ti.UI.SIZE,
		right : 0,
		width : '50%',
		height : Ti.UI.FILL
	})];
	self.add(self.containers[0]);
	self.add(self.containers[1]);
	setTimeout(function() {
		var walls = require('model/pinwalls').walls;
		for (var i = 0; i < walls.length; i++) {
			if (walls[i].image)
				self.containers[i % 2].add(getPreview(walls[i]));
		}
	}, 100);

	for (var i = 0; i < 2; i++)
		self.containers[i].addEventListener('click', function(_e) {
			var id = _e.source.itemId.toLowerCase().replace(/[^a-z]+/g, '-').replace(/[\-]+/g, '-').replace(/^\-/, '').replace(/\-$/, '');
			var web = Ti.UI.createWebView({
				url : 'http://pinterest.com/ergobaby/' + id
			});
			var win = require('vendor/window').create({
				title : _e.source.itemId
			});
			win.add(web);
			if (Ti.Android)
				win.open();
			else
				self.tab.open(win);
		});
	return self;
};

