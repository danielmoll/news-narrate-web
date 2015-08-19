'use strict';

var exports = {};
	

exports = {
    videoInView: function (name) {
        this.sendEvent(['video in view', name]);
    },

    sendEvent: function (eventData) {
		ga('send', 'event', 'Queen Timeline', eventData[0], eventData[1]);
    }
};

module.exports = exports;