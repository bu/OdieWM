// modules
var exec = require("child_process").exec;
var windowStore = require("../windowStore");

var dragStart = null;

module.exports = function(X, ev) {
	
	if(ev.type == 4) {
		// close window
		if(ev.child && ev.child > 0 && ev.keycode === 3) {
			console.log("debug: close  bbu:" , ev.child);
			X.DestroyWindow(ev.child);
			return;
		}

		if(ev.child == 0 && ev.keycode == 1) {
			exec("lxterminal", { env: { DISPLAY: ":0", HOME: "/home/bu"} } );
			return;
		}
		
		// quit Odie
		if(ev.child == 0 && ev.keycode === 3) {
			X.terminate();
			process.exit(0);

			return;
		}
		
		// move window to front if clicked within decorator
		// TODO: it should enable us to click anywhere in the window
		if(ev.child && ev.child > 0 && ev.keycode === 1) {
			X.RaiseWindow(ev.child);
			windowStore.updateLayers(X);
		}

		dragStart = ev;

		return;

	} else if(ev.type === 5) {
		
		dragStart = null;

		return;

	} else if (ev.type === 6 && dragStart !== null) {
		var new_x = dragStart.rootx + (ev.rootx - dragStart.rootx);
		var new_y = dragStart.rooty + (ev.rooty - dragStart.rooty);

		X.MoveWindow(dragStart.child, new_x, new_y);

		windowStore.updatePosition(dragStart.child, { x: new_x, y: new_y });

		return;
	}  else if (ev.type == 6) {
		console.log("ev type6" , ev);
	}
};
