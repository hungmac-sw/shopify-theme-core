const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('combine-scss', () => gulp.src([
  './resources/scss/**/*.scss',
  './resources/module/**/*.scss',
], { base: './resources/' }).pipe(concat('theme.scss')).pipe(gulp.dest('./src/assets')));
