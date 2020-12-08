// Gulp Task: sass
// Run(development): gulp sass
// Run (production): NODE_ENV='production' gulp sass
// Description: sass + autoprefixer + css-mqpacker + cssnano
// devDependencies: npm install --save-dev gulp gulp-load-plugins
// gulp-newer gulp-debug gulp-if gulp-plumber gulp-notify
// gulp-dart-sass gulp-replace gulp-sourcemaps
// gulp-postcss autoprefixer cssnano
// @lipemat/css-mqpacker

const config = require('../config');

module.exports = function (gulp, $) {
  let PostCssPlugins = [
    // non-conditional
    require('autoprefixer')(config.autoprefixer.opts),
    // conditional
    !config.isDevelopment ? require('@lipemat/css-mqpacker')(config.lipematCssMqpacker.opts) : false,
    !config.isDevelopment ? require('cssnano')(config.cssnano.opts) : false,
  ].filter(Boolean);

  return function () {
    let stream =
      // --Start Task
      gulp
        .src(config.sass.src /* , { since: gulp.lastRun('sass') } */)
        .pipe($.newer(config.sass.dest))
        .pipe($.debug({ title: '     task:sass     ' }))
        .pipe($.plumber({ errorHandler: $.notify.onError() }))
        .pipe($.if(config.isDevelopment, $.sourcemaps.init()))
        .pipe($.dartSass())
        .pipe($.replace(config.replace.fonts.string, config.replace.fonts.replacement))
        .pipe($.replace(config.replace.images.string, config.replace.images.replacement))
        .pipe($.postcss(PostCssPlugins))
        .pipe($.if(config.isDevelopment, $.sourcemaps.write('.')))
        .pipe(gulp.dest(config.sass.dest));

    // --End Task

    return stream;
  };
};
