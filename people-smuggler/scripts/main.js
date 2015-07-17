(function() {
	require('./detect');
	require('./images');
	require('./parallax');
	require('./in-view');
	require('./navigation');
	var resize = require('./resize');
	resize.init();
	window.responsiveImages.init();
}());