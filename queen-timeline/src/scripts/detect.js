'use strict';

var html = document.querySelector('html'),
	detectedFeatures = [],
	detectedFeaturesMap = {},
	tests = {},
	result;

tests.touch = function() {
	return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
}

for (var test in tests) {
	result = tests[test]();
	detectedFeatures.push(result ? test : 'no-' + test);
	detectedFeaturesMap[result ? test : 'no-' + test] = true;
}

detectedFeatures.forEach(function(feature) {
	html.classList.add(feature);
});

module.exports = detectedFeatures;
window.detect = detectedFeaturesMap;
