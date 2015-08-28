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
        this.textGroup.add(new Phaser.BitmapText(this.game, this.game.width / 2 - 50, this.game.height / 2 - 15, 'pixeltype', 'Loading...', 40));

        // Load our sprites
        this.load.spritesheet('player', 'assets/sprites/alex-sprite.png', 44, 64, 8);
        this.load.spritesheet('next_button', 'assets/sprites/next_button.png', 100, 30);
        this.game.load.image('sparkle1', 'assets/sprites/sparkle1.png');
        this.game.load.image('sparkle2', 'assets/sprites/sparkle2.png');
        this.game.load.image('sparkle3', 'assets/sprites/sparkle3.png');
        this.game.load.image('jewel', 'assets/sprites/jewel.png');
        this.game.load.image('jewel_grey', 'assets/sprites/jewel_grey.png');
        this.load.atlas('controls', 'assets/sprites/controls.png', 'assets/sprites/controls.json');

        // Intro Sky News report
        this.game.load.image('intro_ticker', 'assets/sprites/intro-ticker.png');
        this.game.load.image('kay', 'assets/sprites/kayburley.png');
        this.load.spritesheet('kay_mouth', 'assets/sprites/kay_mouth.png', 44, 25, 2);

        // Navigation assets
        this.game.load.image('navigation_bg', 'assets/sprites/navigation.png');
        this.load.atlas('music_sound', 'assets/sprites/music_sound.png', 'assets/sprites/music_sound.json');

        // In-game menu
        this.load.atlas('menu_buttons', 'assets/sprites/menu_buttons.png', 'assets/sprites/menu_buttons.json');
        this.game.load.image('pause', 'assets/sprites/pause.png');
        this.game.load.image('alex_pause', 'assets/sprites/alex_pause.png');



        // Common
        this.load.image('next_level', 'assets/sprites/alexs_time_machine.png');

        this.game.load.audio('kay_voice_intro', 'assets/audio/kay_voice_intro.mp3');

        this.game.load.audio('jump', 'assets/audio/jump.mp3');
        this.game.load.audio('timemachine', 'assets/audio/timemachine.mp3');
        this.game.load.audio('pop', 'assets/audio/pop.mp3');
        this.game.load.audio('jewel', 'assets/audio/jewel.mp3');
        this.game.load.audio('bgmusic', 'assets/audio/bgmusic.mp3');
        this.game.load.audio('collectable', 'assets/audio/collectable.mp3');
        this.game.load.audio('kay_voice_intro', 'assets/audio/kay_voice_intro.mp3');

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
            this.game.state.start('intro_skynews');
            }.bind(this));
        }.bind(this), 500);

    }
};
