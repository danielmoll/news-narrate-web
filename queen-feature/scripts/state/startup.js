var Game = {};

// Setup our namespaces and resource lists.
Game = {};
Game.State = {};
Game.Map = {};
Game.Map.Object = {};

Game.Map.MAPS = [
    // Overworld maps
    'main'//,

    // // Modules used in maps
    // 'house0_f0'
];

Game.State.Startup = function(game) {};
Game.State.Startup.prototype = {
    preload: function() {
        // Load our "loading" images
        this.load.image('loading_text', 'assets/sprites/loading_text.png');
        // this.load.image('loading_bar_bg', 'res/img/loading_bar_bg.png');
        // this.load.image('loading_bar', 'res/img/loading_bar.png');
        // this.load.image('loading_bar_fg', 'res/img/loading_bar_fg.png');

        // Load the json maps, so we can load the images in the next steps.
        var map;
        for (var i = 0; i < Game.Map.MAPS.length; i++) {
            map = Game.Map.MAPS[i];
            this.load.tilemap(map, 'assets/maps/' + map + '.json', null, Phaser.Tilemap.TILED_JSON);
        }
    },

    create: function() {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.state.start('preloader');
    }
};