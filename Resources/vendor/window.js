exports.create = function() {
	var args = arguments[0] || {};
	var self = Ti.UI.createWindow({
		fullscreen : true
	});
	self.addEventListener("open", function() {
		if (Ti.Android) {
			var activity = self.getActivity();
			if (activity.actionBar) {
				activity.actionBar.setDisplayHomeAsUp(true);
				activity.actionBar.setTitle(args.title);
				activity.actionBar.setLogo(args.logo);
				activity.actionBar.onHomeIconItemSelected = function() {
					self.close();
				};
			}
		}
	});
	return self;
};
