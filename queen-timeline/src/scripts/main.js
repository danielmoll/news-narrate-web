'use strict';

require('./detect');

var $ = require('jquery'),
	inView = require('./in-view'),
	scene = require('./scene'),
	navigation = require('./navigation'),
	videos = require('./video'),
	images = require('./images'),
	resize = require('./resize'),
	share = require('./share');

$(function() {
	scene.init();
	resize.init();
	images.init();
	videos.init();
	share.init();
	navigation.init();

	inView.init(); // this has to fire last
});