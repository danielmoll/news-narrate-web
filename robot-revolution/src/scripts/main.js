'use strict';

require('./detect');

var $ = require('jquery'),
	inView = require('./in-view'),
	scene = require('./scene'),
	images = require('./images'),
	resize = require('./resize'),
	share = require('./share');

$(function() {
	scene.init();
	resize.init();
	images.init();
	share.init();

	inView.init(); // this has to fire last
});
