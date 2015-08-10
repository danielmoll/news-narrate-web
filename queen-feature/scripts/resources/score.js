Game.Score = function(game) {
    this.game = game;
    this.scores = {};
};

Game.Score.prototype.addDisplay = function() {
    var scoreJewel = this.game.add.sprite(this.game.width - 65, 0, 'jewel');
    this.scoreText = new Phaser.BitmapText(this.game, this.game.width - 33, 7, 'nokia', '0', 20);

    this.scoreGroup = this.game.add.group();
    this.scoreGroup.fixedToCamera = true;
    this.scoreGroup.add(scoreJewel);
    this.scoreGroup.add(this.scoreText);
};

Game.Score.prototype.increment = function (value, levelName) {
    this.scores[levelName] = this.scores[levelName] || 0;

    if (typeof(value) !== Number) {
        value = parseInt(value, 10);
    }

    this.scores[levelName] += value;
    this.scoreText.setText(this.scores[levelName]);

    this.game.storage.set(levelName, {score: this.scores[levelName]});
};