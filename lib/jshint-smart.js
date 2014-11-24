//               ____________
//              /\          /\       ______________________
//             /  \        /  \
//            /____\______/    \     ❤ JsHint Smart
//            \    /      \    /     ☯ s4tori
//             \  /        \  /      ______________________
//              \/__________\/
"use strict";

var util        = require("./util");
var jsTable     = require("./jshint-table");
var jshintSmart = module.exports;


var getCode = function (code) {
	code = (code && code[0]) || "U";
	switch (code) {
		case "E": return "error";
		case "W": return "warn";
		case "I": return "info";
		default : return "unknown";
	}
};

var renderTable = function (results, verbose) {
	var table = jsTable.getTable(verbose);

	results.forEach(function (error) {
		table.setRows([
			util.symbols[getCode(error.code)],
			error.line,
			error.character,
			error.code,
			error.reason,
			error.evidence ? error.evidence.trim().replace(/\t/g, "") : ""
		]);
	});

	return table.toString();
};

var getResultStatus = function (counter) {

	if (!counter.total) {
		return util.colors.draw("label.ok" , util.symbols.ok + " No problems\n");
	}

	var result = "";
	result += util.colors.drawLabel("error", counter.error, "error");
	result += util.colors.drawLabel("warn" , counter.warn , "warn");
	result += util.colors.drawLabel("info" , counter.info , "info");

	return result;
};

jshintSmart.reporter = function (results, data, options) {
	var txt = "";
	var tables = [];
	var currentTable = null;

	options = options || {};

	results.forEach(function (result) {
		if (!currentTable || currentTable.file !== result.file) {
			currentTable = {
				"file"   : result.file,
				"results": [],
				counter  : { error: 0, warn: 0, info: 0, unknown: 0, total: 0 }
			};
			tables.push(currentTable);
		}

		currentTable.results.push(result.error);
		++currentTable.counter[getCode(result.error.code)];
		++currentTable.counter["total"];
	});

	tables.forEach(function (table) {
		table.results.sort(function (a, b) {
			return a.line === b.line ?
				(a.character > b.character ? 1 : -1) :
				(a.line > b.line ? 1 : -1);
		});

		txt += "\n" + util.colors.draw("table.file", " " + util.symbols.down + " " + table.file);
		txt += "\n" + renderTable(table.results, options.verbose);
		txt += "\n" + getResultStatus(table.counter);
		txt += "\n";
	});

	console.log(txt);
};

jshintSmart.setColor = function (hasColor) {
	util.supportsColor = hasColor;
};
