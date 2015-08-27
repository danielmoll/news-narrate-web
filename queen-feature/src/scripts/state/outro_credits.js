/* global Phaser, Game */
'use strict';

var HEADING_SIZE = 25,
	DEFAULT_SIZE = 50;

Game.State.Outro_Credits = function() {};
Game.State.Outro_Credits.prototype = {
	cursors: null,
	transitionning: false,
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
		{ size: HEADING_SIZE, text: 'Mad Design Skillz' },
		{ text: 'Matt Simpson' },
		{ text: 'Justin Ewins' },
		{ text: 'James Eccleston' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Developers' },
		{ text: 'Mathieu Davy' },
		{ text: 'Peji Faghihi' },
		{ text: 'Dan Forys' },
		{ text: 'Dan Moll' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Testing and QA' },
		{ text: 'Oge Opara-Nadi' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Chatbot Lolz' },
		{ text: 'Jamie Banglesnatch' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Production Kittens' },
		{ text: 'Nemo' },
		{ text: ' ' },
		{ size: HEADING_SIZE, text: 'Special Thanks' },
		{ text: 'Richard Davey' },
		{ text: 'for the excellent Phaser game framework' },
		{ text: '&' },
		{ text: 'You, dear user for playing the Sky News products team\'s final project from London' },
		{ text: 'we ❤ you all' }
	],

	create: function () {
		var yPosition = this.game.world.centerY,
			textGroup = this.game.add.group();

		this.text.forEach(function(textItem) {
			textItem.gameText = new Phaser.Text(this.game, this.game.world.centerX, yPosition, textItem.text, { font: 'silkscreennormal', fontSize: textItem.size || DEFAULT_SIZE, fill: 'white', wordWrap: true, wordWrapWidth: this.game.world.width, align: 'center' } );
			textItem.gameText.anchor.set(0.5, 0);
			textGroup.add(textItem.gameText);
			yPosition += textItem.gameText.height;
		}.bind(this));

		this.game.add.tween(textGroup).to({ y: -(textGroup.height + this.game.world.centerY )}, 60000, 'Linear', true)
			.onComplete.add(function() {
				this.game.state.start('outro_timemachine');
			}.bind(this));
	},

};
