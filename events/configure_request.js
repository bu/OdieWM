var x11 = require("x11");
var windowStore = require("../windowStore");

module.exports = function(X, ev) {
	// get the root window of Odie
	var wm_root = windowStore.callWindow("OdieRoot");

	// create a layer on appliaction window
	var window_wrapper_id = X.AllocID();

	var client_width = (typeof ev.width === "undefined") ? 300 : ev.width;
	var client_height = (typeof ev.height === "undefined") ? 300 : ev.height;

	X.CreateWindow(window_wrapper_id, wm_root, 10, 10, client_width, client_height + 20, 1, 0, 0, 0, {
		backgroundPixel: 0xCCCCCC,
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
	
	windowStore.updatePosition(window_wrapper_id, { x: 10, y: 10 });
	windowStore.updateLayers(X);

	// resize window (because x server will stop all procedure on window creation after we grab the SubstructureRedirect event
	X.ResizeWindow(ev.wid, client_width, client_height);

	// reparent the application window to decorator
	X.ChangeSaveSet(1, ev.wid);
	X.ReparentWindow(ev.wid, window_wrapper_id, 0, 20);
	
	// show them on screen
	X.MapWindow(window_wrapper_id);
	X.MapWindow(ev.wid);
	
	// show text of current window_id
	var gc_id = X.AllocID();
	X.CreateGC(gc_id, window_wrapper_id, { foreground: 0x000000 });
	X.PolyText8(window_wrapper_id, gc_id, 10, 10, ["Window: " + window_wrapper_id + "," + ev.wid + "(" + ev.x + "," + ev.y + ")"]); 

	windowStore.addWidget(window_wrapper_id, "title_bar", gc_id);

	console.log("Create Application Window:" + window_wrapper_id + "," + ev.wid + ", gc_id: " + gc_id);

	return;
};
