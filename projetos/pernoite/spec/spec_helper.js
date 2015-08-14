var Pernoite = {
	autorun: false
};

beforeEach(function(){
	$.fx.off = true;
	$('#jasmine-sample').empty();
	$('<div id="jasmine-sample"></div>').appendTo('body');
});

afterEach(function(){
	$('#jasmine-sample').empty();
});

function keyDownEvent(keyCode){
	event = $.Event('keydown');
	event.which = keyCode;
	event.keyCode = keyCode;

	return event;
};

function fixture() {
  var container = $('<div>');

  [].slice.call(arguments).forEach(function(selector){
    container.affix(selector);
  });

  return container;
}
