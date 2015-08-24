/* global Game */
'use strict';

Game.State.Decade_70s = function() {};
Game.State.Decade_70s.prototype = new Game.State.BaseState();
Game.State.Decade_70s.prototype.levelKey = 'decade_70s';
Game.State.Decade_70s.prototype.nextLevelKey = 'decade_80s';

Game.State.Decade_70s.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(2);
};

Game.State.Decade_70s.prototype.createBackgroundLayers = function() {
    this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_1970s");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    this.levelModule.createLayer('background');
};

Game.State.Decade_70s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};

