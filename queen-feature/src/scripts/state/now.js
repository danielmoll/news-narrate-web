/* global Game */
'use strict';

Game.State.Now = function() {};
Game.State.Now.prototype = new Game.State.BaseState();
Game.State.Now.prototype.levelKey = 'now';
Game.State.Now.prototype.nextLevelKey = 'decade_50s';

Game.State.Now.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(130);
};

Game.State.Now.prototype.createBackgroundLayers = function() {
	this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_1950s");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    this.levelModule.createLayer('background');
};

Game.State.Now.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};
