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
    this.levelModule.createLayer('bg_colour');
    this.levelModule.createLayer('background');
};

Game.State.Decade_50s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};

