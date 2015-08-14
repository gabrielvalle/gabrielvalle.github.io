// Initialize our namespace.
var Pernoite = Pernoite || {autorun: true};

$(function() {
	var app = new Pernoite.Application(document.body);

	if (Pernoite.autorun) {
		app.run(location);
	}
});