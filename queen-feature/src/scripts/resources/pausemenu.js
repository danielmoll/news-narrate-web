/* global Phaser, Game */
'use strict';

Game.PauseMenu = function(game) {
    this.game = game;

    this.buttonDefinitions = [
        {
            sprite: 'time_machine_button',
            x: 40,
            y: 80,
            callback: 'backToNavigation'
        },
        {
            sprite: 'resume_button',
            x: 40,
            y: 120,
            callback: 'resume'
        }
    ];

    this.buttons = [];

    this.addPauseButton();
    this.drawMenu();

    this.game.input.onDown.add(this.handleInput, this);
};

Game.PauseMenu.prototype.addPauseButton = function() {
    this.pauseButton = this.game.add.button(10, 10, 'pause', this.showPauseMenu, this);
    this.pauseButton.fixedToCamera = true;
};

Game.PauseMenu.prototype.drawMenu = function() {
    var pauseText,
        btn,
        bg;

    this.menuGroup = this.game.add.group();
    this.menuGroup.visible = false;
 
    bg = this.game.add.graphics(0, 0);
    bg.fixedToCamera = true;
    bg.beginFill(0X000, 0.8);
    bg.drawRect(this.game.camera.x, this.game.camera.y, this.game.width, this.game.height);
    bg.endFill();

    this.menuGroup.add(bg);

    pauseText = new Phaser.Text(this.game, 240, 40, "Paused", {font: 'helvetica', fontSize: 18, fill: '#ffffff'});
    pauseText.fixedToCamera = true;
    this.menuGroup.add(pauseText);

    this.buttonDefinitions.forEach(function(button) {
        btn = new Phaser.Image(this.game, button.x, button.y, button.sprite)
        btn.fixedToCamera = true;
        this.menuGroup.add(btn);

        this.buttons.push({
            x1: btn.x,
            y1: btn.y,
            x2: btn.x + btn.width,
            y2: btn.y + btn.height,
            callback: button.callback
        });

    }.bind(this));

};

Game.PauseMenu.prototype.handleInput = function(event) {
    if (!this.game.paused) {
        return;
    }

    this.buttons.forEach(function(button) {
        if(event.x > button.x1 && event.x < button.x2 && event.y > button.y1 && event.y < button.y2 ){
            button.callback && this[button.callback]();
        }
    }.bind(this));
};

Game.PauseMenu.prototype.backToNavigation = function() {
    this.game.paused = false;

    this.game.state.start('navigation');
};

Game.PauseMenu.prototype.resume = function() {
    this.game.paused = false;

    this.pauseButton.visible = true;
    this.menuGroup.visible = false;
};

Game.PauseMenu.prototype.showPauseMenu = function() {
    this.game.paused = true;
    this.pauseButton.visible = false;
    this.menuGroup.visible = true;
};
