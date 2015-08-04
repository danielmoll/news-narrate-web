/**
 * Created by knash on 15-03-12.
 */

Game.State.Game = function(game) {};
Game.State.Game.prototype = {
    cursors: null,
    map: null,
    layer: null,
    textOverlays: [
        { text: '1953', size: 200, x: 50, y: 230 },
        { text: 'February 1952 George VI dies aged 56. \nHis daughter, Princess Elizabeth, is proclaimed\nQueen of the United Kingdom.', size: 20, x: 50, y: 380}
    ],
    TEXT_PARALLAX_SCALE: 1.2,

    create: function() {

        // Load the current over world map
        this.mapBackground = new Game.Map.Module(this.game, 'main');
        
        this.modules = {};
        
        // We manually add the over world background for now...
        this.background = this.mapBackground.createLayer('background');
        // this.background.debug = true;

        // Resize the game world to match the layer dimensions
        this.background.resizeWorld();

        // Place the subMaps
        this.subMaps = {};
        var subMapLocations = this.mapBackground.findObjectsByType('sub_map');
        var location, tileX, tileY;
        for (var i = 0; i < subMapLocations.length; i++) {
            location = subMapLocations[i];
            tileX = location.x / 32;
            tileY = location.y / 32;
            this.subMaps[location.name] = new RPG.Map.SubMap(
                this.modules[location.properties.sub_map], tileX, tileY);
        }
        // this.subMaps['home0'].setIndoorAlpha(0);

        // Collision map!
        this.collisions = this.game.add.group();
        this.inCollisionObjects = this.mapBackground.getCollisionSprites(
            'collision', this.collisions, 1, 13);

        this.mapBackground.tilemap.setCollisionBetween(76, 84);
        // console.log(this.background.tileX);

        var spawn = this.mapBackground.findObjectsByType('player_spawn');
        this.player = this.game.add.sprite(spawn[0].x, spawn[0].y - 32, 'player');
        this.game.physics.arcade.enable(this.player);
        this.game.physics.arcade.gravity.y = 600;
        this.player.body.bounce.y = 0.2;
        this.player.body.linearDamping = 1;
        this.player.body.collideWorldBounds = true;
        this.game.camera.follow(this.player);

        this.player.animations.add('left', [0, 1], 5, true);
        this.player.animations.add('right', [3,4], 5, true);

        this.textGroup = this.game.add.group();
        this.textGroup.fixedToCamera = false;
        this.textGroup.alpha = 0.4;
        this.textOverlays.forEach(function(textItem) {
            this.textGroup.add(new Phaser.BitmapText(this.game, textItem.x * this.TEXT_PARALLAX_SCALE, textItem.y * this.TEXT_PARALLAX_SCALE, 'nokia', textItem.text, textItem.size));
        }.bind(this));

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    hitCoin: function (sprite, tile) {
        // console.log(tile);
        tile.index = 1;
        this.layer.dirty = true;
        // return true;
    },

    moveLeft: function () {
        this.player.body.velocity.x = -150;
        this.player.animations.play('left');
    },

    moveRight: function() {
        this.player.body.velocity.x = 150;
        this.player.animations.play('right');
    },

    jump: function () {
        this.player.body.velocity.y = -300;
    },

    update: function() {
        
        this.textGroup.x = this.game.world.x * this.TEXT_PARALLAX_SCALE;
        this.textGroup.y = this.game.world.y * this.TEXT_PARALLAX_SCALE;

        if (!this.logged){
            // console.log(this.collisions);
            this.logged = true;
        }

        this.game.physics.arcade.collide(this.player, this.background);

        if (this.cursors.up.isDown) {
            if (this.player.body.onFloor()) {
                this.jump();
            }
        }

        if (this.cursors.left.isDown) {
            this.moveLeft();

        } else if (this.cursors.right.isDown) {
            this.moveRight();
        }

        if (this.game.input.activePointer.isDown) {
            if (this.game.input.activePointer.x < this.game.width / 2) {
                this.moveLeft();
            } else {
                this.moveRight();
            }

            if (this.player.body.onFloor()) {
                this.jump();
            }
        }

        if (this.player.body.velocity.x === 0) {
            this.player.animations.stop();
            this.player.frame = 2;
        }
    }
};
