'use strict';

var navigation = document.querySelector('.navigation'),
	button = document.querySelector('.js-navigation-expand'),
	navList = document.querySelector('.js-navigation-list'),
	stop = navigation.getBoundingClientRect().top + (document.body || document.documentElement).scrollTop;

function handleClick() {
	navigation.classList.toggle('navigation--active');
}

function sticky() {
	var scrollTop = (document.body || document.documentElement).scrollTop;

	if (scrollTop >= stop) {
		navigation.classList.add('navigation--sticky');
	} else {
		navigation.classList.remove('navigation--sticky');
	}
}

button.addEventListener('click', handleClick);
window.addEventListener('scroll', sticky);
