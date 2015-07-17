'use strict';

var _ = require('lodash'),
	exports = {},
	THROTTLE_TIMEOUT = 250, // milliseconds between resize events
	listeningObjects = [],
	initialised = false,
	objectsToUnsubscribe = [],
	previousWidth,
	currentWidth,
	currentHeight;


exports._handleResize = function() {
	// Remove any unsubscribed callbacks
	listeningObjects = _.difference(listeningObjects, objectsToUnsubscribe);
	objectsToUnsubscribe = [];

	currentWidth = window.innerWidth;
	currentHeight = window.innerHeight;

	for (var i = 0, obj; (obj = listeningObjects[i]); i++ ) {
		obj.resize(currentWidth, currentHeight);
	}
};

exports.unsubscribeAll = function() {
	listeningObjects = [];
};

exports.subscribe = function(obj) {
	listeningObjects.push(obj);
};

exports.unsubscribe = function(obj) {
	objectsToUnsubscribe.push(obj);
};

exports.init = function() {
	if (initialised) return;

	window.addEventListener('resize', _.debounce(exports._handleResize, THROTTLE_TIMEOUT));
	window.addEventListener('scroll', _.debounce(exports._handleResize, THROTTLE_TIMEOUT));
	exports._handleResize();
};

exports.hasWidthChanged = function() {
	if (previousWidth === currentWidth) return false;
	previousWidth = currentWidth;
	return true;
};

module.exports = exports;
window.resize = exports;
