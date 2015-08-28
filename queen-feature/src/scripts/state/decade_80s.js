/* global Game */
'use strict';

Game.State.Decade_80s = function() {};
Game.State.Decade_80s.prototype = new Game.State.BaseState();
Game.State.Decade_80s.prototype.levelKey = 'decade_80s';
Game.State.Decade_80s.prototype.nextLevelKey = 'decade_90s';

Game.State.Decade_80s.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(26);
};

Game.State.Decade_80s.prototype.createBackgroundLayers = function() {
    this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_1980s");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    // this.levelModule.createLayer('bg_colour');
    this.levelModule.createLayer('background_shizzle');
    this.levelModule.createLayer('background');
};

Game.State.Decade_80s.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');
};

Game.State.Decade_80s.prototype.updateState = function() {
};

Game.State.Decade_80s.prototype.preload = function() {
    // 80s assets
    this.game.load.image('parallax_1980s', 'assets/tiles/parallax_1980s.png');
    this.game.load.image('live_aid', 'assets/sprites/80s_live_aid.png');
    this.game.load.image('live_aid_grey', 'assets/sprites/80s_live_aid_grey.png');
    this.game.load.image('charles_diana', 'assets/sprites/80s_charles_diana.png');
    this.game.load.image('charles_diana_grey', 'assets/sprites/80s_charles_diana_grey.png');
    this.game.load.image('mobile_phone', 'assets/sprites/80s_mobile_phone.png');
    this.game.load.image('mobile_phone_grey', 'assets/sprites/80s_mobile_phone_grey.png');
};
