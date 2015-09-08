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
    this.levelModule.layers.push(this.levelModule.parallaxBackground);
};

Game.State.Decade_Now.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};
