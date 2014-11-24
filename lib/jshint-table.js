"use strict";
var util  = require("./util");
var table = module.exports;

var getNewConfig = function () {
	return {
		head: [
			{ id: "icon"    , label : " "       , width:    3, paddingRight: true , visible: true  },
			{ id: "line"    , label : "Line"    , width:    6, paddingRight: true , visible: true  },
			{ id: "col"     , label : "Col"     , width:    6, paddingRight: true , visible: true  },
			{ id: "code"    , label : "Code"    , width:    6, paddingRight: true , visible: false },
			{ id: "error"   , label : "Error"   , width:   50, paddingRight: false, visible: true  },
			{ id: "evidence", label : "Evidence", width: null, paddingRight: false, visible: true  }
		],
		style: { paddingLeft: " ", paddingRight: " ", minWidth: 20 }
	};
};

var TableManager = function (verbose) {
	this._initialize(verbose);
};

TableManager.prototype = {

	constructor: TableManager,

	setRows: function (rows) {
		this.rows.push(rows);
	},

	getRow: function (rowId) {
		var cols = this.options.head;
		for (var i = 0, n = cols.length; i < n; ++i) {
			if (cols[i].id === rowId) {
				return cols[i];
			}
		}
		return null;
	},

	_initialize: function (verbose) {
		this.options = getNewConfig();
		this.rows    = [];
		var stdCols  = process.stdout.columns || 100;
		var cfg      = this.options.head;
		var minWidth = this.options.style.minWidth;
		var lastRow  = this.getRow("evidence");
		var errorRow = this.getRow("error");

		if (verbose) {
			this.getRow("code").visible = true;
		}

		var total = this.options.head.reduce(function (prev, curr) {
			return { width: prev.width + ((curr.visible && curr.width) || 0) };
		});

		lastRow.width = stdCols - total.width;
		lastRow.width = lastRow.width - (util.win32 ? 1 : 0);

		// The last column needs to be hidden
		if (lastRow.width <= minWidth || cfg.hideLastColumn) {
			errorRow.width += lastRow.width;
			this.options.head.pop();
		}
	},

	_trim: function (column, text) {
		var style = this.options.style;
		var width = column.width - style.paddingLeft.length- style.paddingRight.length;
		text = text || "";
		return text.length > width ?
			text.substring(0, width - 1) + "…" :
			this._pad(text, width, column.paddingRight);
	},

	// pad numbers
	_pad: function (text, width, right, character) {
		text = text + "";
		character = character || " ";
		if (text.length >= width) {
			return text;
		}
		return right ?
			new Array(width - text.length + 1).join(character) + text :
			text + new Array(width - text.length + 1).join(character)
		;
	},

	toString: function () {

		var result  = "";
		var that    = this;
		var style   = this.options.style;
		var stdCols = process.stdout.columns || 100;
		var draw    = util.colors.draw;
		var text    = null;
		var columns = this.options.head;

		// Header
		result += util.symbols.left + this._pad("", stdCols - 2, false, "─") + util.symbols.right;
		result += util.win32 ? "" : "\n";
		columns.forEach(function (col) {
			if (!col.visible) {
				return;
			}
			text = that._trim(col, col.label);
			result += style.paddingLeft + draw("table.head", text) + style.paddingRight;
		});
		result += "\n";

		// Body
		this.rows.forEach(function (row) {
			columns.forEach(function (col, iCol) {
				if (!col.visible) {
					return;
				}
				text = that._trim(col, row[iCol]);
				result += style.paddingLeft + draw("table." + col.id, text) + style.paddingRight;
			});

			result += "\n";
		});

		return result;
	}

};

// Initialize table style
table.getTable = function (verbose) {
	return new TableManager(verbose);
};
