/* global Phaser, Game */
'use strict';

Game.State.Preloader = function() {};
Game.State.Preloader.prototype = {
    preload: function() {
        this.stage.backgroundColor = '#000000';
        
        // loading screen
        this.add.sprite(195, 138, 'crown');

        // Adding the 'loading text'
        this.textGroup = this.game.add.group();
        this.textGroup.fixedToCamera = true;
        this.textGroup.add(new Phaser.BitmapText(this.game, this.game.width / 2 - 50, this.game.height / 2 - 20, 'nokia', 'Loading...', 25));

        // Load our sprites
        this.load.spritesheet('player', 'assets/sprites/queen-sprite.png', 32, 64, 6);
        this.load.spritesheet('next_button', 'assets/sprites/next_button.png', 100, 30);
        this.game.load.image('sparkle1', 'assets/sprites/sparkle1.png');
        this.game.load.image('sparkle2', 'assets/sprites/sparkle2.png');
        this.game.load.image('sparkle3', 'assets/sprites/sparkle3.png');
        this.game.load.image('transparent_32-160', 'assets/sprites/transparent_32-160.png');
        this.game.load.image('jewel', 'assets/sprites/jewel.png');
        this.game.load.image('jewel_grey', 'assets/sprites/jewel_grey.png');
        this.game.load.image('corgi', 'assets/sprites/corgi.png');
        this.game.load.image('corgi_grey', 'assets/sprites/corgi_grey.png');
        this.game.load.image('crown_grey', 'assets/sprites/crown_grey.png');

        // Load navigation button images
        this.game.load.image('button_level_50s', 'assets/sprites/level_buttons/level_50s.png');
        this.game.load.image('button_level_60s', 'assets/sprites/level_buttons/level_60s.png');
        this.game.load.image('button_level_70s', 'assets/sprites/level_buttons/level_70s.png');
        this.game.load.image('button_level_80s', 'assets/sprites/level_buttons/level_80s.png');
        this.game.load.image('button_level_90s', 'assets/sprites/level_buttons/level_90s.png');
        this.game.load.image('button_level_00s', 'assets/sprites/level_buttons/level_00s.png');
        this.game.load.image('button_level_10s', 'assets/sprites/level_buttons/level_10s.png');
        
        // virtual joystick
        this.load.image('compass', 'assets/sprites/compass_rose.png');
        this.load.image('touch_segment', 'assets/sprites/touch_segment.png');
        this.load.image('touch', 'assets/sprites/touch.png');

        // In-game menu
        this.load.image('pause', 'assets/sprites/pause.png');

        // Get some audio up in this shit.
        // this.load.audio('doorOpen_1', 'res/audio/doorOpen_1.ogg');
        // this.load.audio('doorClose_4', 'res/audio/doorClose_4.ogg');

        // Load all of our maps and their components.
        this.loadTileMaps();
    },

    // Many of the maps use the same tile images. We create a map of all these images
    // so that we only load them once.
    loadTileMaps: function() {
        var tileSetMap = {},
            key,
            i;

        for (i = 0; i < Game.Map.MAPS.length; i++) {
            this.addTileSets(Game.Map.MAPS[i], tileSetMap);
        }

        for (key in tileSetMap) {
            if (tileSetMap.hasOwnProperty(key)) {
                this.load.image(key, tileSetMap[key]);
            }
        }
    },

    addTileSets: function(mapKey, tileSetMap) {
        var tileSets = this.cache.getTilemapData(mapKey).data.tilesets,
            value,
            key,
            i;

        for (i = 0; i < tileSets.length; i++) {
            key = tileSets[i].name;
            value = 'assets/maps/' + tileSets[i].image;
            if (key in tileSetMap) continue;
            tileSetMap[key] = value;
        }
    },

    create: function() {
        setTimeout(function() {
            this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
                this.game.state.start('tutorial');
            }.bind(this));
        }.bind(this), 500);
    }
};
