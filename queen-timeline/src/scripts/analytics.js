'use strict';

var exports = {};
	

exports = {
    videoInView: function (label) {
        this.sendEvent(['Video', label]);
    },

    sendEvent: function (eventData) {
    	if (!window.ga) return;
		ga('send', 'event', 'Queen Timeline', eventData[0], eventData[1]);
    }
};

module.exports = exports;