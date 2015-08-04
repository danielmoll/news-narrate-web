Game.State.Preloader = function(game) {};
Game.State.Preloader.prototype = {
    preload: function() {
        this.stage.backgroundColor = '#000000';
        
        // loading screen
        this.add.sprite(195, 138, 'crown');
        // this.add.sprite(120, 80, 'loading_bar_bg');
        // this.preloadBar = this.add.sprite(140, 100, 'loading_bar');
        // this.add.sprite(140, 100, 'loading_bar_fg');
        // this.load.setPreloadSprite(this.preloadBar);

        this.textGroup = this.game.add.group();
        this.textGroup.fixedToCamera = true;
        // this.textGroup.alpha = 0.4;
        // this.textGroup.add(new Phaser.BitmapText(this.game, 50, 50, 'nokia', 'loading', 30));
        this.textGroup.add(new Phaser.BitmapText(this.game, this.game.width / 2 - 50, this.game.height / 2 - 20, 'nokia', 'Loading...', 25));

        // Load our sprites
        this.load.spritesheet('player', 'assets/sprites/queen-sprite.png', 32, 64, 6);
        this.game.load.image('sparkle1', 'assets/sprites/sparkle1.png');
        this.game.load.image('sparkle2', 'assets/sprites/sparkle2.png');
        this.game.load.image('sparkle3', 'assets/sprites/sparkle3.png');
        this.game.load.image('transparent_32-160', 'assets/sprites/transparent_32-160.png');
        // this.load.image('corgi', 'assets/sprites/corgi.gif');
        
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
         setTimeout(function() {this.game.state.start('game'); }.bind(this), 100);
    }
};
