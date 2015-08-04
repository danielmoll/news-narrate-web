Game.main = function() {
    var game = new Phaser.Game(568, 320, Phaser.AUTO,'main');

    game.state.add('startup', Game.State.Startup);
    game.state.add('preloader', Game.State.Preloader);
    game.state.add('game', Game.State.Game);
    game.state.start('startup');
};

window.onload = function() {
    Game.main();
};