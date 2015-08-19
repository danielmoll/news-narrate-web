'use strict';

var exports = {};
	

exports = {
    videoInView: function (label, url) {
        this.sendEvent(['Video in view', label, url]);
    },

    sendEvent: function (eventData) {
    	if (!window.ga) return;
		ga('send', 'event', 'Queen Timeline', eventData[0], eventData[1], eventData[2]);
    }
};

module.exports = exports;