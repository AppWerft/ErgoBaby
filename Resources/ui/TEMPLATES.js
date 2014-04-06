exports.babydealer = {
	properties : {
		height : '100dp',
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		properties : {
			height : '60dip',
			width : '60dp',
			image : '/appicon.png',
			left : 0,
			top : 0
		}
	}, {
		type : 'Ti.UI.View',
		properties : {
			height : Ti.UI.SIZE,
			width : Ti.UI.FILL,
			left : '70dp',
			top : 0,layout:'vertical'
		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				color : 'orange',
				width : Ti.UI.FILL,
				height : '45dip',
				font : {
					fontSize : '19dp',
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
					fontSize : '14dp'

				},
				left : 0,
				top :  '5dp'
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'dist',
			text : 'Distance',
			properties : {
				color : '#333',
				width : Ti.UI.SIZE,
				height : Ti.UI.SIZE,
				font : {
					fontSize : '12dp',

				},
				right : '10dip',
				bottom : '2dp'
			}
		}]
	}]
};

exports.cats = {
	properties : {
		height : Ti.UI.SIZE
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'image',
		properties : {
			height : '110dp',
			width : '70dp',
			left : 0,
			top : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'title',
		properties : {
			color : 'orange',
			width : Ti.UI.FILL,
			height : '45dip',
			font : {
				fontSize : '19dp',
				fontWeight : 'bold'
			},
			left : '80dp',
			top : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'description',
		properties : {
			color : '#333',

			font : {
				fontSize : '14dp'
			},
			left : '80dip',
			right : '20dp',
			top : '36dip'
		}
	}]
};

exports.items = {
	properties : {
		height : Ti.UI.SIZE
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'image',
		properties : {
			height : '80dp',
			width : '50dp',
			left : 0,
			top : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'title',
		properties : {
			color : 'orange',
			width : Ti.UI.FILL,
			height : '45dip',
			font : {
				fontSize : '19dp',
				fontWeight : 'bold'
			},
			left : '60dp',
			top : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'color',
		properties : {
			color : '#333',

			font : {
				fontSize : '14dp'
			},
			left : '60dip',
			right : '20dp',
			top : '36dip',
			bottom : '20dp'
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'price',
		properties : {
			color : '#333',
			font : {
				fontSize : '14dp'
			},
			left : '60dip',
			right : '20dp',
			bottom : '6dip'
		}
	}]
};