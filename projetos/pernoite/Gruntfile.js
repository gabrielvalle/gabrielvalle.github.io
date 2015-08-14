var config = require('grunt-settings');

module.exports = function(grunt) {
  // Initialize the configuration block.
  config.init(grunt);

  //----------------------------------------
  // Set JavaScripts that will be compiled.
  //----------------------------------------
  var jsFiles = [
      'vendor/assets/jquery/dist/jquery.js'
    , 'vendor/assets/bootstrap-sass/assets/javascripts/bootstrap.js'
    , 'vendor/assets/bootstrap-table/dist/bootstrap-table.min.js'
    , 'vendor/assets/bootstrap-timepicker/js/bootstrap-timepicker.js'
    , 'vendor/assets/fuelux/dist/js/fuelux.js'
    , 'vendor/assets/typeahead.js/dist/bloodhound.js'
    , 'vendor/assets/typeahead.js/dist/typeahead.bundle.js'
    , 'vendor/assets/typeahead.js/dist/typeahead.jquery.js'
    , 'vendor/assets/Flowtype.js/flowtype.js'
    , 'vendor/assets/bootbox.js/bootbox.js'
    , 'vendor/assets/noty/js/noty/packaged/jquery.noty.packaged.js'
    , 'vendor/assets/gmaps/gmaps.js'
    , 'vendor/assets/Lightbox_me/jquery.lightbox_me.js'
    , 'vendor/assets/bootstrap-toggle/js/bootstrap-toggle.js'
    , 'vendor/assets/blueimp-file-upload/js/vendor/jquery.ui.widget.js'
    , 'vendor/assets/blueimp-file-upload/js/jquery.iframe-transport.js'
    , 'vendor/assets/blueimp-file-upload/js/jquery.fileupload.js'
    , 'assets/js/**/*.js' 
  ];

  //----------------------------------------
  // Set Stylesheets that will be compiled.
  //----------------------------------------
  var cssFiles = [
      'vendor/assets/normalize.css/normalize.css'
    , 'vendor/assets/font-awesome/css/font-awesome.css'
    , 'vendor/assets/bootstrap-table/dist/bootstrap-table.min.css'
    , 'vendor/assets/bootstrap-timepicker/css/bootstrap-timepicker.css'
    , 'vendor/assets/fuelux/dist/css/fuelux.css'
    , 'vendor/assets/animate.css/animate.css'
    , 'vendor/assets/bootstrap-toggle/css/bootstrap-toggle.css'
    , 'public/css/pernoite.css'
    
  ];

  //----------------------------------------
  // Concatenate JavaScript and CSS
  //----------------------------------------
  config.set('concat', {
      js: {
        src: jsFiles
      , dest: 'public/js/pernoite.js'
      },
      css: {
        src: cssFiles
      , dest: 'public/css/pernoite.css'
      }
  });

  //------------------------
  // Compress JavaScript
  //------------------------
  config.set('uglify.dist', {
      options: {
        sourceMap: false
      , sourceMapIncludeSources: true
      , compress: {
          drop_console: true
        }
      }
    , src: jsFiles
    , dest: 'public/js/pernoite.js'
  });
  
  //------------------------
  // Compress SASS.
  //------------------------
  config.set('sass', {
    dist: {
      files: {
         'public/css/pernoite.css': 'assets/css/pernoite.scss'
      }
    }
  });

  //------------------------
  // Compress the CSS.
  //------------------------
  config.set('cssmin.dist', {
      src: 'public/css/pernoite.css'
    , dest: 'public/css/pernoite.css'
  });

  //------------------------
  // Compress images.
  //------------------------
  config.set('imagemin.dist', {
    files: [{
        expand: true
      , cwd: 'assets/img/'
      , src: ['*.{png,jpg,gif}']
      , dest: 'public/img/'
    }]
  });

  //----------------------------------------
  // Watch for updates.
  //----------------------------------------

  config.set('watch.js', {
      files: ['assets/js/**/*.js', 'assets/components/js/**/*.js']
    , tasks: ['concat:js']
    , options: {
        livereload: true,
      }
  });

  config.set('watch.sass', {
      files: ['assets/css/**/*.scss', 'assets/components/css/**/*.scss']
    , tasks: ['sass', 'concat:css']
    , options: {
        livereload: true,
      }
  });

  config.set('watch.images', {
      files: ['assets/img/*']
    , tasks: ['imagemin']
  });

  config.set('watch.jasmine', {
      // files: ['assets/**/*', 'vendor/**/*', 'spec/**/*']
      files: ['spec/**/*']
    , tasks: ['jasmine']
  });

  //----------------------------------------
  // Configure Jasmine.
  //----------------------------------------
  config.set('jasmine.dev', {
    options: {
        specs: 'spec/**/*_spec.js'
      , helpers: 'spec/spec_helper.js'
      , vendor: [
          'vendor/assets/jquery/dist/jquery.js'
        , 'vendor/assets/jasmine-fixtures/dist/jasmine-fixtures.js'
      ]
      , outfile: 'spec/spec_runner.html'
      , keepRunner: true
      // , display: 'short'
    }
    , src: [
        'assets/js/**/*.js'
      , '!assets/js/**/*/boot.js' 
    ]
  });


  //----------------------------------------
  // Grunt Bower Install > assets/component.
  //----------------------------------------
  config.set('bower', {
    install: {
      options: {
        targetDir: './assets/components',
        install: true,
        verbose: false,
        cleanTargetDir: false,
        cleanBowerDir: false,
        bowerOptions: {},
        layout: 'byComponent'
      }

    }
  });

  //----------------------------------------
  // Register the default task.
  //----------------------------------------
  config.registerTask('default', ['sass', 'concat', 'cssmin', 'uglify', 'imagemin']);
};


