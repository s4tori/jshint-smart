"use strict";

var gulp   = require("gulp");
var jshint = require("gulp-jshint");
var mocha  = require("gulp-mocha");

var paths  = {
	script: "./lib/*.js",
	test: "./test/*.js",
	fixture: "./test/fixture/*.js",
	demo: "./demo/*.js"
};


//////////////////////////////////////////////////////

gulp.task("lint.all", function() {
	gulp.src(["gulpfile.js", paths.script, paths.test])
		.pipe(jshint())
		.pipe(jshint.reporter(require("./lib/jshint-smart")))
		.pipe(jshint.reporter("fail"));
});

gulp.task("lint.demo", function() {
	gulp.src([paths.demo, paths.fixture])
		.pipe(jshint())
		.pipe(jshint.reporter(require("./lib/jshint-smart")));
});

gulp.task("lint.verbose", function() {
	gulp.src([paths.demo, paths.fixture])
		.pipe(jshint())
		.pipe(jshint.reporter(require("./lib/jshint-smart"), { verbose: true }));
});

gulp.task("test.all", function() {
	return gulp
		.src(paths.test)
		.pipe(mocha({ reporter: "spec" }));
});


//////////////////////////////////////////////////////

gulp.task("default"     , ["lint.all", "test.all"]);
gulp.task("demo"        , ["lint.demo"]);
gulp.task("demo:verbose", ["lint.verbose"]);
