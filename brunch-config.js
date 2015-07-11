exports.config = {
	paths: {
		watched: ["test/fixture"]
	},
	files: { 

	},
	plugins: {
		jshint: {
			pattern: /^test(\/|\\)fixture(\/|\\).*\.js$/,
			reporter: "../../../lib/index"
		}
	}
};
