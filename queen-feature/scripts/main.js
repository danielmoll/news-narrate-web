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

    game.analytics = Game.Analytics;

    game.storage = new Game.Storage('skynews-queen-feature-game');

    game.state.add('startup', Game.State.Startup);
    game.state.add('preloader', Game.State.Preloader);
    game.state.add('navigation', Game.State.Navigation);
    game.state.add('tutorial', Game.State.Tutorial);
    game.state.add('intro_50s', Game.State.Intro_50s);
    game.state.add('decade_50s', Game.State.Decade_50s);
    game.state.add('decade_2010s', Game.State.Decade_2010s);
    game.state.add('playvideo', Game.State.PlayVideo);
    game.state.add('intro_skynews', Game.State.Intro_Skynews);

    game.state.start('startup');
    this.gameObj = game;
};

window.onload = function() {
    Game.main();
};