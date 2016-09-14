/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      includePaths: [
        'bower_components/bootstrap-sass/assets/stylesheets'
      ]
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  var importBootstrap = function () {
    app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap.js');
  };
  var importD3 = function () {
    app.import('bower_components/d3/d3.js');
  };
  var importTimeLine = function () {
    app.import("bower_components/timelineJs/compiled/js/timeline.js");
    app.import("bower_components/timelineJs/compiled/css/timeline.css");
    app.import('bower_components/timelineJs/compiled/css/icons/tl-icons.eot', {
      destDir: 'assets/icons'
    });
    app.import('bower_components/timelineJs/compiled/css/icons/tl-icons.svg', {
      destDir: 'assets/icons'
    });
    app.import('bower_components/timelineJs/compiled/css/icons/tl-icons.ttf', {
      destDir: 'assets/icons'
    });
    app.import('bower_components/timelineJs/compiled/css/icons/tl-icons.woff', {
      destDir: 'assets/icons'
    });
  };
  var importPerfectScrollbar = function () {
    app.import("bower_components/perfect-scrollbar/js/perfect-scrollbar.js");
    app.import("bower_components/perfect-scrollbar/css/perfect-scrollbar.css");
  };

  importBootstrap();
  importTimeLine();
  importD3();
  importPerfectScrollbar();

  return app.toTree();
};
