'use strict';

var $ = require('jquery'),
	analytics = require('./analytics'),
	$videos = $('.js-video'),
	exports = {},
	Video;

Video = function(el) {
	this.customEvent = false;
	this.el = el;

	this.el._onInView = this.onInView.bind(this);
	this.el._onOutView = this.onOutView.bind(this);
};

Video.prototype = {
	onInView: function(e) {
		if (!this.customEvent) {
			analytics.videoInView($(this.el).data('label'));
			this.customEvent = true;
		}

		if (!this.el.attributes.controls) this.el.play();
	},

	onOutView: function() {
		this.el.pause();
	}
};

exports.init = function() {
	if (window.detect.touch) return;

	$videos.each(function() {
		return new Video(this);
	});
};

module.exports = exports;

