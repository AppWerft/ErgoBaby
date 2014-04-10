exports.create = function(_args) {
	if (Ti.Network.online == false)
		return;
	var self = Ti.UI.createWindow({
		fullscreen : true,
		title : _args.title,
		backgroundColor:'#fff',
		orientationModes : [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT]
	});
	self.add(Ti.UI.createImageView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		image : 'https://i1.ytimg.com/vi/' + _args.id + '/mqdefault.jpg'
	}));
	self.open();
	var videoPlayer = Ti.Media.createVideoPlayer({
		autoplay : true,
		url : _args.url,
		mediaControlStyle : Titanium.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode : Titanium.Media.VIDEO_SCALING_MODE_FILL,
		fullscreen : false,visible:false,
		backgroundImage:'https://i1.ytimg.com/vi/' + _args.id + '/mqdefault.jpg'
	});
	videoPlayer.addEventListener('complete', function() {
		videoPlayer.release();
		self.close();
	});self.add(videoPlayer);
	videoPlayer.addEventListener('playing', function() {
		console.log('PLAYING');
		videoPlayer.setVisible(true);
		
	});
	videoPlayer.addEventListener('playbackstate', function(_e) {
		console.log('STATE='+_e.playbackState);
		
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

};
