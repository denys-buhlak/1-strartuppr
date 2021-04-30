import gulp from 'gulp';

import gulpChanged from 'gulp-changed';
import gulpDebug from 'gulp-debug';
import gulpIf from 'gulp-if';

import gulpImagemin from 'gulp-imagemin';
import imageminPng from 'imagemin-pngquant';
import imageminJpg from 'imagemin-jpeg-recompress';
import imageminWebp from 'imagemin-webp';
import gulpWebp from 'gulp-webp';

import { paths, environment, description } from '../config.js';

function copyImages() {
  gulp
    .src(`${paths.source.images}/favicon/*.*`)
    .pipe(gulp.dest(`${paths.destination.images}/favicon`));

  return gulp
    .src([
      `${paths.source.images}/**/*.{jpg,png,webp}`,
      `!${paths.source.images}/favicon/*.*`,
      `!${paths.source.images}/icons/**/*`,
    ])
    .pipe(gulpChanged(`${paths.destination.images}`))
    .pipe(gulpDebug({ title: '\t\t\t\t\t copy images' }))
    .pipe(
      gulpIf(
        environment.isProduction,
        gulpImagemin(
          [
            imageminPng({
              quality: [0.35, 0.7],
            }), // https://www.npmjs.com/package/imagemin-pngquant
            imageminJpg({
              quality: 'low',
              min: 35,
              max: 70,
            }), // https://www.npmjs.com/package/imagemin-jpeg-recompress
            imageminWebp({
              quality: 50,
            }), // https://www.npmjs.com/package/imagemin-webp
          ],
          { verbose: true },
        ),
      ),
    )
    .pipe(gulp.dest(`${paths.destination.images}`));
}

function convertImagesToWebp() {
  return gulp
    .src([
      `${paths.source.images}/**/*.{jpg,png}`,
      `!${paths.source.images}/favicon/**/*`,
      `!${paths.source.images}/icons/**/*`,
    ])
    .pipe(gulpChanged(`${paths.destination.images}`, { extension: '.webp' }))
    .pipe(gulpDebug({ title: '\t\t\t\t\t convert images {jpg, png} to webp' }))
    .pipe(gulpIf(environment.isDevelopment, gulpWebp()))
    .pipe(gulpIf(environment.isProduction, gulpWebp({ quality: 50 })))
    .pipe(gulp.dest(`${paths.destination.images}`));
}

// ? How to replace without setTimeout?
// const build_images = gulp.series(
//   copyImages,
//   gulp.parallel(convertImagesToWebp),
// );

// ! FIX need promise?
const task_images = (cb) => {
  setTimeout(copyImages, 0);
  setTimeout(convertImagesToWebp, 5000);
  cb();
};

task_images.description = `${description.begin}copy and convert images to${description.end}`;
task_images.displayName = 'images';

const watch_images = () => {
  gulp.watch(`${paths.source.images}/**/*.{jpg,png,webp}`, task_images);
};

export { task_images, watch_images };
