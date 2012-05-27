
var windowMapping = {};

exports.registerWindow = function(window_id, alias) {

	if(!alias) {
		alias = window_id;
	}

	windowMapping[alias] = window_id;

	return true;
};

exports.unregisterWindow = function (window_id)  {
	console.log("try to unregister " + window_id);
};

exports.callWindow = function(alias) {
	console.log(alias);
	return windowMapping[alias];
};

exports.expose = function() {
	return windowMapping;
};

exports.getAliasByID = function(wid) {
	for(var key in windowMapping) {
		if(windowMapping[key] === wid) {
			return key;
		}
	}

	return false;
}
