/* global Game, LabelButton */
'use strict';

Game.State.Intro_AlexsHouse = function() {};
Game.State.Intro_AlexsHouse.prototype = new Game.State.BaseState();
Game.State.Intro_AlexsHouse.prototype.levelKey = 'alexs_house';
Game.State.Intro_AlexsHouse.prototype.nextLevelKey = 'navigation';

Game.State.Intro_AlexsHouse.prototype.create = function() {
    Game.State.BaseState.prototype.create.call(this, arguments);

    this.controls.addedButtons.forEach(function(button) {
        button.flashTween = this.game.add.tween(button.buttonSprite).to({alpha: 1}, 250, 'Linear', true, 0, -1, true);
        button.text = this.game.add.text(0, 0, button.label, { font: '20px silkscreennormal', fill: '#000' });
        button.text.fixedToCamera = true;
        button.text.cameraOffset.x = button.buttonSprite.cameraOffset.x + 18;
        button.text.cameraOffset.y = button.buttonSprite.cameraOffset.y + 80;
        this.controlHintsVisible = true;
    }.bind(this));
};

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

    if (Game.Score.getCurrentJewelScore() > 0) {
        var skipBtn = new LabelButton(this.game, 285, 420, null, '[SKIP]', this.skip, this, { font: '25px silkscreennormal', fill: '#f00' });
        skipBtn.anchor.set(0.5, 0.5);
    }
};

Game.State.Intro_AlexsHouse.prototype.skip = function() {
    this.game.state.start('navigation');
};

Game.State.Intro_AlexsHouse.prototype.updateState = function() {
    if (this.game.camera.x > 0 && this.controlHintsVisible) {
        this.controlHintsVisible = false;

        this.controls.addedButtons.forEach(function(button) {
            button.flashTween.stop();
            button.buttonSprite.alpha = 0.6;
            this.game.add.tween(button.text).to({ alpha: 0}, 500, 'Linear', true);
        }.bind(this));
    }
};
