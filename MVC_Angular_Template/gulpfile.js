/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');

/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var environments = require('gulp-environments');

var development = environments.development;
var production = environments.production;

var webroot = "./wwwapp/";
var npmRoot = "./node_modules/";

var copyPathSrc = [
    npmRoot + (development() ? 'angular2/bundles/angular2.js' : 'angular2/bundles/angular2.min.js'),
    npmRoot + (development() ? 'angular2/bundles/router.js' : 'angular2/bundles/router.min.js'),
    npmRoot + (development() ? 'angular2/bundles/http.js' : 'angular2/bundles/http.min.js'),
    npmRoot + (development() ? 'es6-shim/es6-shim.js' : 'es6-shim/es6-shim.min.js'),
    npmRoot + (development() ? 'rxjs/bundles/Rx.js' : 'rxjs/bundles/Rx.min.js'),
    npmRoot + (development() ? 'systemjs/dist/system.js' : 'systemjs/dist/system.js'),
    npmRoot + (development() ? 'reflect-metadata/reflect.js' : 'reflect-metadata/reflect.js'),
    npmRoot + (development() ? 'zone.js/dist/zone.js' : 'zone.js/dist/zone.min.js')
];

var paths = {
    js: webroot + "js/**/*.js",
    minJs: webroot + "js/**/*.min.js",
    css: webroot + "css/**/*.css",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "js/site.min.js",
    concatCssDest: webroot + "css/site.min.css",
    lib: webroot + "lib",
    npmSrc: npmRoot,
    npmLibs: webroot + "node_modules/",
    cssDir: webroot + "css/",
    angDir: webroot + "app/",
    angDir2: webroot + "ADSPPMgr/app/"
};

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

gulp.task('move2lib', function () {
    return gulp.src(copyPathSrc).pipe(gulp.dest(paths.lib));
});


gulp.task("copy-deps:systemjs", function () {
    return gulp.src(paths.npmSrc + '/systemjs/**/*.js', { base: paths.npmSrc + '/systemjs/' })
         .pipe(gulp.dest(paths.npmLibs + '/systemjs/'));
});
gulp.task("copy-deps:angular-in-memory-web-api", function () {
    return gulp.src(paths.npmSrc + '/angular-in-memory-web-api/**/*.js', { base: paths.npmSrc + '/angular-in-memory-web-api/' })
         .pipe(gulp.dest(paths.npmLibs + '/angular-in-memory-web-api/'));
});

gulp.task("copy-deps:angular", function () {
    return gulp.src(paths.npmSrc + '/@angular/**/*.js', { base: paths.npmSrc + '/@angular/' })
         .pipe(gulp.dest(paths.npmLibs + '/@angular/'));
});


//gulp.task("copy-deps:angular2-pollyfill", function () {
//    return gulp.src(paths.npmSrc + '/angular2-polyfill/bundles/**/*.js', { base: paths.npmSrc + '/angular2-polyfill/bundles/' })
//         .pipe(gulp.dest(paths.npmLibs + '/angular2-pollyfill/'));
//});
//gulp.task("copy-deps:es6-shim", function () {
//    return gulp.src(paths.npmSrc + '/es6-shim/es6-sh*', { base: paths.npmSrc + '/es6-shim/' })
//         .pipe(gulp.dest(paths.npmLibs + '/es6-shim/'));
//});
//gulp.task("copy-deps:es6-promise", function () {
//    return gulp.src(paths.npmSrc + '/es6-promise/dist/**/*.*', { base: paths.npmSrc + '/es6-promise/dist/' })
//         .pipe(gulp.dest(paths.npmLibs + '/es6-promise/'));
//});

gulp.task("copy-deps:rxjs", function () {
    return gulp.src(paths.npmSrc + '/rxjs/**/*.js', { base: paths.npmSrc + '/rxjs/' })
         .pipe(gulp.dest(paths.npmLibs + '/rxjs/'));
});

gulp.task("copy-deps:reflect", function () {
    return gulp.src(paths.npmSrc + '/reflect-metadata/*.js', { base: paths.npmSrc + '/reflect-metadata/' })
         .pipe(gulp.dest(paths.npmLibs + '/reflect-metadata/'));
});

gulp.task("copy-deps:zone", function () {
    return gulp.src(paths.npmSrc + '/zone.js/dist/**/*.js', { base: paths.npmSrc + '/zone.js/dist/' })
         .pipe(gulp.dest(paths.npmLibs + '/zone.js/'));
});

gulp.task("copy-deps:corejs", function () {
    return gulp.src(paths.npmSrc + '/core-js/**/*.js', { base: paths.npmSrc + '/core-js/' })
         .pipe(gulp.dest(paths.npmLibs + '/core-js/'));
});

gulp.task("copy-deps:spinkit", function () {
    return gulp.src(paths.npmSrc + '/spinkit/css/**/*.css', { base: paths.npmSrc + '/spinkit/css/' })
         .pipe(gulp.dest(paths.cssDir));
});

gulp.task("copy-html", function () {
    return gulp.src(paths.angDir + '**/*.html', { base: paths.angDir })
         .pipe(gulp.dest(paths.angDir2));
});

//gulp.task("copy-deps", ["copy-deps:rxjs", 'copy-deps:angular2', 'copy-deps:systemjs', 'copy-deps:es6-shim', 'copy-deps:es6-promise', 'copy-deps:reflect', 'copy-deps:zone', 'copy-deps:angular2-pollyfill']);

gulp.task("copy-deps", ["copy-deps:corejs", "copy-deps:zone", "copy-deps:reflect", "copy-deps:systemjs", "copy-deps:angular", "copy-deps:angular-in-memory-web-api", "copy-deps:rxjs"]);


gulp.task('default', function () {
    // place code for your default task here
});