'use strict';

exports.imageTransitionHandler = function() {
	var imagesToTransition,
		pixUntilVisible,
		scrollTop,
		opacity,
		image,
		bound,
		i;

	scrollTop = (window.pageYOffset !== undefined) ?
				window.pageYOffset :
				(document.documentElement || document.body.parentNode || document.body).scrollTop;

	imagesToTransition = document.getElementsByClassName('image-transition-top');

	for (i = 0; i < imagesToTransition.length; i++) {

		image = imagesToTransition[i];
		bound = image.getBoundingClientRect();
		pixUntilVisible = bound.top / 2;
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

