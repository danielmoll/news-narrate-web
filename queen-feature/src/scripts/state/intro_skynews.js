/* global Phaser, Game */
'use strict';

Game.State.Intro_Skynews = function() {};
Game.State.Intro_Skynews.prototype = {
	cursors: null,
	transitionning: false,

	create: function () {
		var bg,
			text,
			textClone,
			textGroup,
			tween;

        this.game.analytics.stateStarted('intro');
        this.transitionning = false;
        this.game.stage.backgroundColor = '#fff';

		this.game.sounds = {
            kay_voice_intro: this.game.add.audio('kay_voice_intro')
        };

		this.game.sounds.kay_voice_intro.play();
		this.game.sounds.kay_voice_intro.onStop.add(function() {
			this.kayMouth.animations.stop();
			this.kayMouth.frame = 0;
		}.bind(this));


		bg = this.game.add.image(0, 0, 'assets');
		bg.frameName = 'kayburley.png';

		text = this.game.add.image(0, 300, 'assets');
		textClone = this.game.add.image(568, 300, 'assets');
		text.frameName = 'intro-ticker.png';
		textClone.frameName = 'intro-ticker.png';

		textGroup = this.game.add.group();
		textGroup.add(text);
		textGroup.add(textClone);

		this.kayMouth = this.game.add.sprite(317, 150, 'kay_mouth');

		this.kayMouth.animations.add('talk', [1,0], 7, true);
		this.kayMouth.animations.play('talk');

		tween = this.game.add.tween(textGroup).to( { x: -568 }, 10000, "Linear", true);
		tween.repeat();

		this.clock = this.game.add.text(0, 300, " 00:00 ", {
			font: "16px Arial",
			fill: "#fff",
			backgroundColor: 'black',
			boundsAlignV: 'middle'
		});

		this.speechText1 = this.game.add.text(20, 80, "Breaking news just in to us here at Sky Centre. The Queen has lost a number of precious mementos  from her 63 year reign…", {
			font: "16px silkscreennormal",
			fill: "#000",
			backgroundColor: 'white',
			wordWrap: true,
			wordWrapWidth: 200
		});

		this.speechText2 = this.game.add.text(20, 80, "She wants you to try and help find them. Will you help her?", {
			font: "16px silkscreennormal",
			fill: "#000",
			backgroundColor: 'white',
			wordWrap: true,
			wordWrapWidth: 200
		});

		this.speechText2.visible = false;

		this.updateClock();
		this.game.time.events.loop(Phaser.Timer.SECOND, this.updateClock, this);

        this.game.fadePlugin.fadeIn(0x000, 750, 0);
        this.game.input.onDown.add(this.nextFrame, this);
		this.game.input.keyboard.addCallbacks(this, this.nextFrame);
	},

	shutdown: function() {
		this.game.sounds.kay_voice_intro.stop();
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
			this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
				this.game.state.start('intro_alexs_house');
			});
		}
	}
};
