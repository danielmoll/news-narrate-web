'use strict';

require('./detect');

var $ = require('jquery'),
	inView = require('./in-view'),
	navigation = require('./navigation'),
	videos = require('./video'),
	images = require('./images'),
	resize = require('./resize'),
	share = require('./share');

$(function() {
	inView.init();
	resize.init();
	images.init();
	videos.init();
	share.init();
});