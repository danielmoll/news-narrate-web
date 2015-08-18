'use strict';

require('./common');

var uglify = require('uglifyjs'),
	glob = require('glob'),
	fs = require('fs-extra'),
	concat = require('concat-files'),
	exports = {},
	srcFiles = [];


exports.uglify = function() {
	try {
		var result = uglify.minify(DEST_DIR + 'bundle.min.js', { keep_fnames: true });	
	}
	catch (e) {
		console.log(e);
		return;
	}

	fs.writeFileSync(DEST_DIR + 'bundle.min.js', result.code);
	console.info('Generated new bundle.min.js');
};

exports.concat = function() {
	concat(srcFiles, DEST_DIR + 'bundle.min.js', function() {
		exports.uglify();
	});
};

exports.bundle = function() {
	glob(SRC_DIR + '/' + GLOB_PATTERN, function (er, files) {
		if (!er) {
			console.log('Concatinating:');
			files.forEach(function(file) {
				console.log(file);
				srcFiles.push(file);
			});

			exports.concat();
		}
	});
};

if (!module.parent) exports.bundle();

module.exports = exports;