var Game = {};

// Setup our namespaces and resource lists.
Game = {};
Game.State = {};
Game.Map = {};
Game.Map.Object = {};

Game.Map.MAPS = [
    'tutorial',
    'decade_50s'

    // // Modules used in maps
    // 'house0_f0'
];

Game.main = function() {
    var game = new Phaser.Game(568, 320, Phaser.AUTO, 'main');

    game.state.add('startup', Game.State.Startup);
    game.state.add('preloader', Game.State.Preloader);
    game.state.add('tutorial', Game.State.Tutorial);
    game.state.add('intro_50s', Game.State.intro_50s);
    game.state.add('decade_50s', Game.State.decade_50s);
    game.state.add('playvideo', Game.State.PlayVideo);

    game.state.start('startup');
};

window.onload = function() {
    Game.main();
};