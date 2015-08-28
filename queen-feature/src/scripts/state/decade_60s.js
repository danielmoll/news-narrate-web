/* global Game */
'use strict';

Game.State.Decade_60s = function() {};
Game.State.Decade_60s.prototype = new Game.State.BaseState();
Game.State.Decade_60s.prototype.levelKey = 'decade_60s';
Game.State.Decade_60s.prototype.nextLevelKey = 'decade_70s';

Game.State.Decade_60s.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(3);
};

Game.State.Decade_60s.prototype.createBackgroundLayers = function() {
	this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_1960s");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    this.levelModule.createLayer('background');
};

Game.State.Decade_60s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};

Game.State.Decade_60s.prototype.updateState = function() {
};

Game.State.Decade_60s.prototype.preload = function() {
    // 60s assets
    this.game.load.image('beatles', 'assets/sprites/60s_beatles.png');
    this.game.load.image('beatles_grey', 'assets/sprites/60s_beatles_grey.png');
    this.game.load.image('worldcup', 'assets/sprites/60s_worldcup.png');
    this.game.load.image('worldcup_grey', 'assets/sprites/60s_worldcup_grey.png');
    this.game.load.image('the_sun', 'assets/sprites/60s_the_sun.png');
    this.game.load.image('the_sun_grey', 'assets/sprites/60s_the_sun_grey.png');
    this.game.load.image('parallax_1960s', 'assets/tiles/parallax_1960s.png');
};
