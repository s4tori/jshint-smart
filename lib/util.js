"use strict";

var supportsColor = require("supports-color");
var util = module.exports;

// Detect whether a terminal supports color (and --color / --no-color arguments).
util.supportsColor = supportsColor;

// System (Windows or others)
util.win32 = ("win32" === process.platform);

// Symbols available in terminal default fonts
util.symbols = {
	ok   : !util.win32 ? "✓" : "\u221A",
	error: !util.win32 ? "✖" : "\u00D7",
	info : !util.win32 ? "ℹ" : "\u0021",
	warn : !util.win32 ? "⚠" : "\u203C",
	down : !util.win32 ? "↓" : "\u2193",
	left : !util.win32 ? "└" : "\u2514",
	right: !util.win32 ? "┐" : "\u2510"
};

// Color text with the given type
util.colors = {

	"table.file"    : [35],
	"table.head"    : [90],
	"table.icon"    : [90],
	"table.line"    : [97],
	"table.col"     : [37],
	"table.error"   : [94],
	"table.evidence": [90],

	"label.ok"      : [32],
	"label.error"   : [31, 1],
	"label.warn"    : [33, 1],
	"label.info"    : [34, 1],

	draw: function (type, text) {
		return util.supportsColor && util.colors[type] ?
			"\x1b[0m\x1b[" + util.colors[type].join("m\x1b[") + "m" + text + "\x1b[0m" :
			text;
	},

	drawLabel: function (type, count, label) {
		return !count ? "" : (
			" " + this.draw("label." + type, util.symbols[type]) +
			" " + count +
			" " + label + (count === 1 ? "" : "s") +
			"\n"
		);
	}
};
