'use strict';

var _ = require('lodash'),
	navigation = document.querySelector('.js-navigation'),
	scenes = document.querySelectorAll('.scene'),
	navigationParent = navigation.parentNode,
	navigationPosition = navigationParent.getBoundingClientRect().top + (document.body || document.documentElement).scrollTop,
	button = document.querySelector('.js-navigation-expand'),
	navList = document.querySelector('.js-navigation-list'),
	isAdded = false,
	linkItems = document.querySelectorAll('.navigation__link');

navigationParent.style.height = navigationPosition.height + 'px';

function handleResize() {
	navigationPosition = navigationParent.getBoundingClientRect().top + (document.body || document.documentElement).scrollTop;
	navigationParent.style.height = navigationPosition.height + 'px';
}

function handleScroll() {
	if (window.scrollY >= navigationPosition && !isAdded) {
		navigation.classList.add('navigation--sticky');
		isAdded = true;
	} else if (window.scrollY < navigationPosition && isAdded) {
		navigation.classList.remove('navigation--sticky');
		isAdded = false;
	}
}

function handleClick() {
	navigation.classList.toggle('navigation--active');
}

function handleScenes() {
	_.forEach(scenes, function(scene) {
		if (scene.hasAttribute('id')) {
			var id = scene.getAttribute('id'),
				activeItem = document.querySelector('.navigation__link--' + id);
			
			scene._onInView = function() {
				_.forEach(linkItems, function(item) {
					item.classList.remove('navigation__link--active');
				});

				activeItem.classList.add('navigation__link--active');
			};
		}
	});
}

function handleNavClick() {
	navigation.classList.removeClass('navigation--active');
}

button.addEventListener('click', handleClick);
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleResize);

_.forEach(linkItems, function(item) {
	item.addEventListener('click', handleNavClick);
});

handleScenes();
handleScroll();