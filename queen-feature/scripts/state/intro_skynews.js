/* global Phaser, Game */
'use strict';

Game.State.Intro_Skynews = function() {};
Game.State.Intro_Skynews.prototype = {
    cursors: null,
    transitionning: false,

    create: function () {
        this.game.analytics.sendEvent('New state Intro_Skynews');
        this.transitionning = false;
        this.game.fadePlugin.fadeIn(0x000, 750, 0);
        this.game.stage.backgroundColor = '#fff';
        this.frameCounter = 0;

        this.game.add.image(0, 0, 'kay');

        var skynewsLogo = this.game.add.image(10, 10, 'skynews_logo');

	    var text = this.game.add.image(0, 300, 'intro_ticker');
	    var textClone = this.game.add.image(568, 300, 'intro_ticker');
	    var textGroup = this.game.add.group();
	    textGroup.add(text);
	    textGroup.add(textClone);

	    var tween = this.game.add.tween(textGroup).to( { x: -568 }, 10000, "Linear", true);
	    tween.repeat();

		this.clock = this.game.add.text(0, 300, " 00:00 ", {
		    font: "16px Arial",
		    fill: "#fff",
		    backgroundColor: 'black',
		    boundsAlignV: 'middle'
		});

		this.speechText1 = this.game.add.text(10, 50, "A dastardly villain has travelled through time and stolen artifacts from the Queen's reign", {
		    font: "16px Arial",
		    fill: "#000",
		    backgroundColor: 'white',
		    wordWrap: true, 
		    wordWrapWidth: 200
		});

		this.speechText2 = this.game.add.text(10, 50, "Police are baffled. Won't somebody come forward and help? For our country!", {
		    font: "16px Arial",
		    fill: "#000",
		    backgroundColor: 'white',
		    wordWrap: true, 
		    wordWrapWidth: 200
		});

		this.speechText2.visible = false;

		this.updateClock();
		this.game.time.events.loop(Phaser.Timer.SECOND, this.updateClock, this);
		this.game.add.button(this.game.width - 120, this.game.height - 50, 'next_button', this.nextFrame, this);
    },

    nextFrame: function() {
    	if (this.speechText1.visible) {
    		this.speechText2.visible = true;
    		this.speechText1.visible = false;
    	}
    	else {
    		if (!this.transitionning) {
	            this.transitionning = true;
	            this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
	                this.game.state.start('tutorial');
	            });
       		}
    	}
    },

    updateClock: function() {
    	var date = new Date();
    	this.clock.setText(' ' + date.getHours() + ':' + date.getMinutes() + ' ');
    },

    nextLevel: function () {
        if (!this.transitionning) {
            this.transitionning = true;
            this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
                this.game.state.start('decade_50s');
            });
        }
    }
};
