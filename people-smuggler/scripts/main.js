(function() {
	require('./detect');
	require('./images');
	require('./parallax');
	require('./in-view');
	var resize = require('./resize');
	resize.init();
	window.responsiveImages.init();
}());