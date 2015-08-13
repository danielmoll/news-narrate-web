'use strict';

require('./common');

var uglify = require('uglifyjs'),
	glob = require('glob'),
	fs = require('fs-extra'),
	exports = {};

exports.uglify = function(filepath) {
	var result = uglify.minify(SRC_DIR + '/' + filepath),
		file = filepath.split('/').pop().replace('.js', '.min.js');

	fs.writeFileSync(DEST_DIR + file, result.code);
	console.info('generated new ' + DEST_DIR + file);
};

exports.init = function() {
	glob(SRC_DIR + '/' + GLOB_PATTERN, function (er, files) {
		if (!er) {
			files.forEach(function(file) {
				exports.uglify(file.replace(SRC_DIR + '/', ''));
			});
		}
	});
};

module.exports = exports;