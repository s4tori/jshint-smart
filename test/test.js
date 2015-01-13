/*global describe, it */
"use strict";

var assert   = require("assert");
var hooker   = require('hooker');
var jshint   = require("jshint/src/cli").run;
var jshintrp = require("../lib/jshint-smart");
var symbols  = require("../lib/util").symbols;
var win32    = require("../lib/util").win32;

describe("jshint-smart", function () {

	var fixture = {
		"A": "./test/fixture/fixture A.js",
		"B": "./test/fixture/fixture B.js",
		"C": "./test/fixture/fixture C.js"
	};

	var runJshint = function (files, hasColor) {
		// Monkey patch stdout
		var output = "";
		hooker.hook(process.stdout, "write", {
			pre: function (out) {
				output = output + out;
				return hooker.preempt();
			}
		});

		jshintrp.setColor(hasColor);

		// Run JSHint
		jshint({
			args: files,
			reporter: jshintrp.reporter,
			//withStdin: true
		});

		hooker.unhook(process.stdout, "write");

		if (win32) {
			output = output.replace(new RegExp(symbols.right, "g"), symbols.right + "\n");
		}

		return output;
	};

	it("should parse the given file (with errors)", function () {
		var files  = [fixture.A];
		var output = runJshint(files, false);
		assert.equal(output.split("\n")[1], " " + symbols.down + " " + files[0]);
	});

	it("should parse the given file (without error)", function () {
		var files  = [fixture.C];
		var output = runJshint(files, false);
		assert.equal(output.split("\n")[1], "");
		assert.equal(output.split("\n").length, 2);
	});

	it("should display only files which contain error(s)", function () {
		var files  = [fixture.C, fixture.A];
		var output = runJshint(files, false);
		assert.equal(output.split("\n")[1], " " + symbols.down + " " + files[1]);
	});

	it("should parse the given file (with colors)", function () {
		var files  = [fixture.A];
		var output = runJshint(files, true);
		assert.equal(output.split("\n")[1], "\x1b[0m\x1b[35m " + symbols.down + " " + files[0] + "\x1b[0m");
	});

	it("should return all errors (fixture A : 16 errors)", function () {
		var files          = [fixture.A];
		var output         = runJshint(files, false);
		var startBodyTable = 4;
		var endBodyTable   = output.split("\n").indexOf("", startBodyTable) - startBodyTable;
		assert.equal(endBodyTable, 16);
	});

	it("should return all errors (fixture B : 14 errors)", function () {
		var files          = [fixture.B];
		var output         = runJshint(files, false);
		var startBodyTable = 4;
		var endBodyTable   = output.split("\n").indexOf("", startBodyTable) - startBodyTable;
		assert.equal(endBodyTable, 14);
	});

	it("should display each line correctly in the console", function () {
		var files          = [fixture.A, fixture.B, fixture.C];
		var stdCols        = process.stdout.columns || 100;
		var output         = runJshint(files, false);
		var result = output.split("\n").every(function (line) {
			return line.length <= stdCols;
		});
		assert.equal(result, true);
	});

});
