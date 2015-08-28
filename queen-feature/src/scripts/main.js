/* global Phaser */
'use strict';

var html = document.querySelector('html'),
    detectedFeatures = [],
    detectedFeaturesMap = {},
    Game = {},
    tests = {},
    result;

tests.touch = function() {
    return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
};

for (var test in tests) {
    result = tests[test]();
    detectedFeatures.push(result ? test : 'no-' + test);
    detectedFeaturesMap[result ? test : 'no-' + test] = true;
}

detectedFeatures.forEach(function(feature) {
    html.classList.add(feature);
});

window.detect = detectedFeaturesMap;

// Setup our namespaces and resource lists.
Game = {};

Game.State = {};
Game.Map = {};
Game.Map.Object = {};
Game.Score = {
    totalArtefacts: 0,
    artefactsCollected: 0,
    allArtefactsCollected: false,
    levelScores: {},
    allCollected: function() {
        return this.allArtefactsCollected;
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
    },
    init: function(game) {

        this.game = game;

        Game.Levels.forEach(function(level) {

            var levelKey = level.stateKey,
                levelState = this.game.storage.get(levelKey);

            if (levelKey === null) return;

            if (levelState) {
                this.levelScores[levelKey] = levelState;
                this.artefactsCollected += levelState.artefactsCollected;
            }
            else {
                this.levelScores[levelKey] = { scoredItems: {}, score: 0, artefactsCollected: 0 };
            }

            level.collectibles.forEach(function(collectible) {
                if(collectible !== '.') {
                    this.totalArtefacts ++;
                }
            }.bind(this));

        }.bind(this));

        if (this.artefactsCollected === this.totalArtefacts) {
            this.allArtefactsCollected = true;
        }
    },
    artefactCollected: function(level, artefact) {
        if (level !== 'alexs_house') {
            if (!this.levelScores[level].scoredItems[artefact]) {
                this.levelScores[level].scoredItems[artefact] = true;
                this.levelScores[level].artefactsCollected ++;
                this.artefactsCollected ++;
            }

            if (this.artefactsCollected === this.totalArtefacts) {
                this.allArtefactsCollected = true;
            }

            this.save();
        }
    },
    updateScore: function(level, score) {
        if (level !== 'alexs_house') {
            if (this.levelScores[level].score < score ) {
              this.levelScores[level].score = score;
              this.save();
            }
        }
    },
    save: function() {
        Game.Levels.forEach(function(level) {
            this.game.storage.set(level.stateKey, this.levelScores[level.stateKey]);
        }.bind(this));
    },
    resetAll: function() {
        Game.Levels.forEach(function(level) {
            var levelKey = level.stateKey;
            this.levelScores[levelKey] = { scoredItems: {}, score: 0, artefactsCollected: 0 };
        }.bind(this));

        this.allArtefactsCollected = false;
        this.artefactsCollected = 0;

        this.save();
    }
};


Game.SoundControls = {

    init: function(game) {
        this.game = game;

        this.musicEnabled = this.game.storage.get('music') || 1;
        this.soundEnabled = this.game.storage.get('sound') || 1;
    },

    toggleMusic: function () {
        this.musicEnabled = !this.musicEnabled;
    },

    toggleSound: function () {
        this.soundEnabled = !this.soundEnabled;
        this.game.sound.mute = !this.soundEnabled;
    }
};

Game.Map.MAPS = [
    'alexs_house',
    'decade_50s',
    'decade_60s',
    'decade_70s',
    'decade_80s',
    'decade_90s',
    'decade_00s',
    'decade_now'
];

Game.Levels = [
    { text: '50', stateKey: 'decade_50s', collectibles: ['record', 'tv', 'mini']},
    { text: '60', stateKey: 'decade_60s', collectibles: ['beatles', 'the_sun', 'worldcup']},
    { text: '70', stateKey: 'decade_70s', collectibles: ['sex_pistols', 'starwars', 'maggie']},
    { text: '80', stateKey: 'decade_80s', collectibles: ['charles_diana', 'live_aid', 'mobile_phone']},
    { text: '90', stateKey: 'decade_90s' , collectibles: ['web', 'harry', 'spice']},
    { text: '00', stateKey: 'decade_00s', collectibles: ['dome', 'ipod', 'idol']},
    { text: 'NOW', stateKey: 'decade_now', collectibles: ['olympics', 'selfie', '1d']}
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
    game.state.add('decade_50s', Game.State.Decade_50s);
    game.state.add('decade_60s', Game.State.Decade_60s);
    game.state.add('decade_70s', Game.State.Decade_70s);
    game.state.add('decade_80s', Game.State.Decade_80s);
    game.state.add('decade_90s', Game.State.Decade_90s);
    game.state.add('decade_00s', Game.State.Decade_00s);
    game.state.add('decade_now', Game.State.Decade_Now);
    game.state.add('end_screen', Game.State.EndScreen);
    game.state.add('outro_skynews', Game.State.Outro_Skynews);
    game.state.add('outro_credits', Game.State.Outro_Credits);
    game.state.add('outro_timemachine', Game.State.Outro_TimeMachine);

    this.SoundControls.init(this.game);
    this.Score.init(this.game);

    // Start our game.
    game.state.start('startup');
};

window.onload = function() {
    Game.init();
};
