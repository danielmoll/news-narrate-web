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
    this.create();
};

Game.Controls.prototype.create = function() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    // this.game.input.onDown.add(this.handleDown, this);
    // this.game.input.onUp.add(this.handleUp, this);
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

Game.Controls.prototype.handleUp = function(e) {
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

Game.Controls.prototype.moveLeft = function(speed) {
    this.lastDirection = 'left';
    this.player.body.velocity.x = -PLAYER_SPEED;
    this.player.animations.play('left');
};

Game.Controls.prototype.moveRight = function(speed) {
    this.lastDirection = 'right';
    this.player.body.velocity.x = PLAYER_SPEED;
    this.player.animations.play('right');
};

Game.Controls.prototype.jump = function () {
    if (this.player.body.onFloor()) {
        this.player.body.velocity.y = -300;
    }
};

Game.Controls.prototype.update = function () {
    var activePointers = 0;

    if (this.game.input.pointer1.isDown) {
        activePointers ++;
    }

    if (this.game.input.pointer2.isDown) {
        activePointers ++;
    }

    if (this.cursors.up.isDown || activePointers > 1) {
        this.jump();
    }

    if (activePointers === 1) {
        this.activePointer = (this.game.input.pointer1.isDown) ? this.game.input.pointer1 : this.game.input.pointer2;
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


    if (this.activePointer) {
        if (this.activePointer.x < this.game.width / 2) {
            this.moveLeft();

        } else if (this.activePointer.x > this.game.width / 2) {
            this.moveRight();
        }
    } 

   

    if (this.player.body.velocity.x === 0) {
        this.player.animations.stop();
        this.player.frame = this.playerStoppedFrames[this.lastDirection];
    }

    // this.game.debug.inputInfo(32, 32);
    // this.game.debug.pointer( this.game.input.pointer2 );
    // this.game.debug.pointer( this.game.input.pointer1 );
    // this.game.debug.text(this.game.input.pointer1.isDown, 0, 20 );
    // this.game.debug.text(this.game.input.pointer2.isDown, 0, 30 );
    // this.game.debug.text(activePointers, 0, 40 );



};
