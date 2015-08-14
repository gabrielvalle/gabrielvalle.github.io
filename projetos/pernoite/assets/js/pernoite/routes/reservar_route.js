
Pernoite.ReservarRoute = (function() {

	//PAGE LOADING TRANSITION
	var TRANSITION_DURATION = 1000;

	function ReservarRoute(container) {

		this.container = container;
  		this.loadingElement = this.container.find('.loading');
  		this.pageElement = this.container.find('.page');
		
	}

	ReservarRoute.fn = ReservarRoute.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN RESERVAR
  /*-----------------------------------------------------------------*/

  ReservarRoute.fn.run = function(callback) {
    console.log('ReservarRoute run executed');
  	
    this.transition();

  };

  /*-----------------------------------------------------------------*/
  /* TRANSITION
  /*-----------------------------------------------------------------*/

  ReservarRoute.fn.transition = function() {
    this.loadingElement.fadeOut(TRANSITION_DURATION);
  	this.pageElement.fadeIn(TRANSITION_DURATION);
  };

	
	return ReservarRoute;
})();
