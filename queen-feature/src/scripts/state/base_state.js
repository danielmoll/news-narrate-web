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

        this.game.sounds = {
            jump: this.game.add.audio('jump'),
            timemachine: this.game.add.audio('timemachine'),
            pop: this.game.add.audio('pop'),
            jewel: this.game.add.audio('jewel'),
            bgmusic: this.game.add.audio('bgmusic'),
            collectable: this.game.add.audio('collectable')
        };

        this.game.sounds.bgmusic.play();
        this.game.sounds.bgmusic.loopFull();
    },

    addPlayer: function() {
        var spawn,
            offset;

        // Loading the player
        spawn = this.levelModule.findObjectsByType('player_spawn');
        this.player = this.game.add.sprite(spawn[0].x, spawn[0].y - 59, 'player');

        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.game.camera.follow(this.player);
        this.player.body.width = 32;
        this.player.body.height = 50;

        offset = new Phaser.Point(5,14);
        this.player.body.offset = offset;

        this.player.animations.add('left', [1,0,1,2], 7, true);
        this.player.animations.add('right', [6,7,6,5], 6, true);
    },

    addCollectibles: function() {
        this.collectibleItems = [];
        // Loading the collectibles
        var collectibleSpawns = this.levelModule.findCollectibleObjects(),
            collectedItems = this.game.storage.get(this.levelKey) || {};

        collectibleSpawns.forEach(function(collectible) {
            var collectibleItem = this.game.add.sprite(collectible.x, collectible.y, collectible.properties.sprite_key);

            if (collectible.properties.sprite_key !== 'jewel') {
                collectibleItem._isArtefact = true;
                collectibleItem.anchor.set(0.5, 0.5);
                collectibleItem._revealFactId = collectible.properties.revealFactId;

                if (collectedItems.scoredItems && collectedItems.scoredItems[collectible.properties.sprite_key]) {
                    collectibleItem.alpha = 0.5;

                } else {
                    this.addArtefactEmitter(collectibleItem);
                    this.game.add.tween(collectibleItem).to( { y: collectibleItem.y - 8 } , 500, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
                }

            }

            collectibleItem.properties = collectible.properties;

            this.game.physics.arcade.enable(collectibleItem);
            collectibleItem.body.allowGravity = false;
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
            this.nextLevel = this.game.add.sprite(nextLevelSpawn[0].x, nextLevelSpawn[0].y, 'alexs_time_machine');
            this.game.physics.arcade.enable(this.nextLevel);

            this.nextLevel.anchor.set(0.5, 0.5);
            this.nextLevel.body.allowGravity = false;
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
        var collectible = null;

        if (sprite2._emitter) {
            sprite2._emitter.on = false;
        }
        // sprite2.destroy();


        collectible = sprite2;
        collectible.x = collectible.x - this.game.camera.x;
        collectible.y = collectible.y - this.game.camera.y;

        sprite2.fixedToCamera = true;
        collectible.body.destroy();

        this.game.add.tween(collectible.cameraOffset).to( { y: 0} , 500, Phaser.Easing.Cubic.In, true);
        this.game.add.tween(collectible.cameraOffset).to( { x: 500} , 500, Phaser.Easing.Cubic.In, true)
            .onComplete.add(collectible.destroy, collectible);

        this.collectedItems.push(collectible);

        // If subclass has its own itemCollectedHandler method, call it.
        if (this.itemCollectedHandler && typeof this.itemCollectedHandler === 'function') {
            this.itemCollectedHandler(collectible);
        }

        // Add item to score.
        this.scoreDisplay.scoreItem(collectible.properties.sprite_key, this.levelKey);

        // reveal associated factoid
        if (collectible._revealFactId) {
            this.game.sounds.collectable.play();
            this.factReference[collectible._revealFactId].reveal();
        }
    },

    _endLevelHandler: function() {
        var inTween, outTween, rotateTween, exploder;

        this.game.sounds.bgmusic.fadeOut(1000);

        this.player.visible = false;
        this.nextLevel.body.destroy();

        inTween = this.game.add.tween(this.nextLevel.scale).to({ x: 2, y: 2 }, 500, Phaser.Easing.Cubic.InOut);
        outTween = this.game.add.tween(this.nextLevel.scale).to({ x: 0, y: 0}, 1500, Phaser.Easing.Cubic.In);
        rotateTween = this.game.add.tween(this.nextLevel).to({ angle: 360 }, 1500, Phaser.Easing.Cubic.In, true, 500);

        inTween.chain(outTween);

        this.game.sounds.timemachine.play();

        exploder = this.game.add.emitter(this.nextLevel.x, this.nextLevel.y, 100);

        exploder.makeParticles(['sparkle1', 'sparkle2', 'sparkle3']);
        exploder.minParticleSpeed.setTo(-200, -300);
        exploder.maxParticleSpeed.setTo(200, 50);
        exploder.alpha = 0.5;
        exploder.minParticleAlpha = 0.7;
        exploder.maxParticleAlpha = 1;
        exploder.minParticleScale = 0;
        exploder.maxParticleScale = 1.5;

        exploder.start(true);

        outTween.onComplete.add(function() {
            exploder.explode(2000, 100);
            this.game.sounds.pop.play();
            setTimeout(function() {
                if(Game.Score.allCollected()) {
                    this.game.state.start('end_screen');
                } else if (this.levelKey === 'alexs_house') {
                    this.game.state.start('navigation');
                } else {
                    this.pauseMenu.showMenu('next_level');
                }
            }.bind(this), 500);
        }.bind(this));

        inTween.start();
    },

    update: function() {
        this._updateState();

        // If subclass has its own updateState method, call it.
        if (this.updateState && typeof this.updateState === 'function') {
            this.updateState();
        }

        if (this.levelModule.parallaxBackground) {
            this.levelModule.parallaxBackground.tilePosition.x = this.world.x / 2;
            this.levelModule.parallaxBackground.tilePosition.y = this.world.y / 2;
        }

    },

    _updateState: function() {
        // Text group movement update.
        if (this.parallaxTextGroup) {
            this.parallaxTextGroup.x = this.game.world.x * this.TEXT_PARALLAX_SCALE;
        }

        // Floor collision
        this.game.physics.arcade.collide(this.player, this.platform);

        // Collectibles collision
        this.game.physics.arcade.overlap(this.player, this.collectibleItems, this._collectiblesCollisionHandler, null, this);

        // Next level detection
        this.game.physics.arcade.overlap(this.player, this.nextLevel, this._endLevelHandler, null, this);

        this.controls.update();
    }
};
