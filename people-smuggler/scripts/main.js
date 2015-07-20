(function() {
	require('./detect');
	require('./images');
	require('./parallax');
	require('./in-view');
	require('./navigation');
	require('./share');
	var resize = require('./resize');
	resize.init();
	window.responsiveImages.init();
}());