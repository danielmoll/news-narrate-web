Game.Controls = function(game, player) {
    this.game = game;
    this.player = player;

    this.create();
};

Game.Controls.prototype.create = function() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
    this.game.touchControl.inputEnable();
    
    this.jumpButton = this.game.add.button(this.game.camera.width -120,  this.game.camera.height - 120, 'touch', this.jump, this);
    this.jumpButton.fixedToCamera = true;
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
    if (this.player.body.onFloor() && !this.jumped) {
        this.player.body.velocity.y = -300;
        this.jumped = true;
    }
};

Game.Controls.prototype.update = function () {
    if (this.player.body.onFloor()) {
        this.jumped = false;
    }

    if (this.cursors.up.isDown) {
        if (this.player.body.onFloor()) {
            this.jump();
        }
    }

    if (this.cursors.left.isDown) {
        this.moveLeft();

    } else if (this.cursors.right.isDown) {
        this.moveRight();
        
    } else if (this.game.touchControl.cursors.left) {
        this.moveLeft(this.game.touchControl.speed.x);

    } else if (this.game.touchControl.cursors.right) {
        this.moveRight(this.game.touchControl.speed.x);

    } else {
        this.player.body.velocity.x = 0;
        this.jumped = false;
    }

    if (this.player.body.velocity.x === 0) {
        this.player.animations.stop();
        this.player.frame = 2;
    }
};