/* global Game */
'use strict';

Game.State.Intro_AlexsHouse = function() {

    // this.textElts = [{
    //     id: 'forwardText',
    //     text: 'Press here to\nmove forward',
    //     size: 16,
    //     color: '#000',
    //     position: 'br', // bottom right
    //     alpha: function(x) {
    //         var alpha = 0,
    //             t;

    //         t = 1 - (x - this.game.width / 2) / (this.game.width / 2);
    //         alpha = t < 0 ? 0 : (t > 1 ? 1 : t);

    //         return alpha;
    //     }.bind(this)
    // },{
    //     id: 'jumpText',
    //     text: 'While moving,\npress here to jump',
    //     size: 16,
    //     color: '#000',
    //     position: 'bl', // bottom left
    //     alpha: function(x) {
    //         var alpha = 0,
    //             t;

    //         if (x >= this.game.width / 2 && x < this.game.width) {
    //             console.log('aaaaaa', x);
    //             t = (x - this.game.width / 2) / (this.game.width / 2);
    //             console.log(t);
    //             alpha = t < 0 ? 0 : (t > 1 ? 1 : t);

    //         } else if (x >= this.game.width && x < this.game.width * 1.5) {
    //             // console.log('bbbbb');
    //             t = 1 - (x - this.game.width) / (this.game.width / 2);
    //             // console.log(t);
    //             alpha = t;
    //         }

    //         return alpha;
    //     }.bind(this)
    // }];
};
Game.State.Intro_AlexsHouse.prototype = new Game.State.BaseState();
Game.State.Intro_AlexsHouse.prototype.levelKey = 'alexs_house';
Game.State.Intro_AlexsHouse.prototype.nextLevelKey = 'navigation';

Game.State.Intro_AlexsHouse.prototype.setCollisions = function() {
    this.levelModule.tilemap.setCollision(22);
};

Game.State.Intro_AlexsHouse.prototype.createBackgroundLayers = function() {
    this.levelModule.parallaxBackground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "parallax_alexs_house");
    this.levelModule.parallaxBackground.fixedToCamera = true;
    this.levelModule.createLayer('background');
};

Game.State.Intro_AlexsHouse.prototype.createForegroundLayers = function() {
    // var gameWidth = this.game.width,
    //     gameHeight = this.game.height;

    this.levelModule.createLayer('foreground');

    // this.textElts.forEach(function (elt) {
    //     var txtElt = this.game.add.text(0, 0, elt.text, { font: elt.size + 'px silkscreennormal', align: 'center', fill: elt.color} );
    //     txtElt.fixedToCamera = true;

    //     if (elt.position === 'br') {
    //         txtElt.cameraOffset.x = gameWidth - txtElt.width - 20;
    //         txtElt.cameraOffset.y = gameHeight - txtElt.height - 10;

    //     } else if (elt.position === 'bl') {
    //         txtElt.cameraOffset.x = 20;
    //         txtElt.cameraOffset.y = gameHeight - txtElt.height - 10;
    //     }

    //     this[elt.id] = txtElt;
    //     this[elt.id].getAlpha = elt.alpha;
    // }.bind(this));
};

Game.State.Intro_AlexsHouse.prototype.updateState = function() {
    // var viewCentre = this.game.width / 2 - this.world.x;

    // this.textElts.forEach(function (elt) {
    //     this[elt.id].alpha = elt.alpha(viewCentre);
    // }.bind(this));
};
