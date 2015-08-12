/* global Phaser, Game */
'use strict';

Game.State.Startup = function() {};
Game.State.Startup.prototype = {
    preload: function() {
        // /!\ If you remove the crow from the preloader
        // /!\   screen, and remove this line, you MUST
        // /!\   add load it in the preloader.js file or
        // /!\   levels using the crown asset will fail
        this.load.image('crown', 'assets/sprites/crown.png');

        // Fonts
        // This load call is only here because we need it
        // on the loading screen.
        this.load.bitmapFont('nokia', 'assets/fonts/bitmapFonts/nokia.png', 'assets/fonts/bitmapFonts/nokia.xml');

        // Load the json maps, so we can load the images in the next steps.
        var map,
            i;

        for (i = 0; i < Game.Map.MAPS.length; i++) {
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