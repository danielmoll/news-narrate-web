
Game.State.Startup = function(game) {};
Game.State.Startup.prototype = {
    preload: function() {
        // Load our "loading" images
        // this.load.image('loading_text', 'assets/sprites/loading_text.png');
        // this.load.image('loading_bar_bg', 'assets/sprites/loading_bar_bg.png');
        // this.load.image('loading_bar', 'assets/sprites/loading_bar.png');
        // this.load.image('loading_bar_fg', 'assets/sprites/loading_bar_fg.png');
        this.load.image('crown', 'assets/sprites/crown.png');

        // Fonts
        this.load.bitmapFont('nokia', 'assets/fonts/bitmapFonts/nokia.png', 'assets/fonts/bitmapFonts/nokia.xml');

        // Load the json maps, so we can load the images in the next steps.
        var map;
        for (var i = 0; i < Game.Map.MAPS.length; i++) {
            map = Game.Map.MAPS[i];
            this.load.tilemap(map, 'assets/maps/' + map + '.json', null, Phaser.Tilemap.TILED_JSON);
        }
    },

    create: function() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.state.start('preloader');
    }
};