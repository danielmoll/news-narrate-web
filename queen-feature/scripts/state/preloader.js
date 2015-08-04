Game.State.Preloader = function(game) {};
Game.State.Preloader.prototype = {
    preload: function() {
        this.game.stage.backgroundColor = '#787878';
        
        // loading screen
        // this.add.sprite(492, 175, 'loading_text');
        // this.add.sprite(120, 580, 'loading_bar_bg');
        // this.preloadBar = this.add.sprite(140, 600, 'loading_bar');
        // this.add.sprite(140, 600, 'loading_bar_fg');
        // this.load.setPreloadSprite(this.preloadBar);

        // Load our sprites
        this.load.spritesheet('player', 'assets/sprites/queen-sprite.png', 32, 64, 6);
        this.game.load.image('sparkle1', 'assets/sprites/sparkle1.png');
        this.load.image('sparkle2', 'assets/sprites/sparkle2.png');
        this.load.image('sparkle3', 'assets/sprites/sparkle3.png');
        this.load.image('crown', 'assets/sprites/crown.png');
        
        // Fonts
        this.load.bitmapFont('nokia', 'assets/fonts/bitmapFonts/nokia.png', 'assets/fonts/bitmapFonts/nokia.xml');

        // Get some audio up in this shit.
        // this.load.audio('doorOpen_1', 'res/audio/doorOpen_1.ogg');
        // this.load.audio('doorClose_4', 'res/audio/doorClose_4.ogg');

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
