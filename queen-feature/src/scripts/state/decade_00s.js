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
	this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_2000s");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    this.levelModule.createLayer('background');
};

Game.State.Decade_00s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};

Game.State.Decade_00s.prototype.preload = function() {
    // 2000s assets
    this.game.load.image('parallax_2000s', 'assets/tiles/parallax_2000s.png');
    this.game.load.image('ipod', 'assets/sprites/2000s_ipod.png');
    this.game.load.image('ipod_grey', 'assets/sprites/2000s_ipod_grey.png');
    this.game.load.image('idol', 'assets/sprites/2000s_pop_idol.png');
    this.game.load.image('idol_grey', 'assets/sprites/2000s_pop_idol_grey.png');
    this.game.load.image('dome', 'assets/sprites/2000s_dome.png');
    this.game.load.image('dome_grey', 'assets/sprites/2000s_dome_grey.png');
};
