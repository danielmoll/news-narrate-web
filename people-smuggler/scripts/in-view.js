'use strict';

var _ = require('lodash'),
	inViewElements = document.querySelectorAll('.js-in-view');

window.addEventListener('scroll', onScroll);

function onScroll() {
	_.forEach(inViewElements, calculateInView);
}

function calculateInView(el) {
	var boundingRect = el.getBoundingClientRect();

	if (!el._inView && (boundingRect.bottom > 0 && boundingRect.top < window.innerHeight)) {
		el._inView = true;
		el._onInView && el._onInView();
		el.classList.add('in-view');
	}
	else if (el._inView && (boundingRect.bottom < 0 || boundingRect.top > window.innerHeight)) {
		el._inView = false;
		el._onOutView && el._onOutView();
		el.classList.remove('in-view');
	}


}

onScroll();