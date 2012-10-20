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
			return windowStore.registerWindow(ev.wid, ev.wid);
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
		
		// Map Notify
		case 19:
			console.log("Map Notify");
			return;
		break;
		
		// MappingRequest
		case 20:
			console.log("Map Request");
			return;
			//return ConfigureRequest(XClient, ev);
		break;

		case 21:
			console.log(ev);
			return;
		break;

		case 22:
			console.log(ev);
			return;
		break;

		// ConfigureReqest
		case 23:
			console.log(ev);
			return ConfigureRequest(XClient, ev);
		break;
		
		// Properity Notify
		case 28:
			console.log("event 28", ev);
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
