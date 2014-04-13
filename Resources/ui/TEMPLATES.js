exports.babydealer = {
	properties : {
		height : Ti.UI.SIZE,
		backgroundColor : 'white'
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		properties : {
			height : '60dip',
			width : '60dp',
			image : '/appicon.png',
			left : 0,
			top : '5dp'
		}
	}, {
		type : 'Ti.UI.View',
		properties : {
			height : Ti.UI.SIZE,
			width : Ti.UI.FILL,
			left : '70dp',
			right : '15dp',
			top : 0,
			layout : 'vertical'
		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				color : '#444',
				width : Ti.UI.FILL,
				height : Ti.UI.SIZE,
				font : {
					fontSize : '19dp',
					fontFamily : 'Centabel Book',
					fontWeight : 'bold'
				},
				left : 0,
				top : 0
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'address',
			properties : {
				color : '#333',
				text : 'Address',
				font : {
					fontSize : '14dp',
					fontFamily : 'Centabel Book'

				},
				height : Ti.UI.SIZE,
				left : 0,
				top : 0
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'dist',
			properties : {
				color : 'orange',
				width : Ti.UI.FILL,
				height : Ti.UI.SIZE,
				font : {
					fontSize : '10dp',
					fontFamily : 'Centabel Book'
				},
				right : 0,
				top : 0
			}
		}]
	}]
};

exports.shopcategories = {
	properties : {
		height : Ti.UI.SIZE,
		backgroundColor : 'white'
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'thumb',
		properties : {
			height : 110,
			width : 70,
			left : 0,
			top : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'categorytitle',
		properties : {
			color : '#444',
			width : Ti.UI.FILL,
			text : 'CategoryName',
			height : 45,
			font : {
				fontSize : 19,
				fontWeight : 'bold',
				fontFamily : 'Centabel Book'
			},
			left : 80,
			top : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'categorydescription',
		text : 'Categorydescription',
		properties : {
			color : '#333',
			font : {
				fontSize : '14dp',
				fontFamily : 'Centabel Book'
			},
			left : 80,
			right : 20,
			top : 36
		}
	}]
};

exports.items = {
	properties : {
		height : Ti.UI.SIZE,backgroundColor : 'white'
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'thumb',
		properties : {
			height : 80,
			width : 50,
			left : 0,
			top : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'itemtitle',
		properties : {
			color : 'orange',
			width : Ti.UI.FILL,
			height : 45,
			font : {
				fontSize : '19dp',
				fontWeight : 'bold',
				fontFamily : 'Centabel Book'
			},
			left : '60dp',
			top : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'itemcolor',
		properties : {
			color : '#333',
			height : 20,
			font : {
				fontSize : '14dp',
				fontFamily : 'Centabel Book'
			},
			left : '60dip',
			right : '20dp',
			top : '36dip',
			bottom : '20dp'
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'itemprice',
		properties : {
			color : '#333',
			height : 20,
			font : {
				fontSize : '14dp',
				fontFamily : 'Centabel Book'
			},
			left : '60dip',
			right : '20dp',
			bottom : '6dip'
		}
	}]
};

exports.steps = {
	properties : {
		height : Ti.UI.SIZE,
		layout : 'vertical'
	},
	childTemplates : [{
		type : 'Ti.UI.Label',
		bindId : 'title',
		properties : {
			color : '#333',
			width : Ti.UI.FILL,
			height : '45dip',
			font : {
				fontSize : '19dp',
				fontWeight : 'bold',
				fontFamily : 'Centabel Book'
			},
			left : '60dp',
			top : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'meta',
		properties : {
			color : '#333',

			font : {
				fontSize : '14dp',
				fontFamily : 'Centabel Book'
			},
			left : '60dip',
			right : '20dp',
			top : '36dip',
			bottom : '20dp'
		}
	}]
};
