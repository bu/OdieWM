
var windowMapping = {};
var windowLayers = [];

exports.registerWindow = function(window_id, alias, position) {

	if(!alias) {
		alias = window_id;
	}

	if(!position) {
		position = { x: 0, y: 0 };
	}

	windowMapping[alias] = { wid: window_id, position: position };

	return true;
};

exports.unregisterWindow = function (window_id)  {
	console.log("try to unregister " + window_id);
};

exports.getWidget = function(wid, widget_type) {
	var targetWindow = exports.getAliasByID(wid);

	if(typeof windowMapping[targetWindow].widgets === "undefined") {
		windowMapping[targetWindow].widgets = {};
	}

	return windowMapping[targetWindow].widgets[widget_type];
}



exports.addWidget = function(wid, widget_type, xid) {
	var targetWindow = exports.getAliasByID(wid);

	if(typeof windowMapping[targetWindow].widgets === "undefined") {
		windowMapping[targetWindow].widgets = {};
	}

	windowMapping[targetWindow].widgets[widget_type] = xid;

	return true;
}

exports.updateLayers = function(X) {
	var wm_root = exports.callWindow("OdieRoot");

	X.QueryTree(wm_root, function(err, tree) {
		if(err) {
			return console.log(err);
		}

		exports.storeLayers(tree.children);
	});
};

exports.storeLayers = function(layers) {
	windowLayers = layers;

	return true;
};

exports.callWindow = function(alias) {
	var targetWindow = windowMapping[alias];

	if(typeof targetWindow === "undefined") {
		return undefined;
	} 

	return windowMapping[alias].wid;
};

exports.expose = function() {
	return windowMapping;
};

exports.getPosition = function(wid) {
	var alias = exports.getAliasByID(wid);
	return windowMapping[alias].position;
};

exports.updatePosition = function(wid, position) {
	var alias = exports.getAliasByID(wid);
	
	if(typeof windowMapping[alias] !== "undefined") {
		windowMapping[alias].position = position;
	}

	return true;
};

exports.getAliasByID = function(wid) {
	for(var key in windowMapping) {
		if(windowMapping[key].wid === wid) {
			return key;
		}
	}

	return false;
}
