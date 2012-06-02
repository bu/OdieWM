var atoms = {};
var atom_names = {};

exports.add = function(id, name) {
	atoms[id] = name;
	atom_names[name] = id;

	return;
};

exports.expose = function() {
	return atoms;
};

exports.exposeNames = function() {
	return atom_names;
};

exports.delegate = function(display) {
	var X = display.client;
(function getAtoms(atomId) {
		X.GetAtomName(atomId, function(err, atom) {
			if (err) {
				return console.log(err);
			}
			
			exports.add(atomId, atom);

			return getAtoms(atomId +1);
		});
	}
)(1);
};
