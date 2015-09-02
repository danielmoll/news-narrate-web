'use strict';

require('./detect');

var $ = require('jquery'),
	inView = require('./in-view'),
	share = require('./share'),
  	imageTransition = require('./image-transition.js'),
  	navigation = require('./navigation.js');

$(function() {
	share.init();
  	imageTransition.init();
  	navigation.init();

	inView.init(); // this has to fire last
});
