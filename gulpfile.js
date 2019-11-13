const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

gulp.task('sass', function(){
 return gulp
  .src('scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('css'))
  .pipe(postcss(plugins))
  .pipe(gulp.dest('./css/min'))
  .pipe(browserSync.stream())
})

gulp.task('default', function(){
  browserSync.init({ server: './' })
  gulp.watch('scss/**/*.scss', gulp.series('sass'))
  gulp.watch('*.html').on('change', browserSync.reload)
})