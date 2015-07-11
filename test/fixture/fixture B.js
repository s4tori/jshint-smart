// jshint-smart presents...
// The worst JS code you have ever seen 2
// JSHint errors : https://github.com/jshint/jshint/blob/master/src/messages.js


var myObject = function () {
	// E007: Missing "use strict" statement.
	// W018: Confusing use of '!'.
	// W003: 'foo' was used before it was defined.
	if (foo === !!crab) {
		var foo = "crab";
	}
};

// W001: 'hasOwnProperty' is a really bad name.
myObject.prototype.hasOwnProperty = function () {

	// W085: Don't use 'with'.
	with(this) {
		// W032:  Unnecessary semicolon.
		;
	}
};

// W121: "Extending prototype of native object
String.prototype.testFakeFunction = function () {

};

// W058: Missing '()' invoking a constructor.
var myObject = new myObject;

// W054: The Function constructor is a form of eval.
new Function("h2", "g2", 42);

// W003: 'crab' was used before it was defined.
// W057: "Weird construction. Is 'new' necessary?"
// E007: Missing "use strict" statement.
// W033: Missing semicolon.
var crab = new function () { 0+0 } ();
