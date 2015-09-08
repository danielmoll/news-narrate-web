/* global Game */
'use strict';

Game.State.Decade_90s = function() {};
Game.State.Decade_90s.prototype = new Game.State.BaseState();
Game.State.Decade_90s.prototype.levelKey = 'decade_90s';
Game.State.Decade_90s.prototype.nextLevelKey = 'decade_00s';

Game.State.Decade_90s.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(10);
};

Game.State.Decade_90s.prototype.createBackgroundLayers = function() {
    this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_1990s");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    this.levelModule.createLayer('white');
    this.levelModule.createLayer('background');
    this.levelModule.createLayer('background2');
    this.levelModule.layers.push(this.levelModule.parallaxBackground);    
};

Game.State.Decade_90s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
    this.levelModule.createLayer('foreground2');
    this.levelModule.createLayer('foreground3');
};
