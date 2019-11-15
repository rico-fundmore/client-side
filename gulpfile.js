const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')

gulp.task('sass', function(){
  const plugins = [
    autoprefixer({ overrideBrowserslist: ['last 2 version'] }),
    cssnano()
  ]
 return gulp
  .src('scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('css'))
  .pipe(postcss(plugins))
  .pipe(gulp.dest('./css/min'))
  .pipe(browserSync.stream())


})

gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('public/fonts'))
})

gulp.task('scripts', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'js/*.js'
  ]) 
    .pipe(concat('main.js')) 
    .pipe(gulp.dest('js/dev')) 
    .pipe(rename('main.min.js')) 
    .pipe(uglify()) 
    .pipe(gulp.dest('js/min')) 
    .pipe(browserSync.stream()) 
})


gulp.task('default', function(){
  browserSync.init({ server: './' })
  gulp.watch('scss/**/*.scss', gulp.series('sass'))
  gulp.watch('js/*.js', gulp.series('scripts'))
  gulp.watch('*.html').on('change', browserSync.reload)
})


