// Gulp Task: clean
// Run(development): gulp clean
// Run (production): NODE_ENV='production' gulp clean
// Description: clean build folder
// devDependencies: npm install --save-dev gulp gulp-load-plugins
//
// del

const config = require('../config');

module.exports = function () {
  let del = require('del');

  return function (cb) {
    let stream =
      // --Start Task
      del(config.clean.src, cb, config.clean.opts);

    // --End Task
    return stream;
  };
};
