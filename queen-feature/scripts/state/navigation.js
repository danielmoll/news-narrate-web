/* global Game */
'use strict';

Game.State.Navigation = function() {};
Game.State.Navigation.prototype = {
    cursors: null,
    transitionning: false,
    levels: [
        { text: '50s', stateKey: 'decade_50s', spriteKey: 'button_level_50s', collectibles: ['corgi', 'crown', 'jewel']},
        { text: '60s', stateKey: null, spriteKey: 'button_level_60s', collectibles: ['corgi', 'crown', 'jewel']},
        { text: '70s', stateKey: null, spriteKey: 'button_level_70s', collectibles: ['.', '.', '.']},
        { text: '80s', stateKey: 'tutorial', spriteKey: 'button_level_80s', collectibles: ['corgi', 'crown', 'jewel']},
        { text: '90s', stateKey: null, spriteKey: 'button_level_90s', collectibles: ['.', '.', '.']},
        { text: '00s', stateKey: null, spriteKey: 'button_level_00s', collectibles: ['.', '.', '.']},
        { text: '10s', stateKey: 'decade_2010s', spriteKey: 'button_level_10s', collectibles: ['corgi', 'crown', 'jewel']}
    ],
    buttonsOriginX: 24,
    buttonsOriginY: 24,
    buttonsMargin: 30,
    buttonsPerRow: 3,
    buttonHeight: 48,
    buttonWidth: 48,
    collectibleSize: 10,

    create: function () {
        this.transitionning = false;
        this.createState();
        this.game.fadePlugin.fadeIn(0x000, 750, 0);
    },

    createState: function() {
        var bg = this.game.add.graphics(0, 0),
            scores = this.getCollectedItems(),
            col = 0,
            row = 0;

        bg.beginFill(0X000, 1);
        bg.drawRect(this.game.camera.x, this.game.camera.y, this.game.width * 1.5, this.game.height * 1.5);
        bg.endFill();
        
        this.buttonsGroup = this.game.add.group();
        this.levels.forEach(function(level) {
            var levelScore = scores[level.stateKey],
                collectibleId = 0,
                button,
                x,
                y;

            x = this.buttonsOriginX + row * (this.buttonWidth + this.buttonsMargin);
            y = this.buttonsOriginY + col * (this.buttonHeight + this.buttonsMargin);

            button = this.game.add.button(x, y, level.spriteKey, this.nextLevel, this);
            button.properties = level;

            level.collectibles.forEach(function(collectible) {
                var collx = x + collectibleId * 18,
                    colly = y + this.buttonHeight + 10,
                    collected = false,
                    color = 0X666666,
                    collBg,
                    scale;

                if (levelScore) {
                    levelScore.scoredItems.forEach(function(scoredItem) {
                        if(scoredItem.sprite_key === collectible) {
                            collected = true;
                        }
                    }.bind(this));
                }

                if (collectible ==='.') {
                    if (collected) {
                        color = 0Xffffff;
                    }

                    collBg = this.game.add.graphics(0, 0);

                    collBg.properties = {};
                    collBg.properties.collectibleName = collectible;

                    collBg.beginFill(color, 1);
                    collBg.drawRect(collx, colly, this.collectibleSize, this.collectibleSize);
                    collBg.endFill();

                } else {
                    if (!collected) { collectible += '_grey'; }

                    collBg = this.game.add.sprite(collx, colly, collectible);
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

    getCollectedItems: function() {
        var levelScores = {};

        this.levels.forEach(function (level) {
            levelScores[level.stateKey] = this.game.storage.get(level.stateKey);
        }.bind(this));

        return levelScores;
    },

    nextLevel: function (button) {
        if (!this.transitionning) {
            this.transitionning = true;
            this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
                this.game.state.start(button.properties.stateKey || 'tutorial');
            });
        }
    }
};
