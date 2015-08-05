(function() {
	require('./detect');
	require('./images');
	require('./video');
	require('./in-view');
	require('./navigation');
	require('./share');
	var resize = require('./resize');
	resize.init();
	window.responsiveImages.init();
}());