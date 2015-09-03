'use strict';

exports.imageTransitionHandler = function() {
	var imagesToTransition,
		pixUntilVisible,
		opacity,
		image,
		bound,
		lastImageIndex,
		i;

	imagesToTransition = document.getElementsByClassName('image-transition-top');

	for (i = 0; i < imagesToTransition.length; i++) {

		image = imagesToTransition[i];
		bound = image.getBoundingClientRect();
		pixUntilVisible = bound.top / 2;

    lastImageIndex = imagesToTransition.length -1;
    if (i === lastImageIndex) {
      pixUntilVisible = bound.top - 400 ;
    }

		opacity = (pixUntilVisible / 100) / 2;
		image.style.opacity = opacity;
	}
};

exports.init = function() {
	if (window.addEventListener) {
		window.addEventListener('scroll', exports.imageTransitionHandler, false);

	} else if (window.attachEvent) {
		window.attachEvent('onscroll', exports.imageTransitionHandler);
	}
};

module.exports = exports;

