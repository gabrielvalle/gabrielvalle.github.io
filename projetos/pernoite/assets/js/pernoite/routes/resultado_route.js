
Pernoite.ResultadoRoute = (function() {
	
	//PAGE LOADING TRANSITION
	var TRANSITION_DURATION = 1000;

	var mapas = new Pernoite.Mapas(document.body);

	function ResultadoRoute(container) {

	this.container = container;
  	this.loadingElement = this.container.find('.loading');
  	this.pageElement = this.container.find('.page');

	}

	ResultadoRoute.fn = ResultadoRoute.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN RESULTADO DA BUSCA
  /*-----------------------------------------------------------------*/

	ResultadoRoute.fn.run = function(callback) {
		console.log('ResultadoRoute run executed');

		this.transition();
		mapas.run();

		$('#timepicker3').timepicker({
	      minuteStep: 5,
	      showInputs: false,
	      disableFocus: true
	    });

	    $("#myDatepickerInput").datepicker();  
	};

  /*-----------------------------------------------------------------*/
  /* TRANSITION
  /*-----------------------------------------------------------------*/

	ResultadoRoute.fn.transition = function() {
		this.loadingElement.fadeOut(TRANSITION_DURATION);
		this.pageElement.fadeIn(TRANSITION_DURATION);
	};

  /*-----------------------------------------------------------------*/
  /* 
  /*-----------------------------------------------------------------*/
	
	return ResultadoRoute;

})();
