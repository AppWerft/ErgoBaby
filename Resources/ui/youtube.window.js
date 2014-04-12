exports.create = function(_args) {
	if (Ti.Network.online == false)
		return;
	var self = Ti.UI.createWindow({
		fullscreen : true,
		title : _args.title,
		backgroundColor : '#fff',
		orientationModes : [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT]
	});
	if (Ti.Android) {
		self.add(Ti.UI.createImageView({
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			image : 'https://i1.ytimg.com/vi/' + _args.id + '/mqdefault.jpg'
		}));
		var videoPlayer = Ti.Media.createVideoPlayer({
			autoplay : true,
			url : _args.url,
			mediaControlStyle : Titanium.Media.VIDEO_CONTROL_DEFAULT,
			scalingMode : Titanium.Media.VIDEO_SCALING_MODE_FILL,
			fullscreen : false,
			visible : false,
			backgroundImage : 'https://i1.ytimg.com/vi/' + _args.id + '/mqdefault.jpg'
		});
		videoPlayer.addEventListener('complete', function() {
			videoPlayer.release();
			self.close();
		});
		self.add(videoPlayer);
		videoPlayer.addEventListener('playing', function() {
			console.log('PLAYING');
			videoPlayer.setVisible(true);

		});
		videoPlayer.addEventListener('playbackstate', function(_e) {
			console.log('STATE=' + _e.playbackState);

		});
		self.addEventListener('close', function() {
			videoPlayer.release();
			//videoPlayer.play();
		});
		self.addEventListener("open", function() {
			if (Ti.Android) {
				var activity = self.getActivity();
				if (activity.actionBar) {
					activity.actionBar.setDisplayHomeAsUp(true);
					activity.actionBar.onHomeIconItemSelected = function() {
						self.close();
					};
				}
			}
		});
	} else {
		var webView = Ti.UI.createWebView({
			url : 'https://www.youtube.com/embed/' + _args.id + '?rel=0&autoplay=1&playsinline=0e&rel=0&showinfo=0',
			/*enableZoomControls : false,
			 scalesPageToFit : false,
			 touchEnabled : true,
			 showScrollbars : false,
			 disableBounce : true*/
		});
		webView.addEventListener('load', function() {
			webView.fireEvent('click');
		});
		self.add(webView);
	}
	self.addEventListener("longpress", function() {
		self.close();
	});
	return self;
};
