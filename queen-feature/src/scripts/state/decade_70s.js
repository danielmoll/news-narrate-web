/* global Game */
'use strict';

Game.State.Decade_70s = function() {};
Game.State.Decade_70s.prototype = new Game.State.BaseState();
Game.State.Decade_70s.prototype.levelKey = 'decade_70s';
Game.State.Decade_70s.prototype.nextLevelKey = 'decade_80s';

Game.State.Decade_70s.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(2);
};

Game.State.Decade_70s.prototype.createBackgroundLayers = function() {
    this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_1970s");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    this.levelModule.createLayer('background');
};

Game.State.Decade_70s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};

Game.State.Decade_70s.prototype.preload = function() {
    // 70s assets
    this.game.load.image('parallax_1970s', 'assets/tiles/parallax_1970s.png');
    this.game.load.image('sex_pistols', 'assets/sprites/70s_sex_pistols.png');
    this.game.load.image('sex_pistols_grey', 'assets/sprites/70s_sex_pistols_grey.png');
    this.game.load.image('maggie', 'assets/sprites/70s_maggie.png');
    this.game.load.image('maggie_grey', 'assets/sprites/70s_maggie_grey.png');
    this.game.load.image('starwars', 'assets/sprites/70s_starwars.png');
    this.game.load.image('starwars_grey', 'assets/sprites/70s_starwars_grey.png');
};
