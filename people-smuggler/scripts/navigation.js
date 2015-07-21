'use strict';

var navigation = document.querySelector('.navigation'),
	navigationPosition = navigation.getBoundingClientRect(),
	button = document.querySelector('.js-navigation-expand'),
	navList = document.querySelector('.js-navigation-list'),
	isAdded = false;

function handleClick() {
	navigation.classList.toggle('navigation--active');
}

function handleNavEvent() {
	if (window.pageYOffset >= navigationPosition.top && !isAdded) {
		navigation.classList.add('navigation--sticky');
		isAdded = true;
	} else if (window.pageYOffset < navigationPosition.top && isAdded) {
		navigation.classList.remove('navigation--sticky');
		isAdded = false;
	}
}

button.addEventListener('click', handleClick);
window.addEventListener('scroll', handleNavEvent);

handleNavEvent();