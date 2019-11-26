const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
// const pngquant = require('gulp-pngquant');
const browsersync = require('browser-sync').create();

const paths = {
    html: {
        src: 'app/**/*.html',
        dest: 'build/'
    },
    styles: {
        src: 'app/styles/**/*.scss',
        dest: 'build/css'
    },
    scripts: {
        src: 'app/js/**/*.js',
        dest: 'build/scripts'
    },
    images: {
        src: 'app/images/*.*',
        dest: 'build/images'
    }
}

function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: './build'
        },
        port: 3000
    });
    done();
}

function img() {
    return gulp.src('app/images/*.jpg')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }]
        }))
        .pipe(gulp.dest('build/images'));
}
function pngimg() {
    return gulp.src('app/images/*.png')
        // .pipe(pngquant())
        .pipe(gulp.dest('build/images'));
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}


function html() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browsersync.stream())
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browsersync.stream())
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(concat('main.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browsersync.stream())
}


function watch() {
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, img);
    gulp.watch(paths.images.src, pngimg);
    gulp.watch('app/*.html', gulp.series(browserSyncReload));
}

function fonts() {
    return gulp.src('app/fonts/**/*.ttf')
        .pipe(gulp.dest('build/fonts/'))
}

const build = gulp.parallel(html, styles, scripts, fonts, img, pngimg);
gulp.task('build', build);

gulp.task('default', gulp.parallel(watch, build, browserSync));


