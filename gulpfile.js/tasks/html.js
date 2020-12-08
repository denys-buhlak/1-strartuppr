// Gulp Task: html
// Run(development): gulp html
// Run (production): NODE_ENV='production' gulp html
// Description: build html from part (template folder) and minify for production
// devDependencies: npm install --save-dev gulp gulp-load-plugins
// gulp-newer gulp-debug gulp-if
// gulp-rigger gulp-htmlmin

const config = require('../config');

module.exports = function (gulp, $) {
  return function () {
    let stream =
      // --Start Task
      gulp
        .src(config.html.src)
        .pipe($.rigger())
        .pipe($.replace(config.replace.images.string, config.replace.images.replacement))
        .pipe($.debug({ title: '     task:html     ' }))
        .pipe($.if(!config.isDevelopment, $.htmlmin(config.html.opts)))
        .pipe(gulp.dest(config.html.dest));

    // --End Task
    return stream;
  };
};
