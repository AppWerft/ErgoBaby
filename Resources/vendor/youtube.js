exports.getClipURL = function(videoId, callback) {
	var url = 'http://m.youtube.com/watch?ajax=1&layout=mobile&tsp=1&utcoffset=330&v=' + videoId;
	var referer = 'http://www.youtube.com/watch?v=' + videoId;
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			try {
				var json = this.responseText.substring(4, this.responseText.length);
				var response = JSON.parse(json);
				var video = response.content.video;
				if (videoId == video.encrypted_id) {
					var streamUrl = response.content.player_data.fmt_stream_map ? response.content.player_data.fmt_stream_map[0].url : response.content.player_data.stream_url;
					console.log(streamUrl);
					callback({
						url : streamUrl,
						video : video
					});

				} else {
					callback(null);
					return;
				}
			} catch(err) {
				console.log(err);
				callback(null);
				return;
			}
		},
		onerror : function(e) {
			console.log(e);
			callback(null);
		},
		timeout : 60000 // in milliseconds
	});
	xhr.open("GET", url);
	xhr.setRequestHeader('Referer', referer);
	xhr.setRequestHeader('User-Agent', (Ti.Android || true)//
	? 'Mozilla/5.0 (Linux; U; Android 2.2.1; en-gb; GT-I9003 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'//
	: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14');
	xhr.send();
};

var result = {
	"build_id" : 0,
	"result" : "ok",
	"content" : {
		"sentiment_xsrf_token" : "QUFFLUhqbkE2WHBOSkpjeDRhVnJFRnBZYV9FYW9LcW9nUXxBQ3Jtc0trNjhhLWh6aGxIZk9LanRGMDZYM1UzV0xGWTZsRVN6amJaem5OMDBKRW1FUDloQk5ISVZlT0Z5T1RGcmxmRjBYd21wRWQ0UzZhanZhQVR0N2E3OVFxNjdiQUlxZFZ6VFNWemRSbTVVNmNZcWtocS1nZWNBejAyWVBUMkI1eUF3NllNTklqanlhMExpU3h5YkUyYS1TOEZsRjhicnc=",
		"subscribe_xsrf_token" : "QUFFLUhqazNLampMWWFpMm1QWVRCSTFBNm9YVThEWmYtZ3xBQ3Jtc0tuWEFab2FFN25qZzM3SjlGblpZc3NucDM2LWJaQTM4cW1HZ0Q0TWJ1ZnRqd0w0RVNkcXRIdFhmZGRPQU8xWU1JbWN2Smw4eXhMcFVKd2dtWVpBM1hTbFBhNS05VVJibWpZX1phYTN6d0Q2TFdFZ2FtUWpWSWpIY0xwN2pjSXdaaUQ3YzZkOGRDWWZrOFg3TXF0clhLSVFmTnhJb1E=",
		"player_data" : {
			"playability" : "PLAY_OK",
			"fmt_stream_map" : [{
				"quality" : "medium",
				"type" : "video\/mp4; codecs=\"avc1.42001E, mp4a.40.2\"",
				"itag" : "18",
				"fallback_host" : "tc.v17.cache1.googlevideo.com",
				"url" : "http:\/\/r3---sn-i5onxoxu-i5hl.googlevideo.com\/videoplayback?sparams=id%2Cip%2Cipbits%2Citag%2Cpcm2fr%2Cratebypass%2Csource%2Cupn%2Cexpire\u0026id=o-ABf_puzFjv7sAgdE2SCwCC1pUlkaxtpe3CzQ4X3z8pXZ\u0026signature=0EA53F7125708C410390BE0B4DEB9BA20E48EAA4.ABE858E0E8C4D5ADD9CFE452CAEBDB6B2D2BF507\u0026source=youtube\u0026yms=EsWsHgnTOFo\u0026sver=3\u0026pcm2fr=yes\u0026dnc=1\u0026ip=85.177.170.38\u0026ms=au\u0026mv=m\u0026app=youtube_mobile\u0026mt=1397383382\u0026expire=1397409204\u0026ratebypass=yes\u0026upn=Wvkqcm7KXjo\u0026key=yt5\u0026ipbits=0\u0026fexp=935406%2C916104%2C901802%2C922520%2C929313%2C937417%2C913434%2C936916%2C934022%2C936923\u0026mws=yes\u0026itag=18\u0026el=watch"
			}, {
				"quality" : "small",
				"type" : "video\/3gpp; codecs=\"mp4v.20.3, mp4a.40.2\"",
				"itag" : "36",
				"fallback_host" : "tc.v6.cache5.googlevideo.com",
				"url" : "http:\/\/r3---sn-i5onxoxu-i5hl.googlevideo.com\/videoplayback?sparams=id%2Cip%2Cipbits%2Citag%2Cpcm2fr%2Cratebypass%2Csource%2Cupn%2Cexpire\u0026id=o-ABf_puzFjv7sAgdE2SCwCC1pUlkaxtpe3CzQ4X3z8pXZ\u0026signature=52F17BAAF18FDBD6076AA08ED7A3DA9D5DD501DA.05AD40BBD43BE5770FF3C203EBC75C7A799536DC\u0026source=youtube\u0026yms=EsWsHgnTOFo\u0026sver=3\u0026pcm2fr=yes\u0026dnc=1\u0026ip=85.177.170.38\u0026ms=au\u0026mv=m\u0026app=youtube_mobile\u0026mt=1397383382\u0026expire=1397409204\u0026ratebypass=yes\u0026upn=Wvkqcm7KXjo\u0026key=yt5\u0026ipbits=0\u0026fexp=935406%2C916104%2C901802%2C922520%2C929313%2C937417%2C913434%2C936916%2C934022%2C936923\u0026mws=yes\u0026itag=36\u0026el=watch"
			}],
			"atc" : "a=2\u0026b=ndojml4T8Z0FRXGRFi5T56hzVoU\u0026c=1397383427\u0026d=2\u0026e=B7Rd1BQVzlY\u0026c3a=29\u0026hh=uTk8NGQDL1TbJXp27Eu0Y0dMBrk",
			"ttsurl" : "http:\/\/www.youtube.com\/api\/timedtext?caps=asr\u0026signature=498CAC8B7D7077B46DCC94C9E2963596680B6271.33FC435F79BDBC3584C3F0EDBA77088F27F84CE9\u0026key=yttt1\u0026asr_langs=es%2Cru%2Cpt%2Cnl%2Cde%2Cit%2Cko%2Cfr%2Cen%2Cja\u0026sparams=asr_langs%2Ccaps%2Cv%2Cexpire\u0026v=B7Rd1BQVzlY\u0026hl=de_DE\u0026expire=1397408627",
			"player_vars" : {
				"video_verticals" : [1374, 115, 3, 58],
				"timestamp" : 1397383427,
				"track_embed" : 1,
				"iurlsd" : "http:\/\/i1.ytimg.com\/vi\/B7Rd1BQVzlY\/sddefault.jpg",
				"quality_cap" : "highres",
				"iurl" : "http:\/\/i1.ytimg.com\/vi\/B7Rd1BQVzlY\/hqdefault.jpg",
				"account_playback_token" : "QUFFLUhqazJCc2UzOHhmUjFhRWllMlE1RkpLaHBpb0xXZ3xBQ3Jtc0trMDF5RV9yNEFZanlPenVsME1GbzA4T1I1MjFYVXliSjZpSmE4MGF0Nnh3TUlUYlVDREdWTW5qaUtfYmR2azJOUGVHSkFPMUZYVEM1Z2drdnI4eTQwYTd5Tmc2OWRfSW15c21pbXZ3RGtKUVhnZnBlSQ==",
				"cc_font" : "Arial Unicode MS, arial, verdana, _sans",
				"status" : "ok",
				"no_get_video_log" : "1",
				"token" : "vjVQa1PpcFP4ZJq2PV16ppMU-MW4MZqqkBsljCqWuDA=",
				"ttsurl" : "http:\/\/www.youtube.com\/api\/timedtext?caps=asr\u0026signature=498CAC8B7D7077B46DCC94C9E2963596680B6271.33FC435F79BDBC3584C3F0EDBA77088F27F84CE9\u0026key=yttt1\u0026asr_langs=es%2Cru%2Cpt%2Cnl%2Cde%2Cit%2Cko%2Cfr%2Cen%2Cja\u0026sparams=asr_langs%2Ccaps%2Cv%2Cexpire\u0026v=B7Rd1BQVzlY\u0026hl=de_DE\u0026expire=1397408627",
				"plid" : "AAT26a7V38rSKdZq",
				"sw" : "0.1",
				"has_cc" : true,
				"subtitles_xlb" : "http:\/\/s.ytimg.com\/yts\/xlbbin\/subtitles-strings-de_DE-vflBwmEZx.xlb",
				"cc_asr" : 1,
				"length_seconds" : 371,
				"use_cipher_signature" : false,
				"thumbnail_url" : "http:\/\/i1.ytimg.com\/vi\/B7Rd1BQVzlY\/default.jpg",
				"iurlmaxres" : "http:\/\/i1.ytimg.com\/vi\/B7Rd1BQVzlY\/maxresdefault.jpg",
				"avg_rating" : 5.0,
				"author" : "Ergobaby",
				"watch_xlb" : "http:\/\/s.ytimg.com\/yts\/xlbbin\/watch-strings-de_DE-vflpNy1Pb.xlb",
				"pltype" : "contentugc",
				"baseUrl" : "http:\/\/googleads.g.doubleclick.net\/pagead\/viewthroughconversion\/962985656\/",
				"allow_ratings" : 1,
				"aid" : "P-RI9mxYTzs",
				"cc_module" : "http:\/\/s.ytimg.com\/yts\/swfbin\/player-vflJlNc2k\/subtitle_module.swf",
				"url_encoded_fmt_stream_map" : "quality=medium\u0026type=video%2Fmp4%3B+codecs%3D%22avc1.42001E%2C+mp4a.40.2%22\u0026itag=18\u0026fallback_host=tc.v17.cache1.googlevideo.com\u0026url=http%3A%2F%2Fr3---sn-i5onxoxu-i5hl.googlevideo.com%2Fvideoplayback%3Fsparams%3Did%252Cip%252Cipbits%252Citag%252Cpcm2fr%252Cratebypass%252Csource%252Cupn%252Cexpire%26id%3Do-ABf_puzFjv7sAgdE2SCwCC1pUlkaxtpe3CzQ4X3z8pXZ%26signature%3D0EA53F7125708C410390BE0B4DEB9BA20E48EAA4.ABE858E0E8C4D5ADD9CFE452CAEBDB6B2D2BF507%26source%3Dyoutube%26yms%3DEsWsHgnTOFo%26sver%3D3%26pcm2fr%3Dyes%26dnc%3D1%26ip%3D85.177.170.38%26ms%3Dau%26mv%3Dm%26app%3Dyoutube_mobile%26mt%3D1397383382%26expire%3D1397409204%26ratebypass%3Dyes%26upn%3DWvkqcm7KXjo%26key%3Dyt5%26ipbits%3D0%26fexp%3D935406%252C916104%252C901802%252C922520%252C929313%252C937417%252C913434%252C936916%252C934022%252C936923%26mws%3Dyes%26itag%3D18%26el%3Dwatch,quality=small\u0026type=video%2F3gpp%3B+codecs%3D%22mp4v.20.3%2C+mp4a.40.2%22\u0026itag=36\u0026fallback_host=tc.v6.cache5.googlevideo.com\u0026url=http%3A%2F%2Fr3---sn-i5onxoxu-i5hl.googlevideo.com%2Fvideoplayback%3Fsparams%3Did%252Cip%252Cipbits%252Citag%252Cpcm2fr%252Cratebypass%252Csource%252Cupn%252Cexpire%26id%3Do-ABf_puzFjv7sAgdE2SCwCC1pUlkaxtpe3CzQ4X3z8pXZ%26signature%3D52F17BAAF18FDBD6076AA08ED7A3DA9D5DD501DA.05AD40BBD43BE5770FF3C203EBC75C7A799536DC%26source%3Dyoutube%26yms%3DEsWsHgnTOFo%26sver%3D3%26pcm2fr%3Dyes%26dnc%3D1%26ip%3D85.177.170.38%26ms%3Dau%26mv%3Dm%26app%3Dyoutube_mobile%26mt%3D1397383382%26expire%3D1397409204%26ratebypass%3Dyes%26upn%3DWvkqcm7KXjo%26key%3Dyt5%26ipbits%3D0%26fexp%3D935406%252C916104%252C901802%252C922520%252C929313%252C937417%252C913434%252C936916%252C934022%252C936923%26mws%3Dyes%26itag%3D36%26el%3Dwatch",
				"rmktEnabled" : "1",
				"focEnabled" : "1",
				"playerStyle" : "mobile",
				"view_count" : 2182,
				"idpj" : "-2",
				"muted" : "0",
				"video_id" : "B7Rd1BQVzlY",
				"vid" : "B7Rd1BQVzlY",
				"ldpj" : "-30",
				"vq" : null,
				"allow_embed" : 1,
				"tmi" : "1",
				"watermark" : ",http:\/\/s.ytimg.com\/yts\/img\/watermark\/youtube_watermark-vflHX6b6E.png,http:\/\/s.ytimg.com\/yts\/img\/watermark\/youtube_hd_watermark-vflAzLcD6.png",
				"cc3_module" : "1",
				"uid" : "6DJ5xII2qJVlRtIDEDzEOQ",
				"is_video_preview" : false,
				"ptk" : "youtube_none",
				"rmktPingThreshold" : 0,
				"ftoken" : "QUFFLUhqbDdQRjNUNEVqc0JZMTlVRi1ldF9yUWZWaU4wZ3xBQ3Jtc0ttVFk3VzRiaGRZM1RLYnVvUnNfZ2J1M3FsVmpibXlkaTdCZ2ctS1Qxc2FtX3JQWUdXZU5tanVxZExsbGo2WkhrNVY4Z3B1VjV1RjFENXVHdTA5aUVGQUljT2xoRHJxV1N2N1NhWDFvT3I0S1dZMlVqbw==",
				"is_purchased" : false,
				"eventLabel" : "detailpage",
				"keywords" : "ergobaby,ergo baby,wrap,baby carrier,instructions",
				"fexp" : "935406,916104,901802,922520,929313,937417,913434,936916,934022,936923",
				"ytfocEnabled" : "1",
				"title" : "Ergobaby Wrap - Newborn Basic Tie"
			},
			"player_type" : "html5fs"
		},
		"related_videos" : [{
			"watch_link" : "\/watch?v=qVzl-qemXPk",
			"thumbnail_info" : {
				"thumb_height" : 72,
				"thumb_width" : 120,
				"url" : "http:\/\/i.ytimg.com\/vt?cids=qVzl-qemXPk,D9DvGHdzw-0,z8MSyNqr17Q,84cin-Ii-e8,YEvPCHC0QJY,93rnkhPtHVs,haT95FnByes,TxJlGb15lWY,-Gp60IAOTmQ,L8K8do0c0rA,1tZTOiTpAR8,yRR7kWnXh8M\u0026w=120\u0026h=72\u0026sigh=WhHuF-5uJuRN8eCS8ipVhtNyias",
				"posy" : 0,
				"posx" : 0,
				"height" : 960,
				"width" : 128,
				"stitched" : 1
			},
			"public_name" : "Ergobaby",
			"view_count" : "1.036",
			"encrypted_id" : "qVzl-qemXPk",
			"feature" : "relmfu",
			"duration" : "2:47",
			"title" : "Ergobaby Wrap - Pregnancy Tie"
		}, {
			"watch_link" : "\/watch?v=D9DvGHdzw-0",
			"thumbnail_info" : {
				"thumb_height" : 72,
				"thumb_width" : 120,
				"url" : "http:\/\/i.ytimg.com\/vt?cids=qVzl-qemXPk,D9DvGHdzw-0,z8MSyNqr17Q,84cin-Ii-e8,YEvPCHC0QJY,93rnkhPtHVs,haT95FnByes,TxJlGb15lWY,-Gp60IAOTmQ,L8K8do0c0rA,1tZTOiTpAR8,yRR7kWnXh8M\u0026w=120\u0026h=72\u0026sigh=WhHuF-5uJuRN8eCS8ipVhtNyias",
				"posy" : 80,
				"posx" : 0,
				"height" : 960,
				"width" : 128,
				"stitched" : 1
			},
			"public_name" : "Ergobaby",
			"view_count" : "887",
			"encrypted_id" : "D9DvGHdzw-0",
			"feature" : "relmfu",
			"duration" : "6:14",
			"title" : "Ergobaby Wrap - Basic Tie"
		}, {
			"watch_link" : "\/watch?v=z8MSyNqr17Q",
			"thumbnail_info" : {
				"thumb_height" : 72,
				"thumb_width" : 120,
				"url" : "http:\/\/i.ytimg.com\/vt?cids=qVzl-qemXPk,D9DvGHdzw-0,z8MSyNqr17Q,84cin-Ii-e8,YEvPCHC0QJY,93rnkhPtHVs,haT95FnByes,TxJlGb15lWY,-Gp60IAOTmQ,L8K8do0c0rA,1tZTOiTpAR8,yRR7kWnXh8M\u0026w=120\u0026h=72\u0026sigh=WhHuF-5uJuRN8eCS8ipVhtNyias",
				"posy" : 160,
				"posx" : 0,
				"height" : 960,
				"width" : 128,
				"stitched" : 1
			},
			"public_name" : "Ergobaby",
			"view_count" : "824",
			"encrypted_id" : "z8MSyNqr17Q",
			"feature" : "relmfu",
			"duration" : "5:28",
			"title" : "Ergobaby Wrap - Front Wrap Cross Carry Tie"
		}, {
			"watch_link" : "\/watch?v=84cin-Ii-e8",
			"thumbnail_info" : {
				"thumb_height" : 72,
				"thumb_width" : 120,
				"url" : "http:\/\/i.ytimg.com\/vt?cids=qVzl-qemXPk,D9DvGHdzw-0,z8MSyNqr17Q,84cin-Ii-e8,YEvPCHC0QJY,93rnkhPtHVs,haT95FnByes,TxJlGb15lWY,-Gp60IAOTmQ,L8K8do0c0rA,1tZTOiTpAR8,yRR7kWnXh8M\u0026w=120\u0026h=72\u0026sigh=WhHuF-5uJuRN8eCS8ipVhtNyias",
				"posy" : 240,
				"posx" : 0,
				"height" : 960,
				"width" : 128,
				"stitched" : 1
			},
			"public_name" : "Ergobaby",
			"view_count" : "792",
			"encrypted_id" : "84cin-Ii-e8",
			"feature" : "relmfu",
			"duration" : "2:16",
			"title" : "Ergobaby Wrap - Hip Carry"
		}, {
			"watch_link" : "\/watch?v=YEvPCHC0QJY",
			"thumbnail_info" : {
				"thumb_height" : 72,
				"thumb_width" : 120,
				"url" : "http:\/\/i.ytimg.com\/vt?cids=qVzl-qemXPk,D9DvGHdzw-0,z8MSyNqr17Q,84cin-Ii-e8,YEvPCHC0QJY,93rnkhPtHVs,haT95FnByes,TxJlGb15lWY,-Gp60IAOTmQ,L8K8do0c0rA,1tZTOiTpAR8,yRR7kWnXh8M\u0026w=120\u0026h=72\u0026sigh=WhHuF-5uJuRN8eCS8ipVhtNyias",
				"posy" : 320,
				"posx" : 0,
				"height" : 960,
				"width" : 128,
				"stitched" : 1
			},
			"public_name" : "IsisParenting",
			"view_count" : "26.262",
			"encrypted_id" : "YEvPCHC0QJY",
			"feature" : "related",
			"duration" : "6:13",
			"title" : "The ERGObaby Carrier: A Demonstration"
		}, {
			"watch_link" : "\/watch?v=93rnkhPtHVs",
			"thumbnail_info" : {
				"thumb_height" : 72,
				"thumb_width" : 120,
				"url" : "http:\/\/i.ytimg.com\/vt?cids=qVzl-qemXPk,D9DvGHdzw-0,z8MSyNqr17Q,84cin-Ii-e8,YEvPCHC0QJY,93rnkhPtHVs,haT95FnByes,TxJlGb15lWY,-Gp60IAOTmQ,L8K8do0c0rA,1tZTOiTpAR8,yRR7kWnXh8M\u0026w=120\u0026h=72\u0026sigh=WhHuF-5uJuRN8eCS8ipVhtNyias",
				"posy" : 400,
				"posx" : 0,
				"height" : 960,
				"width" : 128,
				"stitched" : 1
			},
			"public_name" : "Ergobaby Europe",
			"view_count" : "2.277",
			"encrypted_id" : "93rnkhPtHVs",
			"feature" : "related",
			"duration" : "6:11",
			"title" : "Instructions Ergobaby Wrap - Basic tie for a newborn (3 - 5 kg)"
		}, {
			"watch_link" : "\/watch?v=haT95FnByes",
			"thumbnail_info" : {
				"thumb_height" : 72,
				"thumb_width" : 120,
				"url" : "http:\/\/i.ytimg.com\/vt?cids=qVzl-qemXPk,D9DvGHdzw-0,z8MSyNqr17Q,84cin-Ii-e8,YEvPCHC0QJY,93rnkhPtHVs,haT95FnByes,TxJlGb15lWY,-Gp60IAOTmQ,L8K8do0c0rA,1tZTOiTpAR8,yRR7kWnXh8M\u0026w=120\u0026h=72\u0026sigh=WhHuF-5uJuRN8eCS8ipVhtNyias",
				"posy" : 480,
				"posx" : 0,
				"height" : 960,
				"width" : 128,
				"stitched" : 1
			},
			"public_name" : "Shelly Ferguson Photography",
			"view_count" : "28.425",
			"encrypted_id" : "haT95FnByes",
			"feature" : "related",
			"duration" : "5:34",
			"title" : "Wrapping Newborn Baby"
		}, {
			"watch_link" : "\/watch?v=TxJlGb15lWY",
			"thumbnail_info" : {
				"thumb_height" : 72,
				"thumb_width" : 120,
				"url" : "http:\/\/i.ytimg.com\/vt?cids=qVzl-qemXPk,D9DvGHdzw-0,z8MSyNqr17Q,84cin-Ii-e8,YEvPCHC0QJY,93rnkhPtHVs,haT95FnByes,TxJlGb15lWY,-Gp60IAOTmQ,L8K8do0c0rA,1tZTOiTpAR8,yRR7kWnXh8M\u0026w=120\u0026h=72\u0026sigh=WhHuF-5uJuRN8eCS8ipVhtNyias",
				"posy" : 560,
				"posx" : 0,
				"height" : 960,
				"width" : 128,
				"stitched" : 1
			},
			"public_name" : "Ergobaby",
			"view_count" : "190.940",
			"encrypted_id" : "TxJlGb15lWY",
			"feature" : "related",
			"duration" : "6:00",
			"title" : "How To Choose Your Ergobaby Carrier"
		}, {
			"watch_link" : "\/watch?v=-Gp60IAOTmQ",
			"thumbnail_info" : {
				"thumb_height" : 72,
				"thumb_width" : 120,
				"url" : "http:\/\/i.ytimg.com\/vt?cids=qVzl-qemXPk,D9DvGHdzw-0,z8MSyNqr17Q,84cin-Ii-e8,YEvPCHC0QJY,93rnkhPtHVs,haT95FnByes,TxJlGb15lWY,-Gp60IAOTmQ,L8K8do0c0rA,1tZTOiTpAR8,yRR7kWnXh8M\u0026w=120\u0026h=72\u0026sigh=WhHuF-5uJuRN8eCS8ipVhtNyias",
				"posy" : 640,
				"posx" : 0,
				"height" : 960,
				"width" : 128,
				"stitched" : 1
			},
			"public_name" : "Ergobaby",
			"view_count" : "228.556",
			"encrypted_id" : "-Gp60IAOTmQ",
			"feature" : "related",
			"duration" : "5:02",
			"title" : "Ergobaby - How To Front Carry with Infant Insert in the Ergobaby Carrier"
		}, {
			"watch_link" : "\/watch?v=L8K8do0c0rA",
			"thumbnail_info" : {
				"thumb_height" : 72,
				"thumb_width" : 120,
				"url" : "http:\/\/i.ytimg.com\/vt?cids=qVzl-qemXPk,D9DvGHdzw-0,z8MSyNqr17Q,84cin-Ii-e8,YEvPCHC0QJY,93rnkhPtHVs,haT95FnByes,TxJlGb15lWY,-Gp60IAOTmQ,L8K8do0c0rA,1tZTOiTpAR8,yRR7kWnXh8M\u0026w=120\u0026h=72\u0026sigh=WhHuF-5uJuRN8eCS8ipVhtNyias",
				"posy" : 720,
				"posx" : 0,
				"height" : 960,
				"width" : 128,
				"stitched" : 1
			},
			"public_name" : "Ergobaby",
			"view_count" : "139.121",
			"encrypted_id" : "L8K8do0c0rA",
			"feature" : "related",
			"duration" : "4:00",
			"title" : "How To Hip Carry in the Ergobaby Carrier"
		}, {
			"watch_link" : "\/watch?v=1tZTOiTpAR8",
			"thumbnail_info" : {
				"thumb_height" : 72,
				"thumb_width" : 120,
				"url" : "http:\/\/i.ytimg.com\/vt?cids=qVzl-qemXPk,D9DvGHdzw-0,z8MSyNqr17Q,84cin-Ii-e8,YEvPCHC0QJY,93rnkhPtHVs,haT95FnByes,TxJlGb15lWY,-Gp60IAOTmQ,L8K8do0c0rA,1tZTOiTpAR8,yRR7kWnXh8M\u0026w=120\u0026h=72\u0026sigh=WhHuF-5uJuRN8eCS8ipVhtNyias",
				"posy" : 800,
				"posx" : 0,
				"height" : 960,
				"width" : 128,
				"stitched" : 1
			},
			"public_name" : "Ergobaby Europe",
			"view_count" : "1.404",
			"encrypted_id" : "1tZTOiTpAR8",
			"feature" : "related",
			"duration" : "6:14",
			"title" : "Instructions Ergobaby Wrap - Basic Tie Infant (5 - 14 kg)"
		}, {
			"watch_link" : "\/watch?v=yRR7kWnXh8M",
			"thumbnail_info" : {
				"thumb_height" : 72,
				"thumb_width" : 120,
				"url" : "http:\/\/i.ytimg.com\/vt?cids=qVzl-qemXPk,D9DvGHdzw-0,z8MSyNqr17Q,84cin-Ii-e8,YEvPCHC0QJY,93rnkhPtHVs,haT95FnByes,TxJlGb15lWY,-Gp60IAOTmQ,L8K8do0c0rA,1tZTOiTpAR8,yRR7kWnXh8M\u0026w=120\u0026h=72\u0026sigh=WhHuF-5uJuRN8eCS8ipVhtNyias",
				"posy" : 880,
				"posx" : 0,
				"height" : 960,
				"width" : 128,
				"stitched" : 1
			},
			"public_name" : "Ergobaby",
			"view_count" : "88.428",
			"encrypted_id" : "yRR7kWnXh8M",
			"feature" : "related",
			"duration" : "3:48",
			"title" : "How To Back Carry in the Ergobaby Carrier"
		}],
		"subscription_state" : {
			"is_subscribed" : false,
			"show_button" : true,
			"subscribe_url" : {
				"channel_id" : "UC6DJ5xII2qJVlRtIDEDzEOQ",
				"url" : "\/channel_post?action_subscribe=1\u0026feature=watch"
			}
		},
		"channel_subscriber_count" : 2277,
		"should_prompt_merge_identity" : null,
		"is_distiller" : true,
		"distiller_config" : {
			"reauth" : false,
			"query" : "http:\/\/www.youtube.com\/watch?v=B7Rd1BQVzlY",
			"privacy_setting" : "PUBLIC",
			"owner_id" : "6DJ5xII2qJVlRtIDEDzEOQ",
			"page_size" : null,
			"video_id" : "B7Rd1BQVzlY",
			"signin_url" : "https:\/\/accounts.google.com\/ServiceLogin?passive=true\u0026service=youtube\u0026ltmpl=mobile\u0026continue=http%3A%2F%2Fm.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Dm%26feature%3Ddistiller%26hl%3Dde%26next%3D%252Fwatch%253Fv%253DB7Rd1BQVzlY%2526client%253Dmv-google%2526layout%253Dmobile\u0026hl=de\u0026uilel=3",
			"host_override" : "https:\/\/plus.googleapis.com",
			"channel_id" : "UC6DJ5xII2qJVlRtIDEDzEOQ"
		},
		"pyv_content" : {
			"google_cust_age" : "",
			"google_cust_gender" : "",
			"tag_for_child_directed" : false,
			"pyv_ad_channels" : "",
			"show_pyv_in_related" : false
		},
		"video" : {
			"watch_link" : "\/watch?v=B7Rd1BQVzlY",
			"thumbnail_info" : null,
			"public_name" : "Ergobaby",
			"dislikes_num" : 0,
			"likes_num" : 3,
			"view_count" : "2.182",
			"encrypted_id" : "B7Rd1BQVzlY",
			"description" : "The Newborn Basic Tie can be used with babies 6.6-11lb\/3-5kg (0 to 3 months old).\n\nThe Ergobaby Wrap is the perfect companion in those first months \u0026 beyond. Made from soft stretchy cotton (our premium 4D Stretch\u2122 material), our Ergobaby Wrap makes different carrying positions easy, comfortable \u0026 secure for you \u0026 your baby.\n\nhttp:\/\/ergoba.by\/eb-wrap",
			"longform" : false,
			"thumbnail_for_watch" : "http:\/\/i.ytimg.com\/vi\/B7Rd1BQVzlY\/hqdefault.jpg?w=320\u0026h=192\u0026sigh=lJOUNUJgDuw3b1hRoczR9RAdsLY",
			"profile_url" : "\/user\/ergobaby",
			"duration" : "6:11",
			"user_image_url" : "https:\/\/yt3.ggpht.com\/-p2VH1g50X8c\/AAAAAAAAAAI\/AAAAAAAAAAA\/X4wLgmAaFmw\/s55-c-k-no\/photo.jpg",
			"time_created_text" : "15.01.2014",
			"length_seconds" : 371,
			"title" : "Ergobaby Wrap - Newborn Basic Tie",
			"comment_count" : 0
		},
		"ptracking" : "\/\/www.youtube.com\/ptracking?video_id=B7Rd1BQVzlY\u0026pltype=contentugc\u0026ptk=youtube_none",
		"next_url" : "\/related?v=B7Rd1BQVzlY\u0026page=2",
		"ad_instream" : "",
		"allow_comments" : true,
		"allow_ratings" : true,
		"pyv_billing_url" : null
	},
	"signed_in_username" : "",
	"conn" : "wifi",
	"build_signature" : "de:900717,901802,901812,902022,906001,906957,909553,909555,911507,913434,914937,916104,918119,918121,919389,920605,921080,921410,921905,922520,922804,922806,927006,927617,927906,929237,929313,930819,931943,931952,931967,931970,932002,932256,932804,933218,934003,934004,934022,935406,935628,935707,936916,936923,937003,937417,937801,937803,937809,938626,938632,938636,938639,938643,938646,938651,939201,943303,943405,944309,944702,945815,946801"
};

