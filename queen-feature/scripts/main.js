Game.main = function() {
    var game = new Phaser.Game(1280, 720, Phaser.AUTO);

    game.state.add('startup', Game.State.Startup);
    game.state.add('preloader', Game.State.Preloader);
    game.state.add('game', Game.State.Game);
    game.state.start('startup');
};

window.onload = function() {
    Game.main();
};