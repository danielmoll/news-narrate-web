/* global Game */
'use strict';

Game.State.Preloader = function() {};
Game.State.Preloader.prototype = {
    preload: function() {
        this.stage.backgroundColor = '#000000';

        this.load.bitmapFont('pixeltype', 'assets/fonts/bitmapFonts/pixeltype.png', 'assets/fonts/bitmapFonts/pixeltype.xml');
        this.load.atlas('assets', 'assets/sprites/assets.png', 'assets/sprites/assets.json');

        // Animation sprites
        this.load.spritesheet('player', 'assets/sprites/alex-sprite.png', 44, 64, 8);
        this.game.load.image('sparkle1', 'assets/sprites/sparkle1.png');
        this.game.load.image('sparkle2', 'assets/sprites/sparkle2.png');
        this.game.load.image('sparkle3', 'assets/sprites/sparkle3.png');
        this.load.spritesheet('kay_mouth', 'assets/sprites/kay_mouth.png', 44, 25, 2);

        // Parallax backgrounds
        this.game.load.image('parallax_alexs_house', 'assets/tiles/parallax_alexs_house.png');
        this.game.load.image('parallax_1950s', 'assets/tiles/parallax_1950s.png');
        this.game.load.image('parallax_1960s', 'assets/tiles/parallax_1960s.png');
        this.game.load.image('parallax_1970s', 'assets/tiles/parallax_1970s.png');
        this.game.load.image('parallax_1980s', 'assets/tiles/parallax_1980s.png');
        this.game.load.image('parallax_1990s', 'assets/tiles/parallax_1990s.png');
        this.game.load.image('parallax_2000s', 'assets/tiles/parallax_2000s.png');
        this.game.load.image('parallax_now', 'assets/tiles/parallax_now.png');

        // Sounds effects
        this.game.load.audio('jump', 'assets/audio/jump.mp3');
        this.game.load.audio('timemachine', 'assets/audio/timemachine.mp3');
        this.game.load.audio('pop', 'assets/audio/pop.mp3');
        this.game.load.audio('jewel', 'assets/audio/jewel.mp3');
        this.game.load.audio('bgmusic', 'assets/audio/bgmusic.mp3');
        this.game.load.audio('credits', 'assets/audio/credits.mp3');
        this.game.load.audio('collectable', 'assets/audio/collectable.mp3');
        this.game.load.audio('kay_voice_intro', 'assets/audio/kay_voice_intro.mp3');
        this.game.load.audio('kay_voice_outro', 'assets/audio/kay_voice_outro.mp3');


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
        document.body.className += 'game-loaded';
        setTimeout(function() {
            this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
            this.game.state.start('intro_skynews');

            }.bind(this));
        }.bind(this), 500);
    }
};
