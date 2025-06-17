/* Name: Pointing Tool
 * Author: Craig Cooper
 * Author URI: http://craigomatic.co.uk
 * Description: A tool to help make scrum poker decisions
 * Version: 0.0.1
 */

// Paths
const pathSass = "src/scss/";
const pathJs = "src/js/";
const pathHtml = "src/html/";
const pathPhp = "src/html/";

// General
import gulp from "gulp";
import browserSync from "browser-sync";
import notify from "gulp-notify";
import sourcemaps from "gulp-sourcemaps";

// Sass
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import autoprefixer from "gulp-autoprefixer";

// JavaScript
import uglify from "gulp-terser";

// Module Build
import nunjucksRender from "gulp-nunjucks-render";

// Scripts object
//const globalScripts = [pathJs + "global.js"];
// var uiscripts = [
//     pathJs + 'global.js',
// ];

//const homescripts = [pathJs + 'global.js'];

// Sass
gulp.task('sass', function() {
    return gulp
        .src(pathSass + '**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                style: 'compressed'
            }).on('error', notify.onError('Sass lint failed.\n<%= error.message %>'))
        )
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

// JavaScript concat and minify
gulp.task("js", function () {
    return gulp
        .src(pathJs + "**/*.js")
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("public/js"))
        .pipe(browserSync.stream());
});

// JavaScript watch
// Ensures the 'js' task is complete before reloading browsers
gulp.task("js-watch", gulp.series(["js"], browserSync.reload));

// Nunjucks build
gulp.task('html', function() {
    return gulp.src('src/html/pages/**/*.njk')
    .pipe(nunjucksRender({
        path: ['src/html/templates']
    }))
    .pipe(gulp.dest('public/'))
});

// HTML watch
// Ensures the 'html' task is complete before reloading browsers
gulp.task('html-watch', gulp.series('html', browserSync.reload));

// Nunjucks PHP build
gulp.task('php', function () {
    return gulp.src('src/html/pages/**/*.php')
    .pipe(nunjucksRender({
        path: ['src/html/templates'],
        inheritExtension: true
    }))
    .pipe(gulp.dest('public/'))
});

// PHP watch
// Ensures the 'php' task is complete before reloading browsers
gulp.task('php-watch', gulp.series('php', browserSync.reload));

// Serve
gulp.task(
	"serve",
	gulp.series("sass", "js", "html", "php", function () {
		browserSync.init({
			server: {
				baseDir: "./public",
			},
			notify: false,
		});
		gulp.watch(pathSass + "**/*.scss", gulp.series("sass"));
		gulp.watch(pathJs + "**/*", gulp.series("js-watch"));
		gulp.watch(pathHtml + "**/*", gulp.series("html-watch"));
		gulp.watch(pathPhp + "**/*", gulp.series("php-watch"));
	})
);

// Tasks
gulp.task("default", gulp.series("sass", "js", "html", "php", "serve", browserSync.reload));