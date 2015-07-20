'use strict';

function popup(e) {
	e.preventDefault();

	var url = e.target.parentNode.getAttribute('href'),
		newWindow = window.open(url, 'name', 'height=600, width=800');

	if (window.focus) {
		newWindow.focus();
	}

	return false;
}

var _ = require('lodash'),
	socialItems = document.querySelectorAll('.js-social-item');

if (window.detect.touch) return;

_.forEach(socialItems, function(socialItem) {
	socialItem.addEventListener('click', popup);
});