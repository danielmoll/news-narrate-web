'use strict';

require('./detect');

var $ = require('jquery'),
	inView = require('./in-view'),
	share = require('./share');

$(function() {
	share.init();

	inView.init(); // this has to fire last
});
