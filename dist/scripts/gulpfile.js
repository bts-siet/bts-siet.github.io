var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;

var src = {
    scss: 'src/*.sass',
    css: 'css',
    html: '*.html'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: './app'
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
        .src(src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.css))
        return gulp.src(src.css)
            .pipe(postcss(plugins))
            .pipe(gulp.dest(src.css))
        .pipe(reload({ stream: true }));
});

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('css', function () {
    return gulp.src('./src/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dest'));
});
gulp.task('default', ['serve']);
