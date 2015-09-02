'use strict';

require('./detect');

var $ = require('jquery'),
	inView = require('./in-view'),
	share = require('./share'),
  imageTransition = require('./image-transition.js');

$(function() {
	share.init();
  imageTransition.init();

	inView.init(); // this has to fire last
});
