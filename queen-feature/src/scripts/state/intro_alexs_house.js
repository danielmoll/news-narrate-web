/* global Game, LabelButton */
'use strict';

Game.State.Intro_AlexsHouse = function() {};
Game.State.Intro_AlexsHouse.prototype = new Game.State.BaseState();
Game.State.Intro_AlexsHouse.prototype.levelKey = 'alexs_house';
Game.State.Intro_AlexsHouse.prototype.nextLevelKey = 'navigation';

Game.State.Intro_AlexsHouse.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(22);
};

Game.State.Intro_AlexsHouse.prototype.createBackgroundLayers = function() {
    this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_alexs_house");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    this.levelModule.createLayer('background');
};

Game.State.Intro_AlexsHouse.prototype.createForegroundLayers = function() {
    this.levelModule.createLayer('foreground');

    var skipBtn = new LabelButton(this.game, 285, 420, null, '[SKIP]', this.skip, this, { font: '25px silkscreennormal', fill: '#f00' });
    skipBtn.anchor.set(0.5, 0.5);
};

Game.State.Intro_AlexsHouse.prototype.skip = function() {
    this.game.state.start('navigation');
};