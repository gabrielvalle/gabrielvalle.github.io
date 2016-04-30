Pernoite.IndexRoute = (function(){

	//PAGE LOADING TRANSITION
	var TRANSITION_DURATION = 1000;

  function IndexRoute(container) {
  	this.container = container;
  	this.loadingElement = this.container.find('.loading');
  	this.pageElement = this.container.find('.page');
    this.mostraOpcoes = this.container.find('#mostraOpcoes');
    this.datepickerSetas = this.container.find('.datepicker-calendar-header .prev');

  };

  IndexRoute.fn = IndexRoute.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN INDEX
  /*-----------------------------------------------------------------*/

  IndexRoute.fn.run = function(callback) {
    console.log('indexRoute run executed');
  	
    this.maisOpcoes();
    this.inputPesquisa();

    this.transition();

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

  IndexRoute.fn.transition = function() {
    this.loadingElement.fadeOut(TRANSITION_DURATION);
  	this.pageElement.fadeIn(TRANSITION_DURATION);
  };

  /*-----------------------------------------------------------------*/
  /* INPUT PESQUISA
  /*-----------------------------------------------------------------*/

  IndexRoute.fn.inputPesquisa = function() {

     var countries = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      limit: 10,
      prefetch: {
        // url points to a json file that contains an array of country names, see
        // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
        url: '../data/countries.json',
        // the json file contains an array of strings, but the Bloodhound
        // suggestion engine expects JavaScript objects so this converts all of
        // those strings
        filter: function(list) {
          return $.map(list, function(country) { return { name: country }; });
        }
      }
    });
     
    // kicks off the loading/processing of `local` and `prefetch`
    countries.initialize();
     
    // passing in `null` for the `options` arguments will result in the default
    // options being used
    $('.input-search .typeahead').typeahead(null, {
      name: 'countries',
      displayKey: 'name',
      // `ttAdapter` wraps the suggestion engine in an adapter that
      // is compatible with the typeahead jQuery plugin
      source: countries.ttAdapter()
    });

  };

  /*-----------------------------------------------------------------*/
  /* PESQUISA - MOSTAR MAIS OPÇÕES
  /*-----------------------------------------------------------------*/
  
  IndexRoute.fn.maisOpcoes = function() {
      this.mostraOpcoes.on('click', function(event) {
        event.preventDefault();
        $('.mais-opcoes-container').slideToggle();
      });
  };


  return IndexRoute;

})();
