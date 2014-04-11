module.exports = function(videoId, callback) {
	var url = 'http://m.youtube.com/watch?ajax=1&layout=mobile&tsp=1&utcoffset=330&v=' + videoId;
	if (Ti.App.Properties.hasProperty('YT_'+url)) {
		callback(null, Ti.App.Properties.getString('YT_'+url));
		return null;
	}
	var referer = 'http://www.youtube.com/watch?v=' + videoId;
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			try {
				var json = this.responseText.substring(4, this.responseText.length);
				var response = JSON.parse(json);

				// console.log(response);

				var video = response.content.video;

				if (videoId == video.encrypted_id) {
					var streamUrl = response.content.player_data.fmt_stream_map ? response.content.player_data.fmt_stream_map[0].url : response.content.player_data.stream_url;
				} else {
					callback('wrong video return');
					return;
				}
			} catch(err) {
				callback('cannot retrieve video');
				return;
			}
			Ti.App.Properties.setString('YT_'+url, streamUrl);
			callback(null, streamUrl);
		},
		onerror : function(e) {
			callback(e.error);
		},
		timeout : 60000 // in milliseconds
	});

	xhr.open("GET", url);

	if (Ti.Platform.name == 'iPhone OS') {
		xhr.setRequestHeader('Referer', referer);
		xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14');
	}
	if (Ti.Platform.name == 'android') {
		xhr.setRequestHeader('Referer', referer);
		xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Linux; U; Android 2.2.1; en-gb; GT-I9003 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1');
	}

	xhr.send();

};
