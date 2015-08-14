/* global Game */
'use strict';

Game.State.Decade_50s = function() {};
Game.State.Decade_50s.prototype = new Game.State.BaseState();
Game.State.Decade_50s.prototype.levelKey = 'decade_50s';
Game.State.Decade_50s.prototype.nextLevelKey = 'decade_2010s';

Game.State.Decade_50s.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(76);
};

Game.State.Decade_50s.prototype.createBackgroundLayers = function() {
    this.levelModule.createLayer('bg_colour');
    this.levelModule.createLayer('background');
};

Game.State.Decade_50s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};

Game.State.Decade_50s.prototype.updateState = function() {
    // Text group movement update.
    this.parallaxTextGroup.x = this.game.world.x * this.TEXT_PARALLAX_SCALE;
    this.parallaxTextGroup.y = this.game.world.y * this.TEXT_PARALLAX_SCALE;
};
