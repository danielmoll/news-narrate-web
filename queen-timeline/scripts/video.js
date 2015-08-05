'use strict';

var _ = require('lodash'),
	videos = document.querySelectorAll('.js-video');

if (window.detect.touch) return;

_.forEach(videos, function(video) {
	video._onInView = function() {
		video.play();
	}.bind(video);

	video._onOutView = function() {
		video.pause();
	}.bind(video);
});

