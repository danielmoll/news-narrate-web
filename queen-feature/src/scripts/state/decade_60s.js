/* global Game */
'use strict';

Game.State.Decade_60s = function() {};
Game.State.Decade_60s.prototype = new Game.State.BaseState();
Game.State.Decade_60s.prototype.levelKey = 'decade_60s';
Game.State.Decade_60s.prototype.nextLevelKey = 'decade_2010s';

Game.State.Decade_60s.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(3);
};

Game.State.Decade_60s.prototype.createBackgroundLayers = function() {
    this.levelModule.createLayer('bg_colour');
    this.levelModule.createLayer('background');
};

Game.State.Decade_60s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};

Game.State.Decade_60s.prototype.updateState = function() {
    // Text group movement update.
    this.parallaxTextGroup.x = this.game.world.x * this.TEXT_PARALLAX_SCALE;
    this.parallaxTextGroup.y = this.game.world.y * this.TEXT_PARALLAX_SCALE;
};