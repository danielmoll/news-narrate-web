/* global Game */
'use strict';

Game.State.Decade_2010s = function() {};
Game.State.Decade_2010s.prototype = new Game.State.BaseState();
Game.State.Decade_2010s.prototype.levelKey = 'decade_2010s';
Game.State.Decade_2010s.prototype.nextLevelKey = 'navigation';

Game.State.Decade_2010s.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollisionBetween(834, 849);
    this.levelModule.tilemap.setCollisionBetween(861, 882);
};
