const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const maps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
 


gulp.task('css', () => {
  return gulp.src('src/sass/main.scss')
  .pipe(maps.init())
  .pipe(sass())
  .pipe(autoprefixer({
      browsers: ['last 5 versions']
  }))
  .pipe(csso())
  .pipe(rename({
      suffix:'.min'
  }))
  .pipe(maps.write())
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream())
})
  
gulp.task('img',() => {
  return gulp.src('src/assets/**/*.*')
  .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
      })
  ]))
  .pipe(gulp.dest('dist/img'))
})

gulp.task('fonts',() => {
  var buildFonts = gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
})



gulp.task('html', () => {
  return gulp.src('src/views/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
});


gulp.task('js', () => {
  return gulp.src('src/*.js')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
});

gulp.task('reload', () => {
  browserSync({
    server: {
      baseDir: 'dist/'
    },
    notify: false,
  });
});

gulp.task('watch', ['reload','css', 'html', 'img', 'fonts', 'js'], () => {
  gulp.watch('src/sass/**/*.scss', ['css']);
  gulp.watch(['src/views/*.html'], ['html'])
  gulp.watch('dist/*.html', browserSync.reload)
});