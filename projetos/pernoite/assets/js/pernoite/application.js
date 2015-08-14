Pernoite.Application = (function() {
	
  function Application(container) {
	
  this.container = $(container);
  this.languageSelected = this.container.find('.language-selected');
  this.languageChange = this.languageSelected.find('.dropdown-menu-language li');
  this.languageCode = this.languageSelected.find('button span');

	this.routes = {

     'gabrielvalle.com.br/projetos/pernoite/public/': Pernoite.IndexRoute
   , 'gabrielvalle.com.br/projetos/pernoite/public/temp.html': Pernoite.IndexRoute 
   , 'gabrielvalle.com.br/projetos/pernoite/public/hotel.html': Pernoite.HotelRoute
   , 'gabrielvalle.com.br/projetos/pernoite/public/resultado.html': Pernoite.ResultadoRoute
   , 'gabrielvalle.com.br/projetos/pernoite/public/reservar.html': Pernoite.ReservarRoute
   , 'gabrielvalle.com.br/projetos/pernoite/public/usuario.html': Pernoite.UsuarioRoute
   , 'gabrielvalle.com.br/projetos/pernoite/public/gerenciador.html': Pernoite.GerenciadorRoute
   , 'gabrielvalle.com.br/projetos/pernoite/public/contato.html': Pernoite.ContactRoute

   //   '/pernoite/public/': Pernoite.IndexRoute
   // , '/pernoite/public/hotel.html': Pernoite.HotelRoute
   // , '/pernoite/public/resultado.html': Pernoite.ResultadoRoute
   // , '/pernoite/public/reservar.html': Pernoite.ReservarRoute
   // , '/pernoite/public/usuario.html': Pernoite.UsuarioRoute
   // , '/pernoite/public/gerenciador.html': Pernoite.GerenciadorRoute
   // , '/pernoite/public/contato.html': Pernoite.ContactRoute

  };

  };

  Application.fn = Application.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN APPLICATION
  /*-----------------------------------------------------------------*/

  Application.fn.run = function(location) {
    var RouteClass = this.routes[location.pathname];

    console.log(location.pathname);
    
    if (RouteClass) {
      var route = new RouteClass(this.container);
      // this.clickTableRow();
      this.ajaxCarousel();
      
      this.dropdownStop();
      this.translate();
      this.flowType();
      this.facebookConnect();
      this.animateDropdown('.clickDrop', 'fadeIn');
      this.notyRun('#botaoPesquisar', 'Erro de Preencimento no Formulário de Busca');
      this.notyQuestion('.remover-favorito', 'Deseja realmente excluir?');

      route.run();

    } else {
      console.log(location.pathname, "doesn't have a route function");
    }
  };

  /*-----------------------------------------------------------------*/
  /* BUTTON LANGUAGE TRANSLATE
  /*-----------------------------------------------------------------*/

  Application.fn.translate = function() {
    var _this = this;
    this.languageChange.each(function() {
      if($(this).attr('class') == 'active'){
        var active = $(this).find('a').data('language');
        _this.languageCode.html(active);
      }
    })
    this.languageChange.find('a').click(function(event) {
      event.preventDefault();
      var active = $(this).data('language');
      _this.languageChange.removeClass('active');
      $(this).parent('li').addClass('active');
      _this.languageCode.html(active);
    });
  };

  /*-----------------------------------------------------------------*/
  /* DROPDOWN STOP PROPAGATION
  /*-----------------------------------------------------------------*/

  Application.fn.dropdownStop = function() {
    $('.dropdown-menu-login').on("click", function(e){ e.stopPropagation(); });
    $('.dropdown-menu-language').on("click", function(e){ e.stopPropagation(); });
    $('.dropdown-menu-mensagens').on("click", function(e){ e.stopPropagation(); });

    $('.dropdown-menu-visualizacoes').on("click", function(e){
      e.stopPropagation();
      $('.area-visualizados .controls .left').on("click", function(e){
        $('#carousel-visualizados').carousel('prev');
      });
      $('.area-visualizados .controls .right').on("click", function(e){
        $('#carousel-visualizados').carousel('next');
      });
    });

    $('.dropdown-menu-favoritos').on("click", function(e){
      e.stopPropagation();
      $('.area-favoritos .controls .left').on("click", function(e){
        $('#carousel-favoritos').carousel('prev');
      });
      $('.area-favoritos .controls .right').on("click", function(e){
        $('#carousel-favoritos').carousel('next');
      });
    });

    $('.area-comece-sua-busca .controls .left').on("click", function(e){
      console.log('left');
      $('#carousel-em-destaque, #carousel-mais-visualizados, #carousel-melhor-avaliados').carousel('prev');
    });
    $('.area-comece-sua-busca .controls .right').on("click", function(e){
      console.log('right');
      $('#carousel-em-destaque, #carousel-mais-visualizados, #carousel-melhor-avaliados').carousel('next');
    });

  };

  /*-----------------------------------------------------------------*/
  /* ANIMATE DROPDOWN
  /*-----------------------------------------------------------------*/

  Application.fn.animateDropdown = function(element, animation) {
        
    $(element).click(function() {
      $('.animaDrop').addClass(animation);
        var wait = window.setTimeout( function(){
        $('.animaDrop').removeClass(animation)}, 800
      );
    });
     
  };

  /*-----------------------------------------------------------------*/
  /* PEGA CLICK DA TABLE ROW NA AREA DE MENSAGENS
  /*-----------------------------------------------------------------*/

  Application.fn.clickTableRow = function() {

    $(".clickable-row").click(function() {
        window.document.location = $(this).data("href");
    });
      
  };

  /*-----------------------------------------------------------------*/
  /* FLOWTYPE - TIPOGRAFIA RESPONSIVA
  /*-----------------------------------------------------------------*/

  Application.fn.flowType = function() {

    $('body').flowtype({
      minimum   : 500,
      maximum   : 1200,
      minFont   : 18,
      maxFont   : 40,
      fontRatio : 40
    });

  };

  /*-----------------------------------------------------------------*/
  /* ALERTAS
  /*-----------------------------------------------------------------*/

  Application.fn.notyRun = function(element, msg) {

    _this = this;

    $(element).on("click", function(event){ 
      event.preventDefault(); 
      var n = noty({
          layout: 'topRight',
          theme: 'defaultTheme', // or 'relax'
          type: 'error',
          text: msg, // can be html or string
          dismissQueue: true, // If you want to use queue feature set this true
          template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
          animation: {
              open: 'animated fadeInRight', // or Animate.css class names like: 'animated bounceInLeft'
              close: 'animated fadeOutRightBig', // or Animate.css class names like: 'animated bounceOutLeft'
              easing: 'swing',
              speed: 500 // opening & closing animation speed
          },
          timeout: false, // delay for closing event. Set false for sticky notifications
          force: false, // adds notification to the beginning of queue when set to true
          modal: false,
          maxVisible: 5, // you can set max visible notification for dismissQueue true option,
          killer: false, // for close all notifications before show
          closeWith: ['click', 'hover'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
          callback: {
              onShow: function() {},
              afterShow: function() {},
              onClose: function() {},
              afterClose: function() {},
              onCloseClick: function() {},
          },
          buttons: false // an array of buttons
      });
    });
     
  };

  /*-----------------------------------------------------------------*/
  /* PERGUNTAS
  /*-----------------------------------------------------------------*/

  Application.fn.notyQuestion = function(element, msg) {

    _this = this;

    $(element).on("click", function(event){ 
      event.preventDefault();

      var n = noty({
            text        : msg,
            type        : 'alert',
            dismissQueue: true,
            layout      : 'center',
            theme       : 'defaultTheme',
            buttons     : [
                {addClass: 'btn btn-primary btn-sm', text: 'Sim', onClick: function ($noty) {
                    $noty.close();
                    noty({dismissQueue: true, force: true, layout: 'topRight', theme: 'defaultTheme', text: 'Você removeu o item dos favoritos', type: 'success', closeWith: ['click', 'hover'], animation: {
              open: 'animated fadeInRight', // or Animate.css class names like: 'animated bounceInLeft'
              close: 'animated fadeOutRightBig', // or Animate.css class names like: 'animated bounceOutLeft'
              easing: 'swing',
              speed: 500 // opening & closing animation speed
          },});
                }
                },
                {addClass: 'btn btn-danger btn-sm', text: 'Não', onClick: function ($noty) {
                    $noty.close();
                    noty({dismissQueue: true, force: true, layout: 'topRight', theme: 'defaultTheme', text: 'Você manteve o item nos favoritos', type: 'error', closeWith: ['click', 'hover'], animation: {
              open: 'animated fadeInRight', // or Animate.css class names like: 'animated bounceInLeft'
              close: 'animated fadeOutRightBig', // or Animate.css class names like: 'animated bounceOutLeft'
              easing: 'swing',
              speed: 500 // opening & closing animation speed
          },});
                }
                }
            ]
        });

    });
     
  };

  /*-----------------------------------------------------------------*/
  /* FACEBOOK CONNECT
  /*-----------------------------------------------------------------*/

  Application.fn.facebookConnect = function() {

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
      
  };

  /*-----------------------------------------------------------------*/
  /* COROUSEL ADVANCED ITEM
  /*-----------------------------------------------------------------*/

  Application.fn.caroulselAdvanced = function() {

    $('.carousel-showmanymoveone .item').each(function(){
      var itemToClone = $(this);

      for (var i=1;i<4;i++) {
        itemToClone = itemToClone.next();

        // wrap around if at end of item collection
        if (!itemToClone.length) {
          itemToClone = $(this).siblings(':first');
        }

        // grab item, clone, add marker class, add to collection
        itemToClone.children(':first-child').clone()
          .addClass("cloneditem-"+(i))
          .appendTo($(this));
      }
    });
      
  };

  /*-----------------------------------------------------------------*/
  /* AJAX CAROUSEL
  /*-----------------------------------------------------------------*/

  Application.fn.ajaxCarousel = function() {
      var self = this;

      var str = "";
    
        $.ajax({
          url:  'data/destaque.json',
          type: 'GET',
          dataType: 'json',
          data: ""
        })

    .done(function(result) {
      if(result){

        var i = 1;
        jQuery.each(result, function(index, value) {

          if(i==1) {

            str +=  '<div class="item active">\n'; 

          }else{

            str +=  '<div class="item">\n'; 

          }

                                      
            str += '  <div class="item-content">\n';
            str += '    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">\n';
            str += '      <div class="col-lg-9 col-md-9 col-sm-9 col-xs-10">\n';
            str += '        <div class="row">\n';
            str += '          <div>\n';
            str += '            <h5 class="estabelecimento">' + value.nome +'</h5>\n';
            str += '            <p class="quarto">Quarto Standart</p>\n';
            str += '          </div>\n';
            str += '        </div>\n';
            str += '      </div>\n';
            str += '      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-2">\n';
            str += '        <div class="row">\n';
            str += '          <div class="nota-avaliacao">\n';
            str += '            <p><span class="glyphicon glyphicon-star" aria-hidden="true"></span>&nbsp;8.7</p>\n';
            str += '            <p>Fabuloso</p>\n';
            str += '          </div>\n';
            str += '        </div>\n';
            str += '      </div>\n';
            str += '      <div class="photo">\n';
            str += '        <img src="' + value.imagem_destaque + '" class="img-responsive" alt="" />\n';
            str += '      </div>\n';
            str += '      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-9">\n';
            str += '        <div class="row">\n';
            str += '          <h6 class="bairro">' + value.bairro +'</h6>\n';
            str += '        </div>\n';
            str += '      </div>\n';
            str += '      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-3">\n';
            str += '        <div class="row">\n';
            str += '          <p class="preco">R$ 110,00</p>\n';
            str += '        </div>\n';
            str += '      </div>\n';
            str += '      <button type="button" class="btn btn-sm btn-azul-escuro btn-block">Reservar</button>\n';
            str += '      <div class="col-lg-12">\n';
            str += '        <div class="row">\n';
            str += '          <p class="tipo-de-estabelecimento"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp; Tipo: &nbsp;<span>Hotel</span></p>\n';
            str += '        </div>\n';
            str += '      </div>\n';
            str += '      <div class="col-lg-12">\n';
            str += '        <div class="row">\n';
            str += '          <p class="periodo"><span class="glyphicon glyphicon-time" aria-hidden="true"></span>&nbsp; Períodos: &nbsp; 3h 6h 9h 12h 15h </p>\n';
            str += '        </div>\n';
            str += '      </div>\n';
            str += '      <div class="clearfix"></div>\n';
            str += '    </div>\n';
            str += '  </div>\n';
            str += '</div>\n';

            i++;


         });

        // console.log(str);

        $('#carousel-em-destaque .carousel-inner').html(str);

        str = "";

      }
      self.caroulselAdvanced();
    })

    .fail(function() {
      console.log("error");
    })

    .always(function() {
      console.log("complete");
    });

  };
	
	return Application;

})();




