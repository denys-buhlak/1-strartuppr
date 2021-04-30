import del from 'del';
import gulp from 'gulp';
import { paths, description, environment } from '../config.js';
import gulpSvgSprite from 'gulp-svg-sprite';

function createSpriteSVG() {
  return gulp
    .src(`${paths.source.iconsSVG}/*.svg`)

    .pipe(
      gulpSvgSprite({
        mode: {
          stack: {
            sprite: `../../../../${paths.destination.images}/sprites/}/sprite_svg_stack.svg`,
          },
        },
      }),
    )
    .pipe(gulp.dest(`${paths.source.images}/sprites`));
}

const task_sprite_svg = (cb) => {
  setTimeout(createSpriteSVG, 0);
  cb();
};

task_sprite_svg.description = `${description.begin}create sprite from SVG to${description.end}`;
task_sprite_svg.displayName = 'sprite-svg';

const watch_sprite_svg = () => {
  gulp.watch(`${paths.source.iconsSVG}/*.svg`, task_sprite_svg);
};

export { task_sprite_svg, watch_sprite_svg };
