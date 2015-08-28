/* global Phaser, Game */
'use strict';

Game.State.Outro_Skynews = function() {};
Game.State.Outro_Skynews.prototype = {
	cursors: null,
	transitionning: false,

	create: function () {
		var text,
			textClone,
			textGroup,
			tween;

        this.game.analytics.stateStarted('intro');
        this.transitionning = false;
        this.game.stage.backgroundColor = '#fff';

		this.game.add.image(0, 0, 'kay');

		text = this.game.add.image(0, 300, 'outro_ticker');
		textClone = this.game.add.image(568, 300, 'outro_ticker');
		textGroup = this.game.add.group();
		textGroup.add(text);
		textGroup.add(textClone);

		tween = this.game.add.tween(textGroup).to( { x: -568 }, 10000, "Linear", true);
		tween.repeat();

		this.clock = this.game.add.text(0, 300, " 00:00 ", {
			font: "16px Arial",
			fill: "#fff",
			backgroundColor: 'black',
			boundsAlignV: 'middle'
		});

		this.speechText1 = this.game.add.text(20, 80, "Sky sources are reporting an unknown individual has recovered items belonging to the Queen, thought to have been lost in time.", {
			font: "16px silkscreennormal",
			fill: "#000",
			backgroundColor: 'white',
			wordWrap: true,
			wordWrapWidth: 200
		});

		this.speechText2 = this.game.add.text(20, 80, "Very little is known about the time-traveller… but it’s believed they have been invited to Buckingham Palace for a personal thank you from her Majesty.", {
			font: "16px silkscreennormal",
			fill: "#000",
			backgroundColor: 'white',
			wordWrap: true,
			wordWrapWidth: 200
		});

		this.speechText2.visible = false;

		this.updateClock();
		this.game.time.events.loop(Phaser.Timer.SECOND, this.updateClock, this);

        // this.game.fadePlugin.fadeIn(0x000, 750, 0);
        this.game.input.onDown.add(this.nextFrame, this);
		this.game.input.keyboard.addCallbacks(this, this.nextFrame);
	},

	nextFrame: function() {
		if (this.speechText1.visible) {
			this.speechText2.visible = true;
			this.speechText1.visible = false;
		}
		else {
			this.nextLevel();
		}
	},

	updateClock: function() {
		var date = new Date();
		this.clock.setText(' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ' ');
	},

	nextLevel: function () {
		if (!this.transitionning) {
			this.transitionning = true;
			// this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
				this.game.state.start('outro_credits');
			// });
		}
	}
};
