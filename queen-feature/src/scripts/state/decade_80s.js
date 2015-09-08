/* global Game */
'use strict';

Game.State.Decade_80s = function() {};
Game.State.Decade_80s.prototype = new Game.State.BaseState();
Game.State.Decade_80s.prototype.levelKey = 'decade_80s';
Game.State.Decade_80s.prototype.nextLevelKey = 'decade_90s';

Game.State.Decade_80s.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(26);
};

Game.State.Decade_80s.prototype.createBackgroundLayers = function() {
    this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_1980s");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    // this.levelModule.createLayer('bg_colour');
    this.levelModule.createLayer('background_shizzle');
    this.levelModule.createLayer('background');
    this.levelModule.layers.push(this.levelModule.parallaxBackground);
};

Game.State.Decade_80s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};

Game.State.Decade_80s.prototype.updateState = function() {
};
