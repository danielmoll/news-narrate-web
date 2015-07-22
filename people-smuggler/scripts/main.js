(function() {
	require('./detect');
	require('./images');
	require('./video');
	require('./parallax');
	require('./in-view');
	require('./navigation');
	require('./share');
	require('./documentary');
	var resize = require('./resize');
	resize.init();
	window.responsiveImages.init();
}());