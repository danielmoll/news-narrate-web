/* global Game */
'use strict';

Game.Map.Object.FloatingText = function(game, textItem) {
    var color = textItem.properties.color || '#000',
        size = textItem.properties.size || 16;

	this.game = game;
	this.text = game.add.text(textItem.x, textItem.y, textItem.properties.text, { font: size + 'px silkscreennormal', wordWrap: true, wordWrapWidth: (32 * textItem.properties.tiles), align: 'center', fill: color} );
    this.text.anchor.set(0.5, 0.5);
};
