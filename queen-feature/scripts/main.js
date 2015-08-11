/* global Phaser */
'use strict';

var Game = {};

// Setup our namespaces and resource lists.
Game = {};
Game.State = {};
Game.Map = {};
Game.Map.Object = {};

Game.Map.MAPS = [
    'tutorial',
    'decade_50s',
    'decade_2010s'
];

Game.main = function() {
    var game = new Phaser.Game(568, 320, Phaser.AUTO, 'main');

    game.storage = new Game.Storage('skynews-queen-feature-game');
    game.score = new Game.Score(game);

    game.state.add('startup', Game.State.Startup);
    game.state.add('preloader', Game.State.Preloader);
    game.state.add('tutorial', Game.State.Tutorial);
    game.state.add('intro_50s', Game.State.intro_50s);
    game.state.add('decade_50s', Game.State.decade_50s);
    game.state.add('decade_2010s', Game.State.decade_2010s);
    game.state.add('playvideo', Game.State.PlayVideo);

    game.state.start('startup');
    this.gameObj = game;
};

window.onload = function() {
    Game.main();
};