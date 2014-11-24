// W117: 'foo' is not defined.
foobar(foo);

// W003: 'foobar' was used before it was defined.
var foobar = function (test) {
	// E007: Missing "use strict" statement.
	// W116: Expected '===' and instead saw '=='.
	// W014: Bad line breaking before '?'.
	return test == "foo"
		? "bar"
		: ""
	;
// W033: Missing semicolon.
}
