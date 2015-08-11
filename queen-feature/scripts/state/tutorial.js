/* global Phaser, Game */
'use strict';

Game.State.Tutorial = function() {};
Game.State.Tutorial.prototype = {
    levelName: 'tutorial',
    layer: null,
    controls: null,
    collectibleItems: [],
    parallaxTextGroup: null,
    fixedTextGroup: null,
    TEXT_PARALLAX_SCALE: 1.1,

    create: function () {
        this.createState();
        this.game.fadePlugin.fadeIn(0x000, 750, 0);
    },

    createState: function() {
        var textSpawns,
            spawn,
            collectibleSpawns,
            nextLevelSpawn;

        // Load the current over world map
        this.mapBackground = new Game.Map.Module(this.game, 'tutorial');
        
        this.modules = {};
        
        // We manually add the over world background for now...
        this.background = this.mapBackground.createLayer('background');

        // Resize the game world to match the layer dimensions
        this.background.resizeWorld();

        this.mapBackground.tilemap.setCollisionBetween(76, 84);

        // Text overlays
        this.fixedTextGroup = this.game.add.group();
        this.fixedTextGroup.fixedToCamera = false;
        this.fixedTextGroup.alpha = 0.8;

        this.parallaxTextGroup = this.game.add.group();
        this.parallaxTextGroup.fixedToCamera = false;
        this.parallaxTextGroup.alpha = 0.4;

        textSpawns = this.mapBackground.findTextObjects();

        textSpawns.forEach(function(textItem) {
            if(textItem.properties.parallax) {
                this.parallaxTextGroup.add(new Phaser.BitmapText(this.game, textItem.x, textItem.y, 'nokia', textItem.properties.text, textItem.properties.size));
            } else {
                this.fixedTextGroup.add(new Phaser.BitmapText(this.game, textItem.x, textItem.y, 'nokia', textItem.properties.text, textItem.properties.size));
            }
        }.bind(this));

        // Loading the player
        spawn = this.mapBackground.findObjectsByType('player_spawn');
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
        collectibleSpawns = this.mapBackground.findCollectibleObjects();

        collectibleSpawns.forEach(function(collectible) {
            var collectibleItem = this.game.add.sprite(collectible.x, collectible.y, collectible.properties.sprite_key);
            collectibleItem.properties = collectible.properties;

            this.game.physics.arcade.enable(collectibleItem);
            collectibleItem.body.allowGravity = false;

            this.collectibleItems.push(collectibleItem);
        }.bind(this));

        // Next stage
        nextLevelSpawn = this.mapBackground.findObjectsByType('next_level');
        this.nextLevel = this.game.add.sprite(nextLevelSpawn[0].x, nextLevelSpawn[0].y, 'transparent_32-160');
        this.game.physics.arcade.enable(this.nextLevel);
        this.nextLevel.body.allowGravity = false;
        this.nextLevel.y -=110;
        
        this.banisterLayer = this.mapBackground.createLayer('banisters');
        this.columnLayer = this.mapBackground.createLayer('columns');

        // Score display
        this.game.score.addDisplay();

        // Add joystick
        this.controls = new Game.Controls(this.game, this.player);

        // Add pause button
        this.pauseMenu = new Game.PauseMenu(this.game);
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

    nextLevelHandler: function() {
        this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
            this.game.state.start('decade_50s');
        }.bind(this));
    },

    update: function() {
        // Text group movement update.
        this.parallaxTextGroup.x = this.game.world.x * this.TEXT_PARALLAX_SCALE;

        // Floor collision
        this.game.physics.arcade.collide(this.player, this.background);

        // Jewel collision
        this.game.physics.arcade.overlap(this.player, this.collectibleItems, this.collectiblesCollisionHandler, null, this);

        // Next level detection
        this.game.physics.arcade.overlap(this.player, this.nextLevel, this.nextLevelHandler, null, this);

        this.controls.update();
    }
};
