/* global Game */
'use strict';

Game.State.Tutorial = function() {};
Game.State.Tutorial.prototype = Game.State.BaseState.prototype;
Game.State.Tutorial.prototype.levelKey = 'tutorial';
Game.State.Tutorial.prototype.nextLevelKey = 'decade_50s';

Game.State.Tutorial.prototype.createState = function() {
    this.mapBackground.tilemap.setCollisionBetween(76, 84);
    this.banisterLayer = this.mapBackground.createLayer('banisters');
    this.columnLayer = this.mapBackground.createLayer('columns');
};
