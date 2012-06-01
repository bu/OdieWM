var ConfigureRequest = require("./configure_request"),
	MouseController = require("./mouse_actions"),
	AtomEventProcessor = require("./atom_processor"),
	windowStore = require("../windowStore");

var XClient;

var Emitter = function(ev) {
	switch(ev.type) {
	
		// Button press
		case 4:
		case 5:
		case 6:
			return MouseController(XClient, ev);
		break;

		// Expose Request
		case 12:
			return;
		break;

		// Create notifiy
		case 16:
			windowStore.registerWindow(ev.wid, ev.seq)
		break;

		// Destory notify
		case 17:
			console.log(ev);
			// check if there has a decorator
			var decorator = windowStore.callWindow("Wrapper_" + ev.wid1);

			console.log("XXX" ,decorator);

			if( typeof decorator !== "undefined" ) {
				XClient.DestroyWindow(decorator);
				windowStore.unregisterWindow(decorator);
			}

			windowStore.unregisterWindow(ev.wid1);

			return;
		break;
		
		// MappingRequest
		case 20:
			console.log("Map");
			return ConfigureRequest(XClient, ev);
		break;

		// ConfigureReqest
		case 23:
			return ConfigureRequest(XClient, ev);
		break;
		
		// Properity Notify
		case 28:
			return AtomEventProcessor(XClient, ev);
		break;
		
		// Default
		default:
			console.log("event", ev);
		break;
	}
}

exports.Emitter = Emitter;
exports.Error = function(err) {
	console.log(err);
};

exports.setXClient = function(X) {
	XClient = X;
};
