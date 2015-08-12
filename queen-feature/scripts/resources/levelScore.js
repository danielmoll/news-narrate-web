/* global Phaser, Game */
'use strict';

Game.LevelScore = function(game, levelKey, collectibles) {
    this.game = game;
    this.sprites = {};
    this.scoredItems = []; // In current level
    this.collectedItems = this.game.storage.get(levelKey); // In any previous session
    this.collectibles = collectibles;
    this.collectibleSize = 16;

    this.addDisplay();
};

Game.LevelScore.prototype.addDisplay = function() {

    var collx = this.game.width - 33,
        jewelAdded = false,
        spriteName,
        collected,
        collBg,
        scale;

    this.scoreGroup = this.game.add.group();
    this.scoreGroup.fixedToCamera = true;

    this.scoreText = new Phaser.BitmapText(this.game, collx, 7, 'nokia', '0', 20);
    this.scoreGroup.add(this.scoreText);

    this.collectibles.forEach(function(collectible) {
        if (collectible.properties.sprite_key === 'jewel') {
            if (!jewelAdded) {
                jewelAdded = true;
                collx -= 32;

                var scoreJewel = this.game.add.sprite(collx, 0, 'jewel');

                this.scoreGroup.add(scoreJewel);

                collx -= 20;
            }
        } else {
            spriteName = collectible.properties.sprite_key;
            
            this.collectedItems && this.collectedItems.scoredItems.forEach(function(scoredItem) {
                if(scoredItem.sprite_key === collectible.properties.sprite_key) {
                    collected = true;
                }
            });

            if (!collected) {
                spriteName += '_grey';
            }

            collBg = this.game.add.sprite(collx, 7, spriteName);
            scale = Math.min(this.collectibleSize / collBg.width, this.collectibleSize / collBg.height);
            collBg.scale.setTo(scale, scale);
            
            this.scoreGroup.add(collBg);
            this.sprites[collectible.properties.sprite_key] = collBg;

            collx -= (collBg.width * scale + 16);
        }
    }.bind(this));
};

Game.LevelScore.prototype.scoreItem = function (scoredItem, levelName) {
    this.game.analytics.sendEvent('Item ' + scoredItem.sprite_key + ' collected');

    var collectibleSprite = this.sprites[scoredItem.sprite_key];
    collectibleSprite && collectibleSprite.loadTexture(scoredItem.sprite_key);

    // Saving in current level score
    this.scoredItems.push(scoredItem);

    // Saving on local storage
    this.game.storage.set(levelName, {scoredItems: this.scoredItems});

    // Updating text display of points
    this.updatePoints(this.scoredItems);
};

Game.LevelScore.prototype.updatePoints = function (scoredItems) {
    var score = 0,
        value;

    scoredItems.forEach(function(item) {
        value = item.score;

        if (typeof(value) !== Number) {
            value = parseInt(value, 10);
        }
        
        score += value;
    });

    this.scoreText && this.scoreText.setText(score);
};