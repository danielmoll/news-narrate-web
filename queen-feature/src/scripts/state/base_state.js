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
        var spawn = this.levelModule.findObjectsByType('player_spawn');
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
        this.collectibleItems = [];
        // Loading the collectibles
        var collectibleSpawns = this.levelModule.findCollectibleObjects();

        collectibleSpawns.forEach(function(collectible) {
            var collectibleItem = this.game.add.sprite(collectible.x, collectible.y, collectible.properties.sprite_key);

            if (collectible.properties.sprite_key !== 'jewel') {
                collectibleItem._isArtefact = true;
                collectibleItem._revealFactId = collectible.properties.revealFactId;
                this.addArtefactEmitter(collectibleItem);
            }

            collectibleItem.properties = collectible.properties;

            this.game.physics.arcade.enable(collectibleItem);
            collectibleItem.body.allowGravity = false;
            collectibleItem.anchor = new Phaser.Point(0.5, 0.5);
            this.collectibleItems.push(collectibleItem);
        }.bind(this));
    },

    addArtefactEmitter: function(collectibleItem) {
        var emitter = this.game.add.emitter(collectibleItem.x, collectibleItem.y, 10);

        emitter.makeParticles(['sparkle1', 'sparkle2', 'sparkle3']);
        emitter.minParticleSpeed.setTo(-50, -50);
        emitter.maxParticleSpeed.setTo(50, 50);
        emitter.gravity = -600;
        emitter.alpha = 0.5;
        emitter.minParticleAlpha = 0.7;
        emitter.maxParticleAlpha = 1;
        emitter.minParticleScale = 0.5;
        emitter.maxParticleScale = 1.5;

        emitter.start(false, 1000, 100);

        collectibleItem._emitter = emitter;
    },

    addNextLevelPortal: function() {
        // Next stage
        var nextLevelSpawn = this.levelModule.findObjectsByType('next_level');

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
        this.levelModule = new Game.Map.Module(this.game, this.levelKey);

        this.modules = {};

        // If subclass has a createBackgroundLayers method, call it.
        if (this.createBackgroundLayers && typeof this.createBackgroundLayers === 'function') {
            this.createBackgroundLayers();
        }

        // We manually add the over world platform for now...
        this.platform = this.levelModule.createLayer('platform');
        this.platform.alpha = 0;

        // Resize the game world to match the layer dimensions
        this.platform.resizeWorld();
        

        

        this.addNextLevelPortal();



        // Text overlays
        // this.fixedTextGroup = this.game.add.group();
        // this.fixedTextGroup.z = 0;
        // this.fixedTextGroup.fixedToCamera = false;

        textSpawns = this.levelModule.findTextObjects();

        this.factReference = {};

        this.addPlayer();
        this.addCollectibles();
        this.controls = new Game.Controls(this.game, this.player);

        // If subclass has a createForegroundLayers method, call it.
        if (this.createForegroundLayers && typeof this.createForegroundLayers === 'function') {
            this.createForegroundLayers();
        }

        textSpawns.forEach(function(textItem) {
            if (textItem.properties.type === 'factoid') {
                this.factReference[textItem.properties.id] = new Game.Map.Object.Factoid(this.game, textItem);                
            }
            else {
                new Game.Map.Object.FloatingText(this.game, textItem);
            }
        }.bind(this));



        if (this.setCollisions && typeof this.setCollisions === 'function') {
            this.setCollisions();
        }

        // Add in-level score display
        this.scoreDisplay = new Game.LevelScore(this.game, this.levelKey, this.collectibleItems);

        // Add controls

        // Add pause button
        this.pauseMenu = new Game.PauseMenu(this.game);

        // this.player.bringToTop();

    },

    _collectiblesCollisionHandler: function(sprite1, sprite2) {
        var collectible = null,
            factoid;

        if (sprite2._emitter) {
            sprite2._emitter.on = false;
        }
        // sprite2.destroy();


        collectible = sprite2;
        collectible.x = collectible.x - this.game.camera.x;
        collectible.y = collectible.y - this.game.camera.y;

        sprite2.fixedToCamera = true;
        collectible.body.destroy();

        this.game.add.tween(collectible).to( { alpha: 0} , 500, 'Linear', true);
        this.game.add.tween(collectible.scale).to( { x:3, y:3 } , 250, Phaser.Easing.Quadratic.In, true).chain(
            this.game.add.tween(collectible.scale).to( { x:1, y:1 } , 250, Phaser.Easing.Quadratic.Out)
        );
        this.game.add.tween(collectible.cameraOffset).to( { y: -32} , 500, Phaser.Easing.Quadratic.InOut, true);
        this.game.add.tween(collectible.cameraOffset).to( { x: 500} , 500, Phaser.Easing.Quadratic.InOut, true)
            .onComplete.add(collectible.destroy, collectible);

        this.collectedItems.push(collectible);

        // If subclass has its own itemCollectedHandler method, call it.
        if (this.itemCollectedHandler && typeof this.itemCollectedHandler === 'function') {
            this.itemCollectedHandler(collectible);
        }

        // Add item to score.
        this.scoreDisplay.scoreItem(collectible.properties, this.levelKey);

        // reveal associated factoid
        if (collectible._revealFactId) {
            this.factReference[collectible._revealFactId].reveal();
        }
    },

    _nextLevelHandler: function() {
        this.pauseMenu.showMenu('next_level');
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
        this.game.physics.arcade.collide(this.player, this.platform);

        // Jewel collision
        this.game.physics.arcade.overlap(this.player, this.collectibleItems, this._collectiblesCollisionHandler, null, this);

        // Next level detection
        this.game.physics.arcade.overlap(this.player, this.nextLevel, this._nextLevelHandler, null, this);

        this.controls.update();
    }
};
