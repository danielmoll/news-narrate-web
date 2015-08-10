Game.State.decade_50s = function(game) {};
Game.State.decade_50s.prototype = {
    levelName: 'decade_50s',
    map: null,
    layer: null,
    controls: null,
    crownCollected: false,
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
        this.mapBackground = new Game.Map.Module(this.game, 'decade_50s');
        
        this.modules = {};
        
        // We manually add the over world background for now...
        this.background = this.mapBackground.createLayer('background');

        // Resize the game world to match the layer dimensions
        this.background.resizeWorld();

        this.mapBackground.tilemap.setCollisionBetween(76, 84);


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
        // Loading gthe crown
        var crownSpawn = this.mapBackground.findObjectsByType('crown_spawn');
        var emitter = this.game.add.emitter(crownSpawn[0].x + 16, crownSpawn[0].y + 16, 10);
        this.crownSparkleEmitter = emitter;
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
        this.crown = this.game.add.sprite(crownSpawn[0].x, crownSpawn[0].y, 'crown');
        this.game.physics.arcade.enable(this.crown);
        this.crown.body.allowGravity = false;

        // Next stage
        var nextLevelSpawn = this.mapBackground.findObjectsByType('next_level');
        this.nextLevel = this.game.add.sprite(nextLevelSpawn[0].x, nextLevelSpawn[0].y, 'transparent_32-160');
        this.game.physics.arcade.enable(this.nextLevel);
        this.nextLevel.body.allowGravity = false;
        this.nextLevel.y -=110;
        
        this.banisterLayer = this.mapBackground.createLayer('banisters');
        this.columnLayer = this.mapBackground.createLayer('columns');


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

    crownCollisionHandler: function() {
        if (!this.crownCollected) {
            this.player.addChild(this.crown);
            this.crown.x = 1;
            this.crown.y = -16;
            this.crownSparkleEmitter.on = false;

            // Increment points
            this.game.score.increment(10, this.levelName);
            this.crownCollected = true;
        }
    },

    nextLevelHandler: function() {
        this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
            this.game.state.start('playvideo');
        }.bind(this));
    },

    update: function() {
        // Text group movement update.
        this.paralaxTextGroup.x = this.game.world.x * this.TEXT_PARALLAX_SCALE;
        this.paralaxTextGroup.y = this.game.world.y * this.TEXT_PARALLAX_SCALE;

        // Floor collision
        this.game.physics.arcade.collide(this.player, this.background);

        // Crown collision
        this.game.physics.arcade.overlap(this.player, this.crown, this.crownCollisionHandler, null, this);

        // Next level detection
        this.game.physics.arcade.overlap(this.player, this.nextLevel, this.nextLevelHandler, null, this);

        this.controls.update();
    }
};
