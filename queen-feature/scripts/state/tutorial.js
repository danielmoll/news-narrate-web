/* global Game */
'use strict';

Game.State.Tutorial = function() {};
Game.State.Tutorial.prototype = new Game.State.BaseState();
Game.State.Tutorial.prototype.levelKey = 'tutorial';
Game.State.Tutorial.prototype.nextLevelKey = 'decade_50s';

Game.State.Tutorial.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollisionBetween(76, 84);
};

Game.State.Tutorial.prototype.createForegroundLayers = function() {
    this.banisterLayer = this.levelModule.createLayer('banisters');
    this.columnLayer = this.levelModule.createLayer('columns');
};
