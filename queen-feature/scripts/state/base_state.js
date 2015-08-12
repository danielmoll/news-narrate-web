/* global Phaser, Game */
'use strict';

Game.State.BaseState = function() {
    this.levelKey = null;
    this.controls = null;
    this.collectibleItems = [];
    this.collectedItems = [];
    this.parallaxTextGroup = null;
    this.fixedTextGroup = null;
};

Game.State.BaseState.prototype = {
    TEXT_PARALLAX_SCALE: 1.1,

    create: function () {
        this.game.analytics.stateStarted(this.levelKey);
        this.game.physics.arcade.gravity.y = 600;
        this._createState();
        this.game.fadePlugin.fadeIn(0x000, 750, 0);
    },

    addPlayer: function() {
        // Loading the player
        var spawn = this.mapBackground.findObjectsByType('player_spawn');
        this.player = this.game.add.sprite(spawn[0].x, spawn[0].y - 32, 'player');
        this.game.physics.arcade.enable(this.player);
        // this.player.body.bounce.y = 0.2;
        // this.player.body.linearDamping = 1;
        this.player.body.collideWorldBounds = true;
        this.game.camera.follow(this.player);

        this.player.animations.add('left', [0, 1], 5, true);
        this.player.animations.add('right', [3,4], 5, true);
    },

    addCollectibles: function() {
        // Loading the collectibles
        var collectibleSpawns = this.mapBackground.findCollectibleObjects();
        
        collectibleSpawns.forEach(function(collectible) {
            var collectibleItem = this.game.add.sprite(collectible.x, collectible.y, collectible.properties.sprite_key);
            collectibleItem.properties = collectible.properties;

            this.game.physics.arcade.enable(collectibleItem);
            collectibleItem.body.allowGravity = false;

            this.collectibleItems.push(collectibleItem);
        }.bind(this));
    },

    addNextLevelPortal: function() {
        // Next stage
        var nextLevelSpawn = this.mapBackground.findObjectsByType('next_level');

        if (nextLevelSpawn.length) {
            this.nextLevel = this.game.add.sprite(nextLevelSpawn[0].x, nextLevelSpawn[0].y, 'transparent_32-160');
            this.game.physics.arcade.enable(this.nextLevel);
            this.nextLevel.body.allowGravity = false;
            this.nextLevel.y -=110;
        }
    },

    _createState: function() {
        var textSpawns;

        // Load the current over world map
        this.mapBackground = new Game.Map.Module(this.game, this.levelKey);
        
        this.modules = {};
        
        // We manually add the over world background for now...
        this.background = this.mapBackground.createLayer('background');

        // Resize the game world to match the layer dimensions
        this.background.resizeWorld();

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

        this.addPlayer();
        this.addCollectibles();
        this.addNextLevelPortal();

        // If subclass has its own createState method, call it.
        // This is here so layering is done properly, behind the score.
        if (this.createState && typeof this.createState === 'function') {
            this.createState();
        }

        // Add in-level score display
        this.score = new Game.LevelScore(this.game, this.levelKey, this.collectibleItems);

        // Add controls
        this.controls = new Game.Controls(this.game, this.player);

        // Add pause button
        this.pauseMenu = new Game.PauseMenu(this.game);
    },

    _collectiblesCollisionHandler: function(sprite1, sprite2) {
        var collectible = null;

        if (sprite1.key !== 'player') {
            sprite1.destroy();
            collectible = sprite1;

        } else if (sprite2.key !== 'player') {
            sprite2.destroy();
            collectible = sprite2;
        }

        this.collectedItems.push(collectible);

        // If subclass has its own itemCollectedHandler method, call it.
        if (this.itemCollectedHandler && typeof this.itemCollectedHandler === 'function') {
            this.itemCollectedHandler(collectible);
        }

        // Add item to score.
        this.score.scoreItem(collectible.properties, this.levelKey);
    },

    _nextLevelHandler: function() {
        this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
            this.game.analytics.stateComplete(this.levelKey);
            this.game.state.start(this.nextLevelKey);
        }.bind(this));
    },

    update: function() {
        this._updateState();

        // If subclass has its own updateState method, call it.
        if (this.updateState && typeof this.updateState === 'function') {
            this.updateState();
        }
    },

    _updateState: function() {
        // Text group movement update.
        if (this.parallaxTextGroup) {
            this.parallaxTextGroup.x = this.game.world.x * this.TEXT_PARALLAX_SCALE;
        }

        // Floor collision
        this.game.physics.arcade.collide(this.player, this.background);

        // Jewel collision
        this.game.physics.arcade.overlap(this.player, this.collectibleItems, this._collectiblesCollisionHandler, null, this);

        // Next level detection
        this.game.physics.arcade.overlap(this.player, this.nextLevel, this._nextLevelHandler, null, this);

        this.controls.update();
    }
};
