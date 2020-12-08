// Gulp Task: images
// Run(development): gulp images
// Run (production): NODE_ENV='production' gulp images
// Description: convert to WEBP, copy images, minify for production
// devDependencies: npm install --save-dev gulp gulp-load-plugins
// gulp-newer gulp-debug gulp-if
// gulp-imagemin imagemin-pngquant imagemin-jpeg-recompress

const config = require('../config');

const imageminPng = require('imagemin-pngquant');

const imageminJpg = require('imagemin-jpeg-recompress');

const imageminWebp = require('imagemin-webp');

module.exports = function (gulp, $) {
  return function () {
    let stream1 =
      // --Start Task
      gulp
        .src([config.images.src, config.images.exc], { since: gulp.lastRun('images') })
        .pipe($.newer(config.images.dest))
        .pipe($.debug({ title: '     task:convertImages     ' }))
        .pipe($.webp(config.images.opts.webp))
        .pipe(gulp.dest(config.images.dest));

    // --End Task

    let stream2 =
      // --Start Task
      gulp
        .src([config.images.src, config.images.exc], { since: gulp.lastRun('images') })
        .pipe($.newer(config.images.dest))
        .pipe($.debug({ title: '     task:images     ' }))
        .pipe(
          $.if(
            !config.isDevelopment,
            $.imagemin(
              [
                imageminPng(config.images.opts.png),
                imageminJpg(config.images.opts.jpg),
                imageminWebp(config.images.opts.webp),
              ],
              { verbose: true }
            )
          )
        )
        .pipe(gulp.dest(config.images.dest));

    // --End Task

    return stream1, stream2;
  };
};
