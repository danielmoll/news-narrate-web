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
    this.levelModule.createLayer('background');
};

Game.State.Decade_00s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};