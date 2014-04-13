exports.create = function(_args) {
	var streamurl = _args.streamurl;
	var meta = _args.meta;
	if (Ti.Network.online == false)
		return;
	var self = Ti.UI.createWindow({
		fullscreen : true,
		title : meta.title,
		backgroundColor : '#fff',
		orientationModes : [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT]
	});
	var videoPlayer = Ti.Media.createVideoPlayer({
		autoplay : true,
		url : streamurl,
		mediaControlStyle : Titanium.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode : Titanium.Media.VIDEO_SCALING_MODE_FILL,
		fullscreen : false,
		backgroundColor : '#fff',
		backgroundImage : meta['thumbnail_for_watch']
	});
	videoPlayer.addEventListener('complete', function() {
		videoPlayer.release();
		self.close();
	});
	self.add(videoPlayer);
	videoPlayer.play();
	self.addEventListener('close', function() {
		videoPlayer.release();
	});
	videoPlayer.addEventListener('playbackstate', function(_e) {
		console.log(_e.playbackState);
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
	self.add(Ti.UI.createImageView({
		image : '/assets/yt.png',
		bottom : 0,
		right : 0,
		width : 60,
		height : 30
	}));
	self.addEventListener("longpress", function() {
		self.close();
	});
	return self;
};
