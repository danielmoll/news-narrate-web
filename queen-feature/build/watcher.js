'use strict';

require('./common');

var	sane = require('sane'),
	uglify = require('./uglify'),
	watcher = sane(SRC_DIR, { glob: GLOB_PATTERN });

watcher.on('ready', uglify.init);
watcher.on('change', uglify.uglify);
watcher.on('add', uglify.uglify);