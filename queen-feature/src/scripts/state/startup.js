/* global Phaser, Game */
'use strict';

Game.State.Startup = function() {};
Game.State.Startup.prototype = {
    preload: function() {
        // Load the json maps, so we can load the images in the next steps.
        // Load map json
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

        document.querySelector('.fullscreen-prompt__link').addEventListener('click', function() {
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.startFullScreen(false);
        }.bind(this), false);

    }
};
