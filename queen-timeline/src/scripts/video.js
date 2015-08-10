'use strict';

var _ = require('lodash'),
	videos = document.querySelectorAll('.js-video'),
	exports = {};

if (window.detect.touch) return;

exports.init = function() {
	_.forEach(videos, function(video) {
		video._onInView = function() {
			video.play();
		}.bind(video);

		video._onOutView = function() {
			video.pause();
		}.bind(video);
	});
};

module.exports = exports;

