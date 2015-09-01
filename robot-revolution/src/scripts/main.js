'use strict';

require('./detect');

var $ = require('jquery'),
	inView = require('./in-view'),
	// scene = require('./scene'),
	share = require('./share');

$(function() {
	// scene.init();
	share.init();

	inView.init(); // this has to fire last
});
