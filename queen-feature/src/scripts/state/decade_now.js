/* global Game */
'use strict';

Game.State.Decade_Now = function() {};
Game.State.Decade_Now.prototype = new Game.State.BaseState();
Game.State.Decade_Now.prototype.levelKey = 'decade_now';
Game.State.Decade_Now.prototype.nextLevelKey = 'decade_50s';

Game.State.Decade_Now.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(130);
};

Game.State.Decade_Now.prototype.createBackgroundLayers = function() {
	this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_now");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    this.levelModule.createLayer('background');
};

Game.State.Decade_Now.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};

Game.State.Decade_Now.prototype.preload = function() {
    // 2010s assets
    this.game.load.image('parallax_now', 'assets/tiles/parallax_now.png');
    this.game.load.image('olympics', 'assets/sprites/2010s_olympics.png');
    this.game.load.image('olympics_grey', 'assets/sprites/2010s_olympics_grey.png');
    this.game.load.image('selfie', 'assets/sprites/2010s_selfie.png');
    this.game.load.image('selfie_grey', 'assets/sprites/2010s_selfie_grey.png');
    this.game.load.image('1d', 'assets/sprites/2010s_1d.png');
    this.game.load.image('1d_grey', 'assets/sprites/2010s_1d_grey.png');
};
