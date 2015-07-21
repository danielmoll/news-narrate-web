'use strict';

var navigation = document.querySelector('.navigation'),
	navigationPosition = navigation.getBoundingClientRect(),
	navigationTop = navigationPosition.top + (document.body || document.documentElement).scrollTop,
	button = document.querySelector('.js-navigation-expand'),
	navList = document.querySelector('.js-navigation-list'),
	placeholder = document.createElement('div'),
	isAdded = false;

placeholder.style.width = navigationPosition.width + 'px';
placeholder.style.height = navigationPosition.height + 'px';

function handleResize() {
	navigationPosition = navigation.getBoundingClientRect();
	navigationTop = navigationPosition.top + (document.body || document.documentElement).scrollTop;
	placeholder.style.width = navigationPosition.width + 'px';
	placeholder.style.height = navigationPosition.height + 'px';

	handleScroll();
}

function handleScroll() {
	if (window.pageYOffset >= navigationTop && !isAdded) {
		navigation.classList.add('navigation--sticky');
		navigation.parentNode.insertBefore(placeholder, navigation);
		isAdded = true;
	} else if (window.pageYOffset < navigationTop && isAdded) {
		navigation.classList.remove('navigation--sticky');
		navigation.parentNode.removeChild(placeholder);
		isAdded = false;
	}
}

function handleClick() {
	navigation.classList.toggle('navigation--active');
}

button.addEventListener('click', handleClick);
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleResize);

handleScroll();