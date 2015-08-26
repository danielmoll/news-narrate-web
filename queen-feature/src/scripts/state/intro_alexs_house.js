/* global Phaser, Game */
'use strict';

Game.State.Intro_AlexsHouse = function() {
    this.forwardText = null;
    this.backwardText = null;
    this.jumpText = null;
};
Game.State.Intro_AlexsHouse.prototype = new Game.State.BaseState();
Game.State.Intro_AlexsHouse.prototype.levelKey = 'alexs_house';
Game.State.Intro_AlexsHouse.prototype.nextLevelKey = 'navigation';

Game.State.Intro_AlexsHouse.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(22);
};

Game.State.Intro_AlexsHouse.prototype.createBackgroundLayers = function() {
    this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_alexs_house");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    this.levelModule.createLayer('background');
};

Game.State.Intro_AlexsHouse.prototype.createForegroundLayers = function() {
    var gameWidth = this.game.width,
        gameHeight = this.game.height,
        color = '#000',
        size = 16;

    this.levelModule.createLayer('foreground');

    this.forwardText = this.game.add.text(0, 0, 'Press here to\nmove forward', { font: size + 'px silkscreennormal', align: 'center', fill: color} );
    this.forwardText.fixedToCamera = true;

    this.forwardText.cameraOffset.x = gameWidth - this.forwardText.width - 20;
    this.forwardText.cameraOffset.y = gameHeight - this.forwardText.height - 10;
};

Game.State.Intro_AlexsHouse.prototype.updateState = function() {
    var diff = this.game.width / 2 - Math.abs(this.world.x),
        alpha;

    diff = diff > 0  ? diff : 0;

    this.forwardText.alpha = diff / (this.game.width / 2);
};
