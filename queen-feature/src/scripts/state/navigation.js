/* global Phaser, Game, LabelButton */
'use strict';

Game.State.Navigation = function() {};
Game.State.Navigation.prototype = {
    cursors: null,
    transitionning: false,
    buttonsOriginX: 31,
    buttonsOriginY: 45,
    buttonsMargin: 30,
    buttonsPerRow: 3,
    buttonHeight: 59,
    buttonWidth: 110,
    collectibleSize: 10,
    musicButton: null,
    soundButton: null,

    create: function () {
        this.game.analytics.stateStarted('navigation');
        this.transitionning = false;
        this.createState();
        this.game.fadePlugin.fadeIn(0x000, 750, 0);
        this.game.sounds && this.game.sounds.bgmusic && this.game.sounds.bgmusic.stop();
    },

    createState: function() {

        var navBg = this.game.add.image(0, 0, 'assets'),
            resetButton,
            col = 0,
            row = 0;

        navBg.frameName = 'navigation.png';

        resetButton = new LabelButton(this.game, 505, 200, null, 'RESET', this.showResetPopup, this, { font: '20px silkscreennormal', fill: '#ccc' });

        this.musicButton = this.game.add.button(510, 75, 'assets', Game.SoundControls.toggleMusic.bind(Game.SoundControls), this);
        this.musicButton.visible = false;
        this.musicButton.anchor.setTo(0.5, 0.5);
        this.musicButton.frameName = Game.musicEnabled ? 'music.png' : 'music_off.png';

        this.soundButton = this.game.add.button(505, 75, 'assets', Game.SoundControls.toggleSound.bind(Game.SoundControls), this);
        this.soundButton.anchor.setTo(0.5, 0.5);
        this.soundButton.frameName = Game.soundEnabled ? 'sound.png' : 'sound_off.png';

        this.jewel = this.game.add.sprite(180, 220, 'assets');
        this.jewel.frameName = 'jewel.png';

        this.jewelTotal = this.game.add.text(210, 223, Game.Score.getCurrentJewelScore() + ' / ' + Game.Score.totalJewels, { font: '20px silkscreennormal', fill: '#fff' });

        this.ratingText = this.game.add.text(184, 250, 'Current rating:', { font: '20px silkscreennormal', fill: '#fff' });
        this.ratingLevelText = this.game.add.text(184, 270, Game.Score.getCurrentRating(), { font: '20px silkscreennormal', fill: '#fff' });

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
                var collx = x + collectibleId * 39 - this.buttonWidth / 2 + 17,
                    colly = y + this.buttonHeight - this.buttonHeight / 2 + 8,
                    collected = false,
                    collBg,
                    scale;

                if (levelScore && levelScore.scoredItems && levelScore.scoredItems[collectible]) {
                    collected = true;
                }

                if (collectible !=='.' && collected) {
                    collBg = this.game.add.sprite(collx, colly, 'assets');
                    collBg.frameName = collectible + '.png';
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
        var centerX = this.game.width / 2,
            centerY = this.game.height / 2,
            yesButton,
            noButton,
            popupTitle,
            popupText,
            popupBg;

        popupTitle = new Phaser.BitmapText(this.game, 0, 0, 'pixeltype', 'Are you sure?', 65);
        popupText = new Phaser.BitmapText(this.game, 0, 0, 'pixeltype', 'This will reset your progress and lose\nany items you have collected until now.', 36);
        popupBg = this.game.add.sprite(centerX, centerY, 'assets');
        popupBg.frameName = 'reset_panel.png';

        popupBg.visible = false;

        popupBg.anchor.set(0.5, 0.5);
        popupTitle.anchor.set(0.5, 2.5);
        popupText.anchor.set(0.5, 1);

        popupText.lineSpacing = -15;

        popupBg.addChild(popupTitle);
        popupBg.addChild(popupText);

        yesButton = new LabelButton(this.game, -72, 73, null, 'Yes', this.resetGame, this, { font: '28px silkscreennormal', fill: '#fff' });
        noButton = new LabelButton(this.game, 71, 73, null, 'No', this.hideResetPopup, this, { font: '28px silkscreennormal', fill: '#fff' });
        yesButton.anchor.setTo(0.5, 0.5);
        noButton.anchor.setTo(0.5, 0.5);

        popupBg.addChild(yesButton);
        popupBg.addChild(noButton);

        this.popup = popupBg;
    },

    update: function () {
        this.musicButton.frameName = Game.SoundControls.musicEnabled ? 'music.png' : 'music_off.png';
        this.soundButton.frameName = Game.SoundControls.soundEnabled ? 'sound.png' : 'sound_off.png';
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
