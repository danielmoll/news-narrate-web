/* global Game */
'use strict';

Game.State.Decade_50s = function() {};
Game.State.Decade_50s.prototype = new Game.State.BaseState();
Game.State.Decade_50s.prototype.levelKey = 'decade_50s';
Game.State.Decade_50s.prototype.nextLevelKey = 'decade_60s';

Game.State.Decade_50s.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(76);
};

Game.State.Decade_50s.prototype.createBackgroundLayers = function() {
	this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_1950s");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    this.levelModule.createLayer('background');
};

Game.State.Decade_50s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};

Game.State.Decade_50s.prototype.preload = function() {
    // 50s assets
    this.game.load.image('tv', 'assets/sprites/50s_tv.png');
    this.game.load.image('tv_grey', 'assets/sprites/50s_tv_grey.png');
    this.game.load.image('record', 'assets/sprites/50s_record.png');
    this.game.load.image('record_grey', 'assets/sprites/50s_record_grey.png');
    this.game.load.image('mini', 'assets/sprites/50s_mini.png');
    this.game.load.image('mini_grey', 'assets/sprites/50s_mini_grey.png');
    this.game.load.image('parallax_1950s', 'assets/tiles/parallax_1950s.png');
};
