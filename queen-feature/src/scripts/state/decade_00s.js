/* global Game */
'use strict';

Game.State.Decade_00s = function() {};
Game.State.Decade_00s.prototype = new Game.State.BaseState();
Game.State.Decade_00s.prototype.levelKey = 'decade_00s';
Game.State.Decade_00s.prototype.nextLevelKey = 'decade_2010s';

Game.State.Decade_00s.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(34);
};

Game.State.Decade_00s.prototype.createBackgroundLayers = function() {
	this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_2000s");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    this.levelModule.createLayer('background');
    this.levelModule.layers.push(this.levelModule.parallaxBackground);
};

Game.State.Decade_00s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};
