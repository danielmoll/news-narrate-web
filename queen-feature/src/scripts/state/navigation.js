/* global Phaser, Game */
'use strict';

var LabelButton = function(game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
 
    this.anchor.setTo( 0.5, 0.5 );
    this.label = new Phaser.BitmapText(game, 0, 0, 'pixeltype', label, 48);
 
    //puts the label in the center of the button
    this.label.anchor.setTo( 0.5, 0.5 );
 
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

Game.State.Navigation = function() {};
Game.State.Navigation.prototype = {
    cursors: null,
    transitionning: false,
    buttonsOriginX: 33,
    buttonsOriginY: 45,
    buttonsMargin: 30,
    buttonsPerRow: 3,
    buttonHeight: 59,
    buttonWidth: 110,
    collectibleSize: 10,

    create: function () {
        this.game.analytics.stateStarted('navigation');
        this.transitionning = false;
        this.createState();
        this.game.fadePlugin.fadeIn(0x000, 750, 0);
    },

    createState: function() {
        var col = 0,
            row = 0;

        this.game.add.image(0, 0, 'navigation_bg'),

        this.buttonsGroup = this.game.add.group();

        Game.Levels.forEach(function(level) {
            var levelScore = Game.Score.levelScores[level.stateKey],
                collectibleId = 0,
                button,
                x,
                y;

            x = this.buttonsOriginX + row * (this.buttonWidth + this.buttonsMargin) + this.buttonWidth / 2;
            y = this.buttonsOriginY + col * (this.buttonHeight + this.buttonsMargin) + this.buttonHeight / 2;

            button = new LabelButton(this.game, x, y, null, level.text, this.nextLevel, this);
            button.properties = level;

            level.collectibles.forEach(function(collectible) {
                var collx = x + collectibleId * 39 - this.buttonWidth / 2 + 15,
                    colly = y + this.buttonHeight - this.buttonHeight / 2 + 8,
                    collected = false,
                    collBg,
                    scale;

                if (levelScore && levelScore.scoredItems && levelScore.scoredItems[collectible]) {
                    collected = true;
                }

                if (collectible !=='.' && collected) {
                    collBg = this.game.add.sprite(collx, colly, collectible);
                    collBg.anchor.setTo( 0.5, 0.5 );
                    
                    scale = Math.min(this.collectibleSize / collBg.width, this.collectibleSize / collBg.height);
                    collBg.scale.setTo(scale, scale);
                }

                collectibleId ++;

            }.bind(this));

            if (row + 1 >= this.buttonsPerRow) {
                row = 0;
                col++;
            } else {
                row++;
            }

        }.bind(this));

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    nextLevel: function (button) {
        if (!this.transitionning) {
            this.transitionning = true;
            this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
                this.game.state.start(button.properties.stateKey || 'intro_skynews');
            });
        }
    }
};
