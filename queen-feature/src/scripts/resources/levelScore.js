/* global Phaser, Game */
'use strict';

var SCORE_POSITION_Y = 0,
    SCORE_BACKGROUND_WIDTH = 180;

Game.LevelScore = function(game, levelKey, collectibles) {
    this.game = game;
    this.sprites = {};
    this.scoredItems = {}; // In current level
    this.score = 0;
    this.levelState = this.game.storage.get(levelKey); // In any previous session
    this.collectibles = collectibles;
    this.collectibleSize = 16;

    this.addDisplay();
};

Game.LevelScore.prototype.addDisplay = function() {

    var collx = 8,
        spriteName,
        collected,
        collectibleScoreItem,
        scale;

    this.scoreBackground = this.game.add.sprite(this.game.width - SCORE_BACKGROUND_WIDTH, SCORE_POSITION_Y, this._getBackground());
    this.scoreBackground.fixedToCamera = true;

    this.collectibles.forEach(function(collectible) {
        collected = false;
        if (collectible.properties.sprite_key !== 'jewel') {

            spriteName = collectible.properties.sprite_key;

            if (this.levelState && this.levelState.scoredItems && this.levelState.scoredItems[spriteName]) {
                collected = true;
            }

            if (!collected) {
                spriteName += '_grey';
            }

            collectibleScoreItem = this.game.add.sprite(collx + 8, 16, 'assets');
            collectibleScoreItem.frameName = spriteName + '.png';

            if (!collected) {
                collectibleScoreItem.alpha = 0.5;
            }
            scale = Math.min(this.collectibleSize / collectibleScoreItem.width, this.collectibleSize / collectibleScoreItem.height);
            collectibleScoreItem.scale.setTo(scale, scale);
            collectibleScoreItem.anchor.setTo(0.5, 0.5);

            this.sprites[collectible.properties.sprite_key] = collectibleScoreItem;

            collx += (collectibleScoreItem.width) + 8;

            this.scoreBackground.addChild(collectibleScoreItem);
        }
    }.bind(this));

    this.scoreJewel = this.game.add.sprite(collx, 0, 'assets');
    this.scoreJewel.frameName = 'jewel.png';
    this.scoreText = new Phaser.Text(this.game, collx + 60, 16, '0', { font: '24px silkscreennormal', } );
    this.scoreText.anchor.set(0.5, 0.5);
    this.scoreBackground.addChild(this.scoreText);
    this.scoreBackground.addChild(this.scoreJewel);
};

Game.LevelScore.prototype.scoreItem = function (scoredItem, levelKey) {
    var collectibleSprite,
        oldScale;

    if (scoredItem !== 'jewel') {
        // artefact collected
        this.game.analytics.itemCollected(scoredItem);
        collectibleSprite = this.sprites[scoredItem];
        if (collectibleSprite) {
            oldScale = {x: collectibleSprite.scale.x, y: collectibleSprite.scale.y };
            collectibleSprite.frameName = scoredItem + '.png';
            collectibleSprite.scale.set(2, 2);
            this.game.add.tween(collectibleSprite.scale).to(oldScale, 500, Phaser.Easing.Bounce.Out, true);
            collectibleSprite.bringToTop();
            collectibleSprite.alpha = 1;
        }

        Game.Score.artefactCollected(levelKey, scoredItem);
    }
    else {
        // jewel collection
        this.game.add.tween(this.scoreText.scale).to({x: 2, y: 2}, 1, 'Linear', true, 500)
            .chain(this.game.add.tween(this.scoreText.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Bounce.Out))
            .onComplete.add(function() {
                this.score++;
                this.scoreText.setText(this.score);

                // Update stored scores
                Game.Score.updateScore(levelKey, this.score);
            }.bind(this));
        this.game.sounds.jewel.play();
    }

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
