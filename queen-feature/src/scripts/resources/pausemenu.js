/* global Game */
'use strict';

Game.PauseMenu = function(game) {
    this.game = game;
    this.buttons = [];
    this.resumeButton = null;
    this.nextLevelButton = null;

    this.buttonDefinitions = [
        {
            id: 'time_machine_button',
            sourceName: 'Back_button.png',
            label: 'Back to time machine',
            x: 40,
            y: 40,
            callback: 'backToNavigation'
        },
        {
            id: 'resume_button',
            sourceName: 'Play_button.png',
            label: 'Resume',
            x: 40,
            y: 90,
            callback: 'resume',
        },
        {
            id: 'next_level_button',
            sourceName: 'Play_button.png',
            label: 'Next level',
            x: 40,
            y: 90,
            callback: 'nextLevel'
        },
        {
            id: 'restart_level_button',
            sourceName: 'Restart_button.png',
            label: 'Restart level',
            x: 40,
            y: 140,
            callback: 'restartLevel'
        },
        {
            id: 'share_on_facebook',
            sourceName: 'FB_Button.png',
            label: 'Share on Facebook',
            x: 40,
            y: 190,
            callback: 'shareOnFacebook'
        },
        {
            id: 'share_on_twitter',
            sourceName: 'Twitter_button.png',
            label: 'Share on Twitter',
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
    this.pauseButton = this.game.add.button(10, 10, 'assets', function(){ this.showMenu(); }.bind(this), this);
    this.pauseButton.frameName = 'pause.png';
    this.pauseButton.fixedToCamera = true;
};

Game.PauseMenu.prototype.drawMenu = function() {
    var label,
        aleks,
        btn,
        bg;

    // Resetting buttons locations.
    this.buttons = [];

    // Drawing the base menu elements
    this.menuGroup = this.game.add.group();
    this.menuGroup.visible = false;
    this.menuGroup.fixedToCamera = true;

    bg = this.game.add.graphics(0, 0);
    bg.beginFill(0X000, 0.8);
    bg.drawRect(this.game.camera.x, this.game.camera.y, this.game.width, this.game.height);
    bg.endFill();

    this.menuGroup.add(bg);

    aleks = this.game.add.sprite(380, 80, 'assets');
    aleks.frameName = 'alex_pause.png';
    this.menuGroup.add(aleks);

    this.buttonDefinitions.forEach(function(button) {
        btn = this.game.add.sprite(button.x, button.y, 'assets');
        btn.frameName = button.sourceName;

        label = this.game.add.text(55, 10, button.label, { font: '16px silkscreennormal', align: 'left', fill: '#fff569'} );

        btn.addChild(label);

        this.menuGroup.add(btn);

        this.buttons.push({
            x1: btn.x,
            y1: btn.y,
            x2: btn.x + btn.width,
            y2: btn.y + btn.height,
            callback: button.callback,
            id: button.id
        });

        if (button.id === 'resume_button') {
            this.resumeButton = btn;
        }

        if (button.id === 'next_level_button') {
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

                if (button.id === 'resume_button' && this.resumeButton.visible === true) {
                    callback = button.callback;

                } else if (button.id === 'next_level_button' && this.nextLevelButton.visible === true) {
                    callback = button.callback;

                } else if (button.id !== 'resume_button' && button.id !== 'next_level_button') {
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
    this.game.sounds.bgmusic.stop();

    this.game.state.start(this.game.state.current);
};

Game.PauseMenu.prototype.showMenu = function(state) {
    this.game.paused = true;
    if (state === 'next_level') {
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
    this.share('facebook');
};

Game.PauseMenu.prototype.shareOnTwitter = function() {
    this.share('twitter');
};

Game.PauseMenu.prototype.nextLevel = function () {
    this.game.paused = false;

    var nextLevel = this.game.state.states[this.game.state.current].nextLevelKey;

    this.game.analytics.stateComplete(this.game.state.current);
    this.game.state.start(nextLevel);
};

Game.PauseMenu.prototype.share = function (network) {
    var sharerUrl;

    if (network === 'facebook') {
        sharerUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location);
    } else if (network === 'twitter') {
        sharerUrl = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(window.location) + ";text=Play the Reign Game.";
    }

    window.open(sharerUrl, '_blank');

    this.game.analytics.share(network, sharerUrl);
};
