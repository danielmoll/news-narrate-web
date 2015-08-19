/* global Phaser, Game */
'use strict';

var SCORE_POSITION_Y = 0,
    SCORE_BACKGROUND_WIDTH = 150;

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

    var collx = 8,
        jewelAdded = false,
        spriteName,
        collected,
        collBg,
        scale;

    this.scoreBg = this.game.add.sprite(this.game.width - SCORE_BACKGROUND_WIDTH, SCORE_POSITION_Y, this._getBackground());
    this.scoreBg.fixedToCamera = true;

    this.collectibles.forEach(function(collectible) {
        if (collectible.properties.sprite_key !== 'jewel') {
         
            spriteName = collectible.properties.sprite_key;
            
            this.collectedItems && this.collectedItems.scoredItems.forEach(function(scoredItem) {
                if(scoredItem.sprite_key === collectible.properties.sprite_key) {
                    collected = true;
                }
            });

            if (!collected) {
                spriteName += '_grey';
            }

            collBg = this.game.add.sprite(collx, 16, spriteName);
            scale = Math.min(this.collectibleSize / collBg.width, this.collectibleSize / collBg.height);
            collBg.scale.setTo(scale, scale);
            collBg.anchor.setTo(0, 0.5);

            this.sprites[collectible.properties.sprite_key] = collBg;

            collx += (collBg.width) + 8;

            this.scoreBg.addChild(collBg);
        }
    }.bind(this));

    this.scoreJewel = this.game.add.sprite(collx, 0, 'jewel');
    this.scoreText = new Phaser.Text(this.game, collx + 32, 0, '0', { font: '24px silkscreennormal', } );
    this.scoreBg.addChild(this.scoreText);
    this.scoreBg.addChild(this.scoreJewel);
};

Game.LevelScore.prototype.scoreItem = function (scoredItem, levelKey) {
    this.game.analytics.itemCollected(scoredItem.sprite_key);

    var collectibleSprite = this.sprites[scoredItem.sprite_key];

    collectibleSprite && collectibleSprite.loadTexture(scoredItem.sprite_key);

    // Saving in current level score
    this.scoredItems.push(scoredItem);

    // Update overall game score.
    Game.Score.levelScores[levelKey] = {scoredItems: this.scoredItems};
    if (scoredItem.sprite_key !== 'jewel' && Game.Score.nbCollected < Game.Score.nbCollectibles) {
        Game.Score.nbCollected++;
    }

    // Saving on local storage
    this.game.storage.set(levelKey, {scoredItems: this.scoredItems});

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

Game.LevelScore.prototype._getBackground = function() {
    var height = 32,
        bmd = this.game.add.bitmapData(SCORE_BACKGROUND_WIDTH, height);
     
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, SCORE_BACKGROUND_WIDTH, height);
    bmd.ctx.fillStyle = 'rgba(255,255,255, 0.7)';

    bmd.ctx.fill();

    return bmd;
};