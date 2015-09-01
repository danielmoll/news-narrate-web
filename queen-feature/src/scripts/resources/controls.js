/* global Game */
'use strict';

var PLAYER_SPEED = 200;

Game.Controls = function(game, player) {
    this.game = game;
    this.player = player;
    this.moving = false;
    this.lastDirection = 'right';
    this.playerStoppedFrames = {
        left: 3,
        right: 4
    };

    this.controlButtons = [
        {
            x: 0,
            y: 185,
            frame: 'button_left.png',
            cb: 'moveLeft'
        },
        {
            x: 94,
            y: 185,
            frame: 'button_right.png',
            cb: 'moveRight'
        },
        {
            x: 480,
            y: 185,
            frame: 'button_jump.png',
            cb: 'jump'
        }
    ];

    this.addedButtons = [];

    this.create();
};

Game.Controls.prototype.create = function() {
    this.cursors = this.game.input.keyboard.createCursorKeys();

    if (!window.detect.touch) return;

    this.controlButtons.forEach(function(ctrl){
        var btn = this.game.add.sprite(0, 0, 'assets');
        btn.alpha = 0.6;
        btn.fixedToCamera = true;
        btn.cameraOffset.x = ctrl.x;
        btn.cameraOffset.y = ctrl.y;
        btn.frameName = ctrl.frame;

        this.addedButtons.push({
            x1: ctrl.x,
            y1: ctrl.y,
            x2: ctrl.x + btn.width,
            y2: ctrl.y + btn.height,
            cb: this[ctrl.cb].bind(this)
        });

    }.bind(this));
};

Game.Controls.prototype.handleDown = function(e) {
    if (!this.moving) {
        if (e.x < this.game.width / 2) {
            this.moveLeft();
        }
        else {
            this.moveRight();
        }

        this.moving = true;
    }
    else {
        this.jump();
    }
};

Game.Controls.prototype.handleUp = function() {
    if (this.game.input.totalActivePointers === 0) {
        this.player.animations.stop();
        this.player.frame = this.playerStoppedFrames[this.lastDirection];
        this.player.body.velocity.x = 0;
        this.moving = false;
    }
    else {
        this.handleDown(this.game.input.activePointer);
    }
};

Game.Controls.prototype.moveLeft = function() {
    this.lastDirection = 'left';
    this.player.body.velocity.x = -PLAYER_SPEED;
    this.player.animations.play('left');
};

Game.Controls.prototype.moveRight = function() {
    this.lastDirection = 'right';
    this.player.body.velocity.x = PLAYER_SPEED;
    this.player.animations.play('right');
};

Game.Controls.prototype.jump = function () {
    if (this.player.body.onFloor()) {
        this.player.body.velocity.y = -300;
        this.game.sounds.jump.play();
    }
};

Game.Controls.prototype.actionPointerDown = function (pointer) {
    if (pointer.isDown) {
        this.addedButtons.forEach(function(button){
            if(pointer.x > button.x1 && pointer.x < button.x2 && pointer.y > button.y1 && pointer.y < button.y2 ) {
                button.cb();
            }
        }.bind(this));

        return 1;
    } else {
        return 0;
    }
};

Game.Controls.prototype.update = function () {
    var activePointers = 0;

    // Touch actions
    if (window.detect.touch) {
        activePointers += this.actionPointerDown(this.game.input.pointer1);
        activePointers += this.actionPointerDown(this.game.input.pointer2);
    }
    
    // Keyboard actions
    if (this.cursors.up.isDown) {
        this.jump();
    }

    if (this.cursors.left.isDown) {
        this.moveLeft();

    } else if (this.cursors.right.isDown) {
        this.moveRight();

    } else if (activePointers === 0) {
        this.player.body.velocity.x = 0;
        // this.jumped = false;
        this.activePointer = null;
    }

    if (this.player.body.velocity.x === 0) {
        this.player.animations.stop();
        this.player.frame = this.playerStoppedFrames[this.lastDirection];
    }

};
