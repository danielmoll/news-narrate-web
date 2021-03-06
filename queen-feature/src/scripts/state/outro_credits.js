/* global Phaser, Game */
'use strict';

var HEADING_SIZE = 25,
	DEFAULT_SIZE = 50;

Game.State.Outro_Credits = function() {};
Game.State.Outro_Credits.prototype = {
	text: [
		{ size: HEADING_SIZE, text: 'The Reign Game' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Starring' },
		{ text: '8-Bit Kay Burley' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Original Idea' },
		{ text: 'Mathieu Davy' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Digital Production' },
		{ text: 'Mary Poynter' },
		{ text: 'Tom Platt' },
		{ text: 'Hugh Westbrook' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Team Herding' },
		{ text: 'Laden Oksuzer' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Team Morale Officer' },
		{ text: 'Ronen Elman' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Mad Design Skillz' },
		{ text: 'Matt Simpson' },
		{ text: 'Justin Ewins' },
		{ text: 'James Ronan' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Developers' },
		{ text: 'Mathieu Davy' },
		{ text: 'Peji Faghihi' },
		{ text: 'Dan Forys' },
		{ text: 'Dan Moll' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Testing and QA' },
		{ text: 'Oge Opara-Nadi' },
		{ text: 'Joaquin Bello' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Chief iOS wrangler' },
		{ text: 'Kavi Kumra' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Chatbot Lolz' },
		{ text: 'Jamie Banglesnatch' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Production Kitten' },
		{ text: 'Nemo' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Special Thanks' },
		{ text: 'Richard Davey' },
		{ text: 'for the excellent Phaser game framework' },
		{ text: '&' },
		{ text: 'You, dear player for playing the Sky News products team\'s final project from London' },
		{ text: 'we ❤ you all' }
	],

	create: function () {
		this.game.world.width = this.game.width;
		this.game.world.height = this.game.height;

		var yPosition = this.game.world.centerY,
			textGroup = this.game.add.group();

		this.game.stage.backgroundColor = '#000';

		this.music = this.game.add.audio('credits');
		this.music.play();
		this.music.loopFull();


		this.game.fadePlugin.fadeIn(0x000, 750, 0);

		this.text.forEach(function(textItem) {
			textItem.gameText = new Phaser.Text(this.game, this.game.world.centerX, yPosition, textItem.text, { font: 'silkscreennormal', fontSize: textItem.size || DEFAULT_SIZE, fill: 'white', wordWrap: true, wordWrapWidth: this.game.world.width, align: 'center' } );
			textItem.gameText.anchor.set(0.5, 0);
			textGroup.add(textItem.gameText);
			yPosition += textItem.gameText.height;
			textItem.gameText.bringToTop();
		}.bind(this));

		setTimeout(function() {
			this.music.fadeOut(10000);
		}.bind(this), 50000);

		this.game.add.tween(textGroup).to({ y: -(textGroup.height + this.game.world.centerY )}, 60000, 'Linear', true)
			.onComplete.add(function() {
				this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
					this.game.state.start('outro_timemachine');
				});
			}.bind(this));
	},

};
