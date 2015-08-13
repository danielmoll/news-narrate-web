/* global Game */
'use strict';

Game.Controls = function(game, player) {
    this.game = game;
    this.player = player;

    this.create();
};

Game.Controls.prototype.create = function() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
};

Game.Controls.prototype.moveLeft = function(speed) {
    this.player.body.velocity.x = (-speed || -100) * 3.5;
    this.player.animations.play('left');
};

Game.Controls.prototype.moveRight = function(speed) {
    this.player.body.velocity.x = (-speed || 100) * 3.5;
    this.player.animations.play('right');
};

Game.Controls.prototype.jump = function () {
    if (this.player.body.onFloor()) {
        this.player.body.velocity.y = -300;
    }
};

Game.Controls.prototype.activePointerIsOnPauseButton = function() {
  var pauseButton = {x1: 10, y1: 10, x2: 42, y2: 42};
  var x = this.game.input.activePointer.x;
  var y = this.game.input.activePointer.y;

  if ( x > pauseButton.x1 && x < pauseButton.x2 &&
      y > pauseButton.y1 && x < pauseButton.y2) {
    return true;
  }
  return false;
}

Game.Controls.prototype.update = function () {

    if (this.cursors.up.isDown || this.game.input.totalActivePointers > 1) {
        this.jump();
    }

    if (this.cursors.left.isDown) {
        this.moveLeft();

    } else if (this.cursors.right.isDown) {
        this.moveRight();

    } else if (this.game.input.activePointer.isDown) {
        if (this.activePointerIsOnPauseButton()) {
          return;
        }

        if (this.game.input.activePointer.x < this.game.width / 2) {
            this.moveLeft();

            // if (this.game.input.activePointer.y < this.game.height / 2) {
            //     this.jump();
            //     this.jumped = true;
            // }

        } else {
            this.moveRight();

            // if (this.game.input.activePointer.y < this.game.height / 2) {
            //     this.jump();
            //     this.jumped = true;
            // }
        }

    } else if (this.game.input.activePointer.isUp) {
        this.player.body.velocity.x = 0;
        this.jumped = false;
    }

    if (this.player.body.velocity.x === 0) {
        this.player.animations.stop();
        this.player.frame = 2;
    }
};
