/* global Phaser, Game */
'use strict';

Game.State.EndScreen = function() {};
Game.State.EndScreen.prototype = {
    cursors: null,
    transitionning: false,

    fixedTextOverlays: [
        { text: "Well done", size: 100, x: 20, y: 20, alpha: 0.2 },
        { text: "All royal artefacts have been returned!", size: 20, x: 20, y: 120 }
    ],

    create: function () {
        this.game.analytics.gameCompleted();
        this.transitionning = false;
        this.createState();
        this.game.fadePlugin.fadeIn(0x000, 750, 0);
    },

    createState: function() {
        var bg = this.game.add.graphics(0, 0);
        bg.beginFill(0X000, 1);
        bg.drawRect(this.game.camera.x, this.game.camera.y, this.game.width * 1.5, this.game.height * 1.5);
        bg.endFill();

        this.textGroup = this.game.add.group();
        this.textGroup.fixedToCamera = false;
        this.textGroup.alpha = 1;
        this.fixedTextOverlays.forEach(function(textItem) {
            var txtElement = new Phaser.BitmapText(this.game, textItem.x, textItem.y, 'pixeltype', textItem.text, textItem.size);
            txtElement.alpha = textItem.alpha || 1;
            this.textGroup.add(txtElement);
        }.bind(this));

        this.game.add.button(this.game.width - 120, this.game.height - 50, 'next_button', this.nextLevel, this);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    nextLevel: function () {
        if (!this.transitionning) {
            this.transitionning = true;
            this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
                this.game.state.start('navigation');
            });
        }
    }
};
