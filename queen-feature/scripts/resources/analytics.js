/* global Game, ga */
'use strict';

Game.Analytics = {
    stateStarted: function (name) {
        this.sendEvent(['state started', name]);
    },

    stateComplete: function (name) {
        this.sendEvent(['state completed', name]);
    },

    itemCollected: function (name) {
        this.sendEvent(['item collected', name]);
    },

    gameCompleted: function () {
        this.sendEvent(['game completed']);
    },

    sendEvent: function (eventData) {
        // Non-blocking analytics report.
        setTimeout(function() {
            ga('send', 'event', 'The Reign Game', eventData[0], eventData[1]);
        }, 1);
    }
};
