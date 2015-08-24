'use strict';

require('./common');

var	sane = require('sane'),
	uglify = require('./uglify'),
	watcher = sane(SRC_DIR, { glob: GLOB_PATTERN });

watcher.on('ready', uglify.bundle);
watcher.on('change', uglify.bundle);
watcher.on('add', uglify.bundle);