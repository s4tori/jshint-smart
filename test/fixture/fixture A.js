// jshint-smart presents...
// The worst JS code you have ever seen
// JSHint errors : https://github.com/jshint/jshint/blob/master/src/messages.js


// W117: 'foo' is not defined.
foo = "bar";

// W098: 'foobar' is defined but never used.
// W068: Wrapping non-IIFE function literals in parens is unnecessary.
var foobar = (function () {
	// W104: "'const' is available in ES6 <...>"
	// E007: Missing "use strict" statement.
	const myConst = "h2g2";
	// W104: "'const' is available in ES6 <...>"
	const myConst = "42";

	// W051: Variables should not be deleted.
	delete myConst;

	// W017: Bad operand.
	for (var i = 0, len = 5; i < len; ++i++) {

		noop();

		// W083: Don't make functions within a loop.
		// W003: 'noop' was used before it was defined.
		var noop = function () {
			// W087: Forgotten 'debugger' statement?
			debugger;
			// W093: Did you mean to return a conditional instead of an assignment?
			return noop = 9 + 0;
		};
	// W032: Unnecessary semicolon
	};
// W033: Missing semicolon.
})
