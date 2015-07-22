var _ = require('lodash'),
	parallaxElements = document.querySelectorAll('.js-parallax'),
	currentViewportHeight = 0,
	previousScroll = window.scrollY,
	scrollResetTimeout;

if (window.detect.touch) return;

window.addEventListener('scroll', onScroll);

function onScroll() {
	var scrollDelta = window.scrollY - previousScroll,
		blur = Math.abs(scrollDelta / 5);

	if (blur > 5) blur = 5;

	currentViewportHeight = window.innerHeight;
	previousScroll = window.scrollY;

	_.forEach(parallaxElements, calculateTransform);
	_.forEach(parallaxElements, function(el) {
		if (el.parentNode._inView && !el.classList.contains('motion-blur')) {
			el.classList.add('motion-blur');
		}
	});

	clearTimeout(scrollResetTimeout);
	setTimeout(scrollReset, 30);
};

function calculateTransform(el) {
	if (!el.parentNode._inView) return;

	var parent = el.parentNode,
		boundingRect = parent.getBoundingClientRect();
		parentTop = boundingRect.top,
		height = el.offsetHeight,
		translation = Math.round((((parentTop + (el.parentNode.offsetHeight / 2)) / currentViewportHeight) * height) - (height - (el.parentNode.offsetHeight / 2)));

	el.style.transform = 'translateY(' + translation + 'px)';
	el.style.webkitTransform = 'translateY(' + translation + 'px)';
	el.style.mozTransform = 'translateY(' + translation + 'px)';
	el.style.MsTransform = 'translateY(' + translation + 'px)';
};

function scrollReset() {
	_.forEach(parallaxElements, function(el) {
		if (el.parentNode._inView) {
			el.classList.remove('motion-blur');
		}
	});
}