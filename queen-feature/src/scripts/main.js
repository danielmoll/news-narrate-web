/* global Phaser */
'use strict';

var Game = {};

// Setup our namespaces and resource lists.
Game = {
};

Game.State = {};
Game.Map = {};
Game.Map.Object = {};
Game.Score = {
    nbCollectibles: 0,
    nbCollected: 0,
    levelScores: {},
    allCollected: function() {
        return this.nbCollectibles === this.nbCollected;
    },
    getTotalScore: function() {
        var score = 0;

        Object.keys(this.levelScores).forEach(function (level) {
            var levelScore = this.levelScores[level];

            levelScore && levelScore.scoredItems && levelScore.scoredItems.forEach(function(ls) {
                score += parseInt(ls.score, 10);
            }.bind(this));
        }.bind(this));

        return score;
    }
};

Game.Map.MAPS = [
    'tutorial',
    'decade_50s',
    'decade_60s',
    'decade_70s',
    'decade_2010s'
];

Game.Levels = [
    { text: '50', stateKey: 'decade_50s', collectibles: ['record', 'tv', 'mini']},
    { text: '60', stateKey: 'decade_60s', collectibles: ['beatles', 'the_sun', 'worldcup']},
    { text: '70', stateKey: 'decade_70s', collectibles: ['sex_pistols', 'starwars', 'maggie']},
    { text: '80', stateKey: 'tutorial', collectibles: ['corgi', '.', '.']},
    { text: '90', stateKey: null, collectibles: ['.', '.', '.']},
    { text: '00', stateKey: null, collectibles: ['.', '.', '.']},
    { text: 'NOW', stateKey: 'decade_2010s', collectibles: ['corgi', 'crown', '.']}
];

Game.init = function() {
    var game = new Phaser.Game(568, 320, Phaser.AUTO, 'main', null, false, false);
    this.game = game;

    game.analytics = Game.Analytics;
    game.storage = new Game.Storage('skynews-queen-feature-game');

    game.state.add('startup', Game.State.Startup);
    game.state.add('preloader', Game.State.Preloader);
    game.state.add('intro_skynews', Game.State.Intro_Skynews);
    game.state.add('intro_alexs_house', Game.State.Intro_AlexsHouse);
    game.state.add('navigation', Game.State.Navigation);
    game.state.add('tutorial', Game.State.Tutorial);
    game.state.add('intro_50s', Game.State.Intro_50s);
    game.state.add('decade_50s', Game.State.Decade_50s);
    game.state.add('decade_60s', Game.State.Decade_60s);
    game.state.add('decade_70s', Game.State.Decade_70s);
    game.state.add('decade_2010s', Game.State.Decade_2010s);
    game.state.add('end_screen', Game.State.EndScreen);

    // Make sure we know the number of artefacts we can collect
    Game.Levels.forEach(function(level) {
        level.collectibles.forEach(function(collectible) {
            if(collectible !== '.') {
                this.Score.nbCollectibles++;
            }
        }.bind(this));
    }.bind(this));

    // Save in memory the artefacts already collected
    Game.getCollectedItems();

    // Start our game.
    game.state.start('startup');
};

Game.getCollectedItems = function() {
    this.Score.nbCollected = 0;
    
    Game.Levels.forEach(function (level) {
        var levelScore = this.game.storage.get(level.stateKey);
        
        levelScore && levelScore.scoredItems.forEach(function(ls) {
            if (ls.sprite_key !== 'jewel') {
                this.Score.nbCollected++;
            }
        }.bind(this));
        
        Game.Score.levelScores[level.stateKey] = levelScore;
    }.bind(this));
},

window.onload = function() {
    Game.init();
};
