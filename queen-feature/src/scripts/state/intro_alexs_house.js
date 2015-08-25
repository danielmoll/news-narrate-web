/* global Game */
'use strict';

Game.State.Intro_AlexsHouse = function() {};
Game.State.Intro_AlexsHouse.prototype = {
    cursors: null,
    transitionning: false,

    create: function () {
        this.transitionning = false;
        this.game.add.image(0, 0, 'alexs_house');
        this.game.add.button(this.game.width - 120, this.game.height - 50, 'next_button', function(){}, this);
        this.game.fadePlugin.fadeIn(0x000, 750, 0);
        this.game.input.onDown.add(this.nextLevel, this);
    },

    nextLevel: function () {
        if (!this.transitionning) {
            this.transitionning = true;
            this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
                this.game.state.start('navigation');
            });
        }
    }
};
