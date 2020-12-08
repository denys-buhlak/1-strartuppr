// Gulp Task: fonts
// Run(development): gulp fonts
// Run (production): NODE_ENV='production' gulp fonts
// Description: copy fonts + convert *.TTF to *.WOFF +  convert *.TTF to *.WOFF2
// devDependencies: npm install --save-dev gulp gulp-load-plugins
// gulp-debug gulp-newer
// gulp-ttf2woff gulp-ttf2woff2

const config = require('../config');

module.exports = function (gulp, $) {
  return function () {
    // ========== copy fonts
    let stream1 =
      // --Start Task
      gulp
        .src([config.fonts.src, config.fonts.exc], { since: gulp.lastRun('fonts') })
        .pipe($.newer(config.fonts.dest))
        .pipe($.debug({ title: '     task-fonts:copy     ' }))
        .pipe(gulp.dest(config.fonts.dest));

    // --End Task

    // ========== convert ttf=>woff
    let stream2 =
      // --Start Task
      gulp
        .src('./src/fonts/**/*.ttf', { since: gulp.lastRun('fonts') })
        .pipe(
          $.newer({
            map: function (myNewer) {
              return config.fonts.dest + myNewer.substring(0, myNewer.length - 4) + '.woff';
            },
          })
        )
        .pipe($.debug({ title: '     task-fonts:convert (ttf => woff)     ' }))
        .pipe($.ttf2woff())
        .pipe(gulp.dest(config.fonts.dest));

    // --End Task

    // ========== convert ttf=>woff2
    let stream3 =
      //--Start Task
      gulp
        .src('./src/fonts/**/*.ttf', { since: gulp.lastRun('fonts') })
        .pipe(
          $.newer({
            map: function (myNewer) {
              return config.fonts.dest + myNewer.substring(0, myNewer.length - 4) + '.woff2';
            },
          })
        )
        .pipe($.debug({ title: '     task-fonts:convert_2 (ttf => woff2)     ' }))
        .pipe($.ttf2woff2())
        .pipe(gulp.dest(config.fonts.dest));

    // --End Task

    return stream1, stream2, stream3;
  };
};
