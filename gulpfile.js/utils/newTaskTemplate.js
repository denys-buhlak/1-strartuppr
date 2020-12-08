// Gulp Task: <TASK-NAME>
// Run (development): gulp <TASK-NAME>
// Run (production): NODE_ENV='production' gulp <TASK-NAME>
// Description: template for new gulp task
// devDependencies: npm install --save-dev gulp gulp-load-plugins
//

const config = require('../config');

module.exports = function (gulp, $) {
  return function () {
    let stream =
      // --Start Task
      gulp.src(config).pipe($).pipe(gulp.dest(config));

    // --End Task
    return stream;
  };
};
