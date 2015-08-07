Game.State.Tutorial = function(game) {};
Game.State.Tutorial.prototype = {
    map: null,
    layer: null,
    controls: null,
    score: null,
    jewels: [],
    paralaxTextOverlays: [
        { text: 'Touch this area of\nthe screen to move...', size: 20, x: 260, y: 410},
        { text: 'Slide your thumb up to jump\nover obstacles.', size: 20, x: 1300, y: 220}
    ],
    fixedTextOverlays: [
        { text: '1950s >>', size: 20, x: 4200, y: 100 }
    ],
    TEXT_PARALLAX_SCALE: 1.1,

    create: function () {
        this.createState();
        this.game.fadePlugin.fadeIn(0x000, 750, 0);
    },

    createState: function() {

        // Load the current over world map
        this.mapBackground = new Game.Map.Module(this.game, 'tutorial');
        
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
        // Loading gthe jewels
        var jewelSpawns = this.mapBackground.findObjectsByType('jewel_spawn');

        jewelSpawns.forEach(function(jewelSpawn) {
            var jewel = this.game.add.sprite(jewelSpawn.x, jewelSpawn.y, 'jewel');
            this.game.physics.arcade.enable(jewel);
            jewel.body.allowGravity = false;

            this.jewels.push(jewel);
        }.bind(this));

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
        this.score = new Game.Score(this.game);

        // Add joystick
        this.controls = new Game.Controls(this.game, this.player);
    },

    jewelCollisionHandler: function(sprite1, sprite2) {
        if (sprite1.key === 'jewel') {
            sprite1.destroy();

        } else if (sprite2.key === 'jewel') {
            sprite2.destroy();
        }

        // Increment points
        this.score.increment(1);
    },

    nextLevelHandler: function() {
        this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
            this.game.state.start('intro_50s');
        }.bind(this));
    },

    update: function() {
        // Text group movement update.
        this.paralaxTextGroup.x = this.game.world.x * this.TEXT_PARALLAX_SCALE;
        this.paralaxTextGroup.y = this.game.world.y * this.TEXT_PARALLAX_SCALE;

        // Floor collision
        this.game.physics.arcade.collide(this.player, this.background);

        // Jewel collision
        this.game.physics.arcade.overlap(this.player, this.jewels, this.jewelCollisionHandler, null, this);

        // Next level detection
        this.game.physics.arcade.overlap(this.player, this.nextLevel, this.nextLevelHandler, null, this);

        this.controls.update();
    }
};
