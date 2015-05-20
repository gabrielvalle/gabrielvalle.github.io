Pernoite.ContactRoute = (function(){

	//PAGE LOADING TRANSITION
	var TRANSITION_DURATION = 1000;

  function ContactRoute(container) {
  	this.container = container;
  	this.loadingElement = this.container.find('.loading');
  	this.pageElement = this.container.find('.page');

  };

  ContactRoute.fn = ContactRoute.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN CONTACT
  /*-----------------------------------------------------------------*/

  ContactRoute.fn.run = function(callback) {
  	console.log('contact run executed');
  	this.transition();
  };

  /*-----------------------------------------------------------------*/
  /* TRANSITION
  /*-----------------------------------------------------------------*/

  ContactRoute.fn.transition = function() {
    this.loadingElement.fadeOut(TRANSITION_DURATION);
  	this.pageElement.fadeIn(TRANSITION_DURATION);
  };
  
  return ContactRoute;

})();
