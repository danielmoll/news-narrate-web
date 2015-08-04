Game.State.Preloader = function(game) {};
Game.State.Preloader.prototype = {
    preload: function() {
        // Black loading screen
        this.game.stage.backgroundColor = '#787878';

        // this.add.sprite(492, 175, 'loading_text');
        // this.add.sprite(120, 580, 'loading_bar_bg');
        // this.preloadBar = this.add.sprite(140, 600, 'loading_bar');
        // this.add.sprite(140, 600, 'loading_bar_fg');
        // this.load.setPreloadSprite(this.preloadBar);

        // Load our sprites
        // this.load.image('player', 'res/img/sprites/player.png');
        // this.load.image('door', 'res/img/sprites/door.png');
        // this.load.image('stairs', 'res/img/sprites/stairs.png');

        // Get some audio up in this shit.
        // this.load.audio('doorOpen_1', 'res/audio/doorOpen_1.ogg');
        // this.load.audio('doorClose_4', 'res/audio/doorClose_4.ogg');

        this.load.image('tiles', 'assets/tiles/buckinghampalace_background.png');
        this.load.spritesheet('player', 'assets/sprites/queen-sprite.png', 32, 32, 6);
        this.load.bitmapFont('nokia', 'assets/fonts/bitmapFonts/nokia.png', 'assets/fonts/bitmapFonts/nokia.xml');

        // Load all of our maps and their components.
        this.loadTileMaps();
    },

    // Many of the maps use the same tile images. We create a map of all these images
    // so that we only load them once.
    loadTileMaps: function() {
        var tileSetMap = {};
        for (var i = 0; i < Game.Map.MAPS.length; i++) {
            this.addTileSets(Game.Map.MAPS[i], tileSetMap);
        }

        for (var key in tileSetMap) {
            if (tileSetMap.hasOwnProperty(key)) {
                this.load.image(key, tileSetMap[key]);
            }
        }
    },

    addTileSets: function(mapKey, tileSetMap) {
        var tileSets = this.cache.getTilemapData(mapKey).data.tilesets;
        var key, value;
        for (var i = 0; i < tileSets.length; i++) {
            key = tileSets[i].name;
            value = 'assets/maps/' + tileSets[i].image;
            if (key in tileSetMap) continue;
            tileSetMap[key] = value;
        }
    },

    create: function() {
        this.game.state.start('game');
    }
};
