exports.create = function(_args) {
	var self = require('vendor/window').create({
		title : _args.title
	});
	var web = Ti.UI.createWebView({
		url : '/ui/streetview/index.html',
		enableZoomControls : false,
		scalesPageToFit : true,
		cacheMode : Ti.UI.Android.WEBVIEW_LOAD_NO_CACHE

	});
	web.addEventListener('load', function() {
		web.evalJS('initSV({lat:' + _args.lat + ',lng:' + _args.lng + '})');
	});
	self.add(web);
	return self;
};
