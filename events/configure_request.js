var x11 = require("x11");
var windowStore = require("../windowStore");

module.exports = function(X, ev) {
	// get the root window of Odie
	var wm_root = windowStore.callWindow("OdieRoot");

	// create a layer on appliaction window
	var window_wrapper_id = X.AllocID();

	X.CreateWindow(window_wrapper_id, wm_root, 10, 10, ev.width, ev.height + 20, 1, 0, 0, 0, {
		backgroundPixel: 0xFFFFFF,
		borderPixel: 0x000000,
		eventMask: x11.eventMask.Exposure | x11.eventMask.Button1Motion | x11.eventMask.ButtonPress | x11.eventMask.ButtonRelease
	});
	
	// listen to propertychange, eg: WM_NAME
	X.ChangeWindowAttributes(ev.wid, {
		eventMask: x11.eventMask.PropertyChange
	});
	
	// register to windowStore
	windowStore.registerWindow(window_wrapper_id, "Wrapper_" + ev.wid);
	windowStore.registerWindow(ev.wid, window_wrapper_id);
	
	// reparent the application window to decorator
	X.ReparentWindow(ev.wid, window_wrapper_id, 0, 20);
	
	// show them on screen
	X.MapWindow(window_wrapper_id);
	X.MapWindow(ev.wid);
	
	// show text of current window_id
	var gc_id = X.AllocID();
	X.CreateGC(gc_id, window_wrapper_id, { foreground: 0x000000 });
	X.PolyText8(window_wrapper_id, gc_id, 10, 10, ["Window: " + window_wrapper_id + "," + ev.wid + "(" + ev.x + "," + ev.y + ")"]); 

	console.log("Create Application Window:" + window_wrapper_id + "," + ev.wid + ", gc_id: " + gc_id);

	return;
};
