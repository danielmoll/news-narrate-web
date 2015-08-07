Game.Score = function(game) {
    this.game = game;
    this.score = 0;

    this.create();
};

Game.Score.prototype.create = function() {
    var scoreJewel = this.game.add.sprite(0, 0, 'jewel');
    this.scoreText = new Phaser.BitmapText(this.game, 33, 7, 'nokia', '0', 20);

    this.scoreGroup = this.game.add.group();
    this.scoreGroup.fixedToCamera = true;
    this.scoreGroup.add(scoreJewel);
    this.scoreGroup.add(this.scoreText);
};

Game.Score.prototype.increment = function (value) {
    this.score += value;
    this.scoreText.setText(this.score);
};

// Game.Score.prototype.update = function () {

// };