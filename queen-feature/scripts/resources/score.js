/* global Phaser, Game */
'use strict';

Game.Score = function(game, collectibles) {
    this.game = game;
    this.scoredItems = {};
    this.collectibles = collectibles;
    this.collectibleSize = 16;

    this.addDisplay();
};

Game.Score.prototype.addDisplay = function() {

    this.scoreGroup = this.game.add.group();
    this.scoreGroup.fixedToCamera = true;

    var collx = this.game.width,
        collBg,
        scale;

    this.collectibles.forEach(function(collectible) {
        if (collectible.properties.sprite_key === 'jewel') {
            if (!this.scoreText) {
                collx -= 65
                var scoreJewel = this.game.add.sprite(collx, 0, 'jewel');
                this.scoreText = new Phaser.BitmapText(this.game, collx + 32, 7, 'nokia', '0', 20);

                this.scoreGroup.add(scoreJewel);
                this.scoreGroup.add(this.scoreText);

                collx -= 20;
            }
        } else {

            collBg = this.game.add.sprite(collx, 7, collectible.properties.sprite_key);
            scale = Math.min(this.collectibleSize / collBg.width, this.collectibleSize / collBg.height);
            collBg.scale.setTo(scale, scale);
            
            this.scoreGroup.add(collBg);

            collx -= (collBg.width * scale + 16);
        }
    }.bind(this));
};

Game.Score.prototype.scoreItem = function (scoredItem, levelName) {
    this.scoredItems[levelName] = this.scoredItems[levelName] || [];

    this.scoredItems[levelName].push(scoredItem);
    this.game.storage.set(levelName, {scoredItems: this.scoredItems[levelName]});

    this.updatePoints(levelName);
};

Game.Score.prototype.updatePoints = function (levelName) {
    var score = 0,
        value;

    this.scoredItems[levelName].forEach(function(item) {
        value = item.score;

        if (typeof(value) !== Number) {
            value = parseInt(value, 10);
        }
        
        score += value;
    });

    this.scoreText.setText(score);
};