// keyboard related

	var kb_max = display.max_keycode,
		kb_min = display.min_keycode,
		keyboard_Symbols = [];

	X.GetKeyboardMapping( kb_min, (kb_max - kb_min), function(err, list) {
		list.map(function(keyboard_keycode) {
			var currentKeySymbol = keyCode_to_keySymbol[keyboard_keycode[0]];

			if( typeof currentKeySymbol !== "undefined") {
				keyboard_Symbols.push(currentKeySymbol);
			}
		});
	});


// mapping
var keySymbol_to_keyCode = x11.keySyms,
	keyCode_to_keySymbol = {};

for( var key in keySymbol_to_keyCode) {
	keyCode_to_keySymbol[ keySymbol_to_keyCode[key] ] = key;
}


// key press
if(ev.type == 2) {
	//console.log( keyCode_to_keySymbol[ev.keycode] );
	return;
}


