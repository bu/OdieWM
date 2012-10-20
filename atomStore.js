var log = require("util").log;

var atoms = {};
var atom_names = {};

var X = null;

exports.add = function(id, name) {
	// if atom is registered
	if(id in atoms) {
		return;
	}

	atoms[id] = name;
	atom_names[name] = id;

	return;
};

exports.destroy = function() {
	atoms = {};
	atom_names = {};
};

exports.expose = function() {
	return atoms;
};

exports.exposeNames = function() {
	return atom_names;
};

exports.delegate = function(display) {
	if(typeof display.client === "undefined" && typeof display.display !== "undefined") {
		X = display.display.client;
	} else {
		X = display.client;
	}
};

exports.scanAtoms = function(callback) {
	log("Scanning atoms....");

	if(typeof callback === "undefined") {
		var callback = function() { /* empty function for callback */ };
	}

	(function scan(atomId, cb) {

		X.GetAtomName(atomId, function(err, atom) {
			if (err) {
				return cb();
			}

			exports.add(atomId, atom);

			return process.nextTick(function() {
				return scan(atomId+1, cb);
			});
		});

	})(1, callback);
}
