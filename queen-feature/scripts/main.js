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

Game.main = function() {
    var game = new Phaser.Game(568, 320, Phaser.AUTO, 'main');

    game.state.add('startup', Game.State.Startup);
    game.state.add('preloader', Game.State.Preloader);
    game.state.add('game', Game.State.Game);
    game.state.add('playvideo', Game.State.PlayVideo);


    game.state.start('startup');
};

window.onload = function() {
    Game.main();
};