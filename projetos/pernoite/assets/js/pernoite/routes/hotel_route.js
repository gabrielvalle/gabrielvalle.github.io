
Pernoite.HotelRoute = (function() {

	//PAGE LOADING TRANSITION
	var TRANSITION_DURATION = 1000;

	var mapas = new Pernoite.Mapas(document.body);

	function HotelRoute(container) {

		this.container = container;
	  	this.loadingElement = this.container.find('.loading');
	  	this.pageElement = this.container.find('.page');
		
	}

	HotelRoute.fn = HotelRoute.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN PAGINA DO HOTEL
  /*-----------------------------------------------------------------*/

	HotelRoute.fn.run = function(callback) {
		console.log('HotelRoute run executed');

		this.transition();
		mapas.run();
		  
	};

  /*-----------------------------------------------------------------*/
  /* TRANSITION
  /*-----------------------------------------------------------------*/

	HotelRoute.fn.transition = function() {
		this.loadingElement.fadeOut(TRANSITION_DURATION);
		this.pageElement.fadeIn(TRANSITION_DURATION);
	};
	
	return HotelRoute;
})();
