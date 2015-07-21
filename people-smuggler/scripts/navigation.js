'use strict';

var navigation = document.querySelector('.navigation'),
	navigationPosition = navigation.getBoundingClientRect(),
	button = document.querySelector('.js-navigation-expand'),
	navList = document.querySelector('.js-navigation-list'),
	placeholder = document.createElement('div'),
	isAdded = false;

placeholder.style.width = navigationPosition.width + 'px';
placeholder.style.height = navigationPosition.height + 'px';

function handleClick() {
	navigation.classList.toggle('navigation--active');
}

function handleNavEvent() {
	if (window.pageYOffset >= navigationPosition.top && !isAdded) {
		navigation.classList.add('navigation--sticky');
		navigation.parentNode.insertBefore(placeholder, navigation);
		isAdded = true;
	} else if (window.pageYOffset < navigationPosition.top && isAdded) {
		navigation.classList.remove('navigation--sticky');
		navigation.parentNode.removeChild(placeholder);
		isAdded = false;
	}
}

button.addEventListener('click', handleClick);
window.addEventListener('scroll', handleNavEvent);

handleNavEvent();