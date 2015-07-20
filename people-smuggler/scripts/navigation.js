'use strict';

var navigation = document.querySelector('.navigation'),
	button = document.querySelector('.js-navigation-expand'),
	navList = document.querySelector('.js-navigation-list'),
	stop;

function setStop() {
	stop = navigation.getBoundingClientRect().top + (document.body || document.documentElement).scrollTop;
}

function handleClick() {
	navigation.classList.toggle('navigation--active');
}

function isSticky() {
	return ((document.body || document.documentElement).scrollTop >= stop);
}

function handleNavEvent() {
	if (isSticky()) {
		navigation.classList.add('navigation--sticky');
	} else {
		navigation.classList.remove('navigation--sticky');
	}
}

button.addEventListener('click', handleClick);
window.addEventListener('scroll', handleNavEvent);
window.addEventListener('resize', setStop);

setStop();
handleNavEvent();
