'use strict';

Game.Map.Object.FloatingText = function(game, textItem) {
	this.game = game;
	this.text = game.add.text(textItem.x, textItem.y, textItem.properties.text, { font: '20px silkscreennormal', wordWrap: true, wordWrapWidth: (32 * textItem.properties.tiles), align: 'center', fill: '#000'} );
    this.text.anchor.set(0.5, 0.5);
};
