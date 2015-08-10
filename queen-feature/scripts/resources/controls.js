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

Game.Controls.prototype.update = function () {

    if (this.cursors.up.isDown) {
        this.jump();
    }

    if (this.cursors.left.isDown) {
        this.moveLeft();

    } else if (this.cursors.right.isDown) {
        this.moveRight();
        
    } else if (this.game.input.activePointer.isDown) {
        if (this.game.input.activePointer.x < this.game.width / 2) {
            this.moveLeft();

            if (this.game.input.activePointer.y < this.game.height / 2) {
                this.jump();
                this.jumped = true;
            }

        } else {
            this.moveRight();

            if (this.game.input.activePointer.y < this.game.height / 2) {
                this.jump();
                this.jumped = true;
            }
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