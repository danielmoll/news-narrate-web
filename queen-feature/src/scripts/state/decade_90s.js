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
};

Game.State.Decade_90s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
    this.levelModule.createLayer('foreground2');
    this.levelModule.createLayer('foreground3');
};

Game.State.Decade_90s.prototype.preload = function() {
    // 90s assets
    this.game.load.image('parallax_1990s', 'assets/tiles/parallax_1990s.png');
    this.game.load.image('web', 'assets/sprites/90s_web.png');
    this.game.load.image('web_grey', 'assets/sprites/90s_web_grey.png');
    this.game.load.image('spice', 'assets/sprites/90s_spice.png');
    this.game.load.image('spice_grey', 'assets/sprites/90s_spice_grey.png');
    this.game.load.image('harry', 'assets/sprites/90s_harry.png');
    this.game.load.image('harry_grey', 'assets/sprites/90s_harry_grey.png');
};
