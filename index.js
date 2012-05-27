// Odie - a window manager
//
// author: Buwei Chiu <bu@hax4.in> 

var x11 = require("x11");

// odie processor
var Odie_Events = require("./events/"),
	Odie_WindowStore = require("./windowStore");
	
x11.createClient(function(display) {
	// X client
	var X = display.client;
	
	// Root window
	var root = display.screen[0].root;
	Odie_WindowStore.registerWindow(root, "ScreenRoot");
	
	// We make these event redirect to root
	X.ChangeWindowAttributes(root, {
		eventMask: x11.eventMask.SubstructureRedirect | x11.eventMask.SubstructureNotify
	});
	
	// Create a window under all windows but root (window manager window)
	var wm_root = X.AllocID();
	X.CreateWindow(wm_root, root, 0, 0, display.screen[0].pixel_width, display.screen[0].pixel_height, 0, 0, 0, 0, { backgroundPixel: 0xFFFFFF, eventMask: x11.eventMask.Exposure  | x11.eventMask.Button1Motion | x11.eventMask.ButtonPress | x11.eventMask.ButtonRelease });
	X.MapWindow(wm_root);
	Odie_WindowStore.registerWindow(wm_root, "OdieRoot");
	
	// put a string on window
	var gc_id = X.AllocID();
	X.CreateGC(gc_id, wm_root, { foreground: 0x000000 });
	X.PolyText8(wm_root, gc_id, 10, 10, ["Window: " + wm_root + ",gc:" + gc_id]);
	
	// ready to call odie
	Odie_Events.setXClient(X);

	X.on("event", Odie_Events.Emitter);
	X.on("error", Odie_Events.Error);
});
