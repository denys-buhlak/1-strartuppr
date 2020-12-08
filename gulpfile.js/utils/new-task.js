// Gulp Task: new
// Run (development): gulp new
// Run (production): NODE_ENV='production' gulp new
// Description: creates a new multifile task template
// devDependencies: npm install --save-dev gulp gulp-load-plugins
// gulp-rename

const config = require('../config');

module.exports = function (gulp, plugins) {
  return function () {
    let stream =
      // --Start Task
      gulp.src(config.newtask.src).pipe(plugins.rename(config.newtask.outputName)).pipe(gulp.dest(config.newtask.dest));

    // --End Task

    return stream;
  };
};
