// Gulp Task: scripts
// Run(development): gulp scripts
// Run (production): NODE_ENV='production' gulp scripts
// Description:
// devDependencies: npm install --save-dev gulp gulp-load-plugins
// gulp-newer gulp-debug gulp-if

const config = require('../config');

module.exports = function (gulp, $) {
  return function () {
    let stream =
      // --Start Task
      gulp
        .src(config.js.src)
        .pipe($.rigger())
        .pipe($.debug({ title: '     task:scripts     ' }))
        .pipe($.plumber({ errorHandler: $.notify.onError() }))
        .pipe($.if(config.isDevelopment, $.sourcemaps.init()))
        .pipe($.if(config.isDevelopment, $.sourcemaps.write('.')))
        .pipe(gulp.dest(config.js.dest));

    // --End Task
    return stream;
  };
};
