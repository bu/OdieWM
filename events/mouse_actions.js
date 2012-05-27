
var dragStart = null;

module.exports = function(X, ev) {
	
	if(ev.type == 4) {
	
		// close window
		if(ev.child && ev.child > 0 && ev.keycode === 3) {
			X.DestroyWindow(ev.child);
			return;
		}
		
		// quit Odie
		if(ev.child == 0 && ev.keycode === 3) {
			X.terminate();
			return;
		}
		
		// move window to front if clicked within decorator
		// TODO: it should enable us to click anywhere in the window
		if(ev.child && ev.child > 0 && ev.keycode === 1) {
			X.SetStackMode(ev.child, 2);
		}

		dragStart = ev;

		return;
	}

	console.log(ev);
};
