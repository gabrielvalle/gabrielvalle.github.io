
Pernoite.UsuarioRoute = (function() {

	//PAGE LOADING TRANSITION
	var TRANSITION_DURATION = 1000;

	var mapas = new Pernoite.Mapas(document.body);

	function UsuarioRoute(container) {

		this.container = container;
	  	this.loadingElement = this.container.find('.loading');
	  	this.pageElement = this.container.find('.page');
		
	}

	UsuarioRoute.fn = UsuarioRoute.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN PAGINA DO HOTEL
  /*-----------------------------------------------------------------*/

	UsuarioRoute.fn.run = function(callback) {
		console.log('UsuarioRoute run executed');

		this.transition();
		  
	};

  /*-----------------------------------------------------------------*/
  /* TRANSITION
  /*-----------------------------------------------------------------*/

	UsuarioRoute.fn.transition = function() {
		this.loadingElement.fadeOut(TRANSITION_DURATION);
		this.pageElement.fadeIn(TRANSITION_DURATION);
	};
	
	return UsuarioRoute;
})();
