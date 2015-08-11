/* global Phaser, Game */
'use strict';

Game.Score = function(game, objects) {
    this.game = game;
    this.scoredItems = {};
    this.objects = objects;
};

Game.Score.prototype.addDisplay = function() {
    var scoreJewel = this.game.add.sprite(this.game.width - 65, 0, 'jewel');
    this.scoreText = new Phaser.BitmapText(this.game, this.game.width - 33, 7, 'nokia', '0', 20);

    this.scoreGroup = this.game.add.group();
    this.scoreGroup.fixedToCamera = true;
    this.scoreGroup.add(scoreJewel);
    this.scoreGroup.add(this.scoreText);
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