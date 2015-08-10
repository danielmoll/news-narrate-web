Game.State.decade_2010s = function(game) {};
Game.State.decade_2010s.prototype = {
    levelName: 'decade_2010s',
    controls: null,
    collectibleItems: [],
    paralaxTextOverlays: [
        { text: '1953', size: 200, x: 50, y: 230 },
        { text: 'February 1952 George VI dies aged 56. \nHis daughter, Princess Elizabeth, is proclaimed\nQueen of the United Kingdom.', size: 20, x: 50, y: 380}
    ],
    fixedTextOverlays: [
        { text: 'Onwards to the 60s >>', size: 20, x: 1850, y: 100 }
    ],
    TEXT_PARALLAX_SCALE: 1.1,

    create: function () {
        this.createState();
        this.game.fadePlugin.fadeIn(0x000, 750, 0);
    },

    createState: function() {

        // Load the current over world map
        this.mapBackground = new Game.Map.Module(this.game, 'decade_2010s');
        
        this.modules = {};
        
        // We manually add the over world background for now...
        this.background = this.mapBackground.createLayer('background');

        // Resize the game world to match the layer dimensions
        this.background.resizeWorld();

        this.mapBackground.tilemap.setCollisionBetween(833, 848);
        this.mapBackground.tilemap.setCollisionBetween(860, 881);


        this.endTextGroup = this.game.add.group();
        this.endTextGroup.fixedToCamera = false;
        this.endTextGroup.alpha = 0.8;
        this.fixedTextOverlays.forEach(function(textItem) {
            this.endTextGroup.add(new Phaser.BitmapText(this.game, textItem.x, textItem.y, 'nokia', textItem.text, textItem.size));
        }.bind(this));

        // Loading the queen
        var spawn = this.mapBackground.findObjectsByType('player_spawn');
        this.player = this.game.add.sprite(spawn[0].x, spawn[0].y - 32, 'player');
        this.game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.linearDamping = 1;
        this.player.body.collideWorldBounds = true;
        this.game.camera.follow(this.player);

        this.player.animations.add('left', [0, 1], 5, true);
        this.player.animations.add('right', [3,4], 5, true);

        this.game.physics.arcade.gravity.y = 600;

        // Loading the collectibles
        var collectibleSpawns = this.mapBackground.findCollectibleObjects();

        collectibleSpawns.forEach(function(collectible) {
            var collectibleItem = this.game.add.sprite(collectible.x, collectible.y, collectible.properties.sprite_key);
            collectibleItem.properties = collectible.properties;

            this.game.physics.arcade.enable(collectibleItem);
            collectibleItem.body.allowGravity = false;

            this.collectibleItems.push(collectibleItem);
        }.bind(this));

        // Text overlays
        this.paralaxTextGroup = this.game.add.group();
        this.paralaxTextGroup.fixedToCamera = false;
        this.paralaxTextGroup.alpha = 0.4;
        this.paralaxTextOverlays.forEach(function(textItem) {
            this.paralaxTextGroup.add(new Phaser.BitmapText(this.game, textItem.x * this.TEXT_PARALLAX_SCALE, textItem.y * this.TEXT_PARALLAX_SCALE, 'nokia', textItem.text, textItem.size));
        }.bind(this));

        // Score display
        this.game.score.addDisplay();

        // Add joystick
        this.controls = new Game.Controls(this.game, this.player);
    },

    collectiblesCollisionHandler: function(sprite1, sprite2) {
        var collectible = null;

        if (sprite1.key !== 'player') {
            sprite1.destroy();
            collectible = sprite1;

        } else if (sprite2.key !== 'player') {
            sprite2.destroy();
            collectible = sprite2;
        }

        // Add item to score.
        this.game.score.scoreItem(collectible.properties, this.levelName);
    },

    update: function() {
        // Text group movement update.
        this.paralaxTextGroup.x = this.game.world.x * this.TEXT_PARALLAX_SCALE;
        this.paralaxTextGroup.y = this.game.world.y * this.TEXT_PARALLAX_SCALE;

        // Floor collision
        this.game.physics.arcade.collide(this.player, this.background);
        
        // Jewel collision
        this.game.physics.arcade.overlap(this.player, this.collectibleItems, this.collectiblesCollisionHandler, null, this);

        this.controls.update();
    }
};
