// Gulp Task: server
// Run (development): gulp server
// Run (production): NODE_ENV='production' gulp server
// Description: start local server + tunnel
// devDependencies: npm install --save-dev gulp gulp-load-plugins
//
// browser-sync

const config = require('../config');

const browserSync = require('browser-sync').create();

module.exports = function () {
  return function () {
    let stream =
      // --Start Task
      browserSync.init(config.browsersync.opts);

    browserSync.watch(config.browsersync.watch).on('change', browserSync.reload);

    // --End Task
    return stream;
  };
};
