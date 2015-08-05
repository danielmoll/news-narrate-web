'use strict';

var _ = require('lodash'),
	navigation = document.querySelector('.js-navigation'),
	scenes = document.querySelectorAll('.scene'),
	navigationParent = navigation.parentNode,
	navigationPosition = navigationParent.getBoundingClientRect().top + (document.body || document.documentElement).scrollTop,
	button = document.querySelector('.js-navigation-expand'),
	navList = document.querySelector('.js-navigation-list'),
	isAdded = false,
	linkItems = document.querySelectorAll('.navigation__link'),
	navIcon = document.querySelector('.js-nav-icon');

navIcon.style.display = 'none';
navigationParent.style.height = (navigationParent.getBoundingClientRect().height) + 'px';

function handleResize() {
	navigationParent.style.height = 'auto'; //reset
	navigationPosition = navigationParent.getBoundingClientRect().top + (document.body || document.documentElement).scrollTop;
	navigationParent.style.height = (navigationParent.getBoundingClientRect().height) ? (navigationParent.getBoundingClientRect().height) + 'px' : 'auto';
}

function handleScroll() {
	if (window.scrollY >= navigationPosition && !isAdded) {
		navigation.classList.add('navigation--sticky');
		navigation.classList.remove('navigation--active');
		button.addEventListener('click', handleClick);
		navIcon.style.display = 'inline-block';
		isAdded = true;
	} else if (window.scrollY < navigationPosition && isAdded) {
		navigation.classList.remove('navigation--sticky');
		navigation.classList.add('navigation--active');
		button.removeEventListener('click', handleClick);
		navIcon.style.display = 'none';
		isAdded = false;
	}
}

function handleClick() {
	navigation.classList.toggle('navigation--active');
}

function handleScenes() {
	_.forEach(scenes, function(scene) {
		var scene_anchor = scene.querySelector('.navigation__anchor');
		
		if (scene_anchor && scene_anchor.hasAttribute('id')) {
			var id = scene_anchor.getAttribute('id'),
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

_.forEach(linkItems, function(item) {
	item.addEventListener('click', handleClick);
});

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleResize);

handleScenes();
handleScroll();