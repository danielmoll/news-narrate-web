/* global Phaser */
'use strict';

var LabelButton = function(game, x, y, key, label, callback, callbackContext, labelOptions, overFrame, outFrame, downFrame, upFrame) {
    var options = { font: '35px silkscreennormal', fill: '#fff'},
        k;

    for (k in labelOptions) {
        options[k] = labelOptions[k];
    }

    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    this.anchor.setTo( 0.5, 0.5 );
    this.label = new Phaser.Text(game, 0, 0, label, options );

    // Puts the label in the center of the button
    // Not 0.5, 0.5 because of the font height offset
    this.label.anchor.setTo( 0.5, 0.63 );

    this.addChild(this.label);
    this.setLabel( label );

    //adds button to game
    game.add.existing( this );
};

LabelButton.prototype = Object.create(Phaser.Button.prototype);
LabelButton.prototype.constructor = LabelButton;

LabelButton.prototype.setLabel = function( label ) {
   this.label.setText(label);
};