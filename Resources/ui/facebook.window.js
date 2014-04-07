exports.create = function() {
	var web = Ti.UI.createWebView({
		url : 'http://m.facebook.de/ergobaby/'
	});
	var self = Ti.UI.createWindow({
		fullscreen : true
	});
	self.add(web);
	return self;
};

