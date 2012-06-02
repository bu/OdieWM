var windowStore = require("./../windowStore"),
	atomStore = require("./../atomStore");

var AtomEventProcessor = function(X, ev) {
	var atom = ev.atom;
	var atoms = atomStore.expose();
	var ATOM = atomStore.exposeNames();

	switch(atom) {
		case ATOM._NET_WM_NAME:
		case ATOM.NET_WM_NAME:
		case ATOM.WM_NAME:
			X.GetProperty(0, ev.wid, atom, 31, 0, 8, function(err, data) {
				if(err) {
					return console.log(err);
				}

				var window_name = data.data.toString();
				var window_wrapper = windowStore.callWindow("Wrapper_" + ev.wid);
				var title_bar = windowStore.getWidget(window_wrapper, "title_bar");
				
				if(typeof title_bar === "undefined") {
					console.log("failed to get update titlebar");
					return;
				}

				X.GetGeometry(window_wrapper, function(err, buffer) {
					X.ChangeGC(title_bar, { foreground: 0x000000 });

					X.PolyFillRectangle(window_wrapper, title_bar, [ 0, 0, buffer.width , 100]); //, 210, 30, 10, 30]); 

					X.ChangeGC(title_bar, { foreground: 0xFFFFFF });

					X.PolyText8(window_wrapper, title_bar, 10, 13, [window_name, ", id = " + window_wrapper]); 
				});

			});
		break;

		case ATOM.WM_ICON_NAME:
			X.GetProperty(0, ev.wid, atom, 31, 0, 8, function(err, data) {
				//("atom iconname", data.data.toString());
			});
		break;

		default:
			console.log("Unproccessed ATOM", atoms[ev.atom], ev.atom);
		break;
	}
};

module.exports = AtomEventProcessor;
