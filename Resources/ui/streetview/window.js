exports.create = function(_args) {
	var self = require('vendor/window').create({
		title : _args.title
	});
	self.web = Ti.UI.createWebView({
		url : '/ui/streetview/index.html',
		enableZoomControls : false,
		scalesPageToFit : true
	});
	self.web.addEventListener('load', function() {
		self.web.evalJS('createPanorama({lat:' + _args.lat + ',lng:' + _args.lng + '})');
	});
	self.add(self.web);
	self.addEventListener('close', function() {
		if (self.web) {
			self.web = null;
			self=null;
		}
	});
	return self;
};
