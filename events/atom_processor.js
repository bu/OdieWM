var windowStore = require("./../windowStore");

var AtomEventProcessor = function(X, ev) {
	var atom = ev.atom;

	switch(atom) {
		case 39:
			X.GetProperty(0, ev.wid, ev.atom, 31, 0, 8, function(err, data) {
				if(err) {
					return console.log(err);
				}

				var window_name = data.data.toString();
				var window_wrapper = windowStore.callWindow("Wrapper_" + ev.wid);
				var title_bar = windowStore.getWidget(window_wrapper, "title_bar");

				console.log(window_name, window_wrapper, title_bar);
				
				if(typeof title_bar === "undefined") {
					console.log("failed to get update titlebar");
					return;
				}

				X.GetGeometry(window_wrapper, function(err, buffer) {
					X.ChangeGC(title_bar, { foreground: 0x000000 });

					X.PolyFillRectangle(window_wrapper, title_bar, [ 0, 0, buffer.width , 100]); //, 210, 30, 10, 30]); 

					X.ChangeGC(title_bar, { foreground: 0xFFFFFF });

					X.PolyText8(window_wrapper, title_bar, 10, 13, [window_name]); 
				});

			});
		break;

		default:
			console.log(ev);
		break;
	}
};

module.exports = AtomEventProcessor;
