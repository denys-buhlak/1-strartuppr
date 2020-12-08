// Gulp Task: <TASK-NAME>
// Run (development): gulp <TASK-NAME>
// Run (production): NODE_ENV='production' gulp <TASK-NAME>
// Description: template for new gulp task
// devDependencies: npm install --save-dev gulp gulp-load-plugins
// gh-pages

const config = require('../config');

module.exports = function () {
  const ghPages = require('gh-pages');
  // const path = require('path');

  return function (cb) {
    let stream =
      // --Start Task
      ghPages.publish(config.deploy.dest, config.deploy.opts, cb);
    // --End Task

    return stream;
  };
};
