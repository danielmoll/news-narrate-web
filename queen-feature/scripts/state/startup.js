Game.State.Startup = function(game) {};
Game.State.Startup.prototype = {
    preload: function() {
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

        this.game.fadePlugin = this.game.plugins.add(new Phaser.Plugin.Fade(this));

        //physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.state.start('preloader');
    }
};