/* global Game */
'use strict';

Game.PauseMenu = function(game) {
    this.game = game;
    this.buttons = [];
    this.resumeButton = null;
    this.nextLevelButton = null;

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
            callback: 'resume',
        },
        {
            sprite: 'next_level_button',
            x: 40,
            y: 120,
            callback: 'nextLevel'
        },
        {
            sprite: 'restart_level_button',
            x: 40,
            y: 160,
            callback: 'restartLevel'
        },
        {
            sprite: 'share_on_facebook',
            x: 40,
            y: 200,
            callback: 'shareOnFacebook'
        },
        {
            sprite: 'share_on_twitter',
            x: 40,
            y: 240,
            callback: 'shareOnTwitter'
        }
    ];

    this.pauseButtonDefinitions = [
    ];

    this.addPauseButton();

    this.drawMenu();
    this.game.input.onDown.add(this.handleInput, this);
};

Game.PauseMenu.prototype.addPauseButton = function() {
    this.pauseButton = this.game.add.button(10, 10, 'pause', function(){ this.showMenu(true); }.bind(this), this);
    this.pauseButton.fixedToCamera = true;
};

Game.PauseMenu.prototype.drawMenu = function() {
    var // pauseText,
        btn,
        bg;

    // Resetting buttons locations.
    this.buttons = [];

    // Drawing the base menu elements
    this.menuGroup = this.game.add.group();
    this.menuGroup.visible = false;

    bg = this.game.add.graphics(0, 0);
    bg.fixedToCamera = true;
    bg.beginFill(0X000, 0.8);
    bg.drawRect(this.game.camera.x, this.game.camera.y, this.game.width, this.game.height);
    bg.endFill();

    this.menuGroup.add(bg);

    // if (pause) {
    //     pauseText = new Phaser.Text(this.game, 240, 40, "Paused", {font: 'helvetica', fontSize: 18, fill: '#ffffff'});
    //     pauseText.fixedToCamera = true;
    //     this.menuGroup.add(pauseText);
    // }

    this.buttonDefinitions.forEach(function(button) {
        btn = this.game.add.image(button.x, button.y, button.sprite);
        btn.fixedToCamera = true;
        this.menuGroup.add(btn);

        this.buttons.push({
            x1: btn.x,
            y1: btn.y,
            x2: btn.x + btn.width,
            y2: btn.y + btn.height,
            callback: button.callback,
            sprite: button.sprite
        });
        
        if (button.sprite === 'resume_button') {
            this.resumeButton = btn;
        }

        if (button.sprite === 'next_level_button') {
            this.nextLevelButton = btn;
        }

    }.bind(this));

};

Game.PauseMenu.prototype.handleInput = function(event) {
    if (!this.game.paused) {
        return;
    }

    var callback;

    this.buttons.forEach(function(button) {
        if (!callback) {
            if(event.x > button.x1 && event.x < button.x2 && event.y > button.y1 && event.y < button.y2 ) {
                
                if (button.sprite === 'resume_button' && this.resumeButton.visible === true) {
                    callback = button.callback;

                } else if (button.sprite === 'next_level_button' && this.nextLevelButton.visible === true) {
                    callback = button.callback;

                } else if (button.sprite !== 'resume_button' && button.sprite !== 'next_level_button') {
                    callback = button.callback;
                }
            }
        }
    }.bind(this));

    callback && this[callback]();
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

Game.PauseMenu.prototype.restartLevel = function() {
    this.game.paused = false;

    this.game.state.start(this.game.state.current);
};

Game.PauseMenu.prototype.showMenu = function(state) {
    this.game.paused = true;
    
    if (state === 'next_level') {
        // this.nextLevelCallback = nextLevelCallback;
        this.resumeButton.visible = false;
        this.nextLevelButton.visible = true;
    } else {
        this.resumeButton.visible = true;
        this.nextLevelButton.visible = false;
    }

    this.pauseButton.visible = false;
    this.menuGroup.visible = true;
};

Game.PauseMenu.prototype.shareOnFacebook = function() {
    console.log('shared on Facebook');
};

Game.PauseMenu.prototype.shareOnTwitter = function() {
    console.log('shared on Twitter');
};

Game.PauseMenu.prototype.nextLevel = function () {
    this.game.paused = false;

    var nextLevel = this.game.state.states[this.game.state.current].nextLevelKey;

    if(Game.Score.allCollected()) {
        nextLevel = 'end_screen';
    }

    this.game.analytics.stateComplete(this.game.state.current);
    this.game.state.start(nextLevel);
};
