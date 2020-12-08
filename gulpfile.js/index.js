// Project: PROJECT-NAME
// NOTE: Using Gulp 4
// npm install --save-dev gulp-load-plugins gulp
// for production: NODE_ENV='production' gulp taskName

const { lastRun } = require('gulp');
const gulp = require('gulp');

const $ = require('gulp-load-plugins')();

// function to create new task
function newTask() {
  return require('./utils/new-task')(gulp, $);
}
gulp.task('new', newTask('new-task'));

// function to get tasks
function getTask(task) {
  return require('./tasks/' + task)(gulp, $);
}

// Gulp Tasks
gulp.task('clean', getTask('clean'));
gulp.task('html', getTask('html'));
gulp.task('sass', getTask('sass'));
gulp.task('fonts', getTask('fonts'));
gulp.task('images', getTask('images'));
gulp.task('watch', getTask('watch'));
gulp.task('server', getTask('browsersync'));
gulp.task('scripts', getTask('scripts'));
gulp.task('deploy', getTask('deploy'));

// Default Task (Development)
gulp.task(
  'default',
  gulp.series(gulp.parallel('sass', 'html', 'fonts', 'images', 'scripts'), gulp.parallel('watch', 'server'))
);
// Only build project
gulp.task('build', gulp.parallel('sass', 'html', 'fonts', 'images', 'scripts'), { since: lastRun });

// Git Hub Page
// const ghPages = require('gulp-gh-pages');

// gulp.task('deploy', gulp.series('build'), function () {
//   return gulp.src('./dist/**/*').pipe(ghPages());
// });
