'use strict';

var navigation = document.querySelector('.navigation'),
	button = document.querySelector('.js-navigation-expand'),
	navList = document.querySelector('.js-navigation-list'),
	stop = navigation.getBoundingClientRect().top;

function handleClick() {
	navigation.classList.toggle('navigation--active');
}

function sticky() {
	var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

	console.log(scrollTop, stop);

	if (scrollTop >= stop) {
		navigation.classList.add('navigation--sticky');
	} else {
		navigation.classList.remove('navigation--sticky');
	}
}

button.addEventListener('click', handleClick);
window.addEventListener('scroll', sticky);
