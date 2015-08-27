/* global Phaser, Game, LabelButton */
'use strict';

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

        var resetButton,
            col = 0,
            row = 0;

        this.game.add.image(0, 0, 'navigation_bg');

        resetButton = new LabelButton(this.game, 300, 260, null, 'RESET', this.showResetPopup, this, { font: '25px silkscreennormal', fill: '#ccc' });

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

        this.createResetPopup();
    },

    nextLevel: function (button) {
        if (!this.transitionning && !this.popup.visible) {
            this.transitionning = true;
            this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
                this.game.state.start(button.properties.stateKey || 'navigation');
            });
        }
    },

    createResetPopup: function () {
        var width = this.game.width - 30,
            height = this.game.height - 30,
            centerX = this.game.width / 2,
            centerY = this.game.height / 2,
            bmd = this.game.add.bitmapData(width, height),
            yesButton,
            noButton,
            popupTitle,
            popupText,
            popupBg;

        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, width, height);
        bmd.ctx.fillStyle = 'rgba(255,255,255, 0.9)';
        bmd.ctx.strokeStyle = 'rgba(0,0,0,0.6)';
        bmd.ctx.lineWidth = 5;

        bmd.ctx.fill();
        bmd.ctx.stroke();

        popupTitle = new Phaser.Text(this.game, 0, 0, 'Are you sure?', { font: '22px silkscreennormal', wordWrap: true, wordWrapWidth: this.game.width - 180, align: 'center'} ),
        popupText = new Phaser.Text(this.game, 0, 0, 'This will reset your progress and any items you have collected until now.', { font: '16px silkscreennormal', wordWrap: true, wordWrapWidth: this.game.width - 170, align: 'center'} ),
        popupBg = this.game.add.sprite(centerX, centerY, bmd);

        popupBg.visible = false;

        popupBg.anchor.set(0.5, 0.5);
        popupTitle.anchor.set(0.5, 3);
        popupText.anchor.set(0.5, 0.6);

        popupBg.addChild(popupTitle);
        popupBg.addChild(popupText);

        yesButton = new LabelButton(this.game, -65, 80, null, 'YES', this.resetGame, this, { fill: '#000' });
        noButton = new LabelButton(this.game, 50, 80, null, 'NO', this.hideResetPopup, this, { fill: '#000' });

        popupBg.addChild(yesButton);
        popupBg.addChild(noButton);

        this.popup = popupBg;
    },

    showResetPopup: function () {
        this.popup.visible = true;
    },

    hideResetPopup: function () {
        this.popup.visible = false;
    },

    resetGame: function () {
        Game.Score.resetAll();
        this.hideResetPopup();
        this.game.state.start('navigation');
    }
};
