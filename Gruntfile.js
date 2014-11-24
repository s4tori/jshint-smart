"use strict";

module.exports = function(grunt) {

	grunt.initConfig({

		jshint: {
			options: {
				jshintrc: ".jshintrc",
				reporter: require("./lib/index"),
				verbose: false,
			},
			all: {
				src: ["Gruntfile.js", "lib/*.js"],
				options: { verbose: true }
			},
			demo: [
				"demo/*.js", "test/fixture/*.js"
			],
			verbose: {
				src: ["demo/*.js", "test/fixture/*.js"],
				options: { verbose: true }
			}
		},

		mochaTest: {
			options: {
				reporter: "spec"
			},
			all: {
				src: ["test/test.js"]
			}
		}

	});

	// Load this plugin's task(s).
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-mocha-test");

	// By default, lint and run all tests.
	grunt.registerTask("default"     , ["jshint:all", "mochaTest:all"]);
	grunt.registerTask("demo"        , ["jshint:demo"]);
	grunt.registerTask("demo:verbose", ["jshint:verbose"]);

};
