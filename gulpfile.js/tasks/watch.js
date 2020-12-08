// Gulp Task: <TASK-NAME>
// Run (development): gulp <TASK-NAME>
// Run (production): NODE_ENV='production' gulp <TASK-NAME>
// Description:
// devDependencies: npm install --save-dev gulp gulp-load-plugins
//

const config = require('../config');

module.exports = function (gulp) {
  return function () {
    // --Start Task
    gulp.watch(config.html.watch, { delay: 500 /*, usePolling: true  */ }, gulp.series('html'));
    gulp.watch(config.sass.watch, { delay: 500 /*, usePolling: true  */ }, gulp.series('sass'));
    gulp.watch(config.fonts.watch, { delay: 500 /*, usePolling: true  */ }, gulp.series('fonts'));
    gulp.watch(config.images.watch, { delay: 500 /*, usePolling: true  */ }, gulp.series('images'));
    gulp.watch(config.js.watch, { delay: 500 /*, usePolling: true  */ }, gulp.series('scripts'));
    // --End Task
  };
};
