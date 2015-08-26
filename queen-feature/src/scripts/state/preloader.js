/* global Phaser, Game */
'use strict';

Game.State.Preloader = function() {};
Game.State.Preloader.prototype = {
    preload: function() {
        this.stage.backgroundColor = '#000000';

        // loading screen
        this.add.sprite(195, 138, 'crown');

        // Adding the 'loading text'
        this.textGroup = this.game.add.group();
        this.textGroup.fixedToCamera = true;
        this.textGroup.add(new Phaser.BitmapText(this.game, this.game.width / 2 - 50, this.game.height / 2 - 15, 'pixeltype', 'Loading...', 40));

        // Intro Sky News report
        this.game.load.image('intro_ticker', 'assets/sprites/intro-ticker.png');
        this.game.load.image('kay', 'assets/sprites/kayburley.png');

        // Intro Alex's house
        this.game.load.image('parallax_alexs_house', 'assets/tiles/parallax_alexs_house.png');
        this.game.load.image('alexs_house', 'assets/sprites/alexshouse.png');
        this.game.load.image('alexs_time_machine', 'assets/sprites/alexs_time_machine.png');

        // Load our sprites
        this.load.spritesheet('player', 'assets/sprites/alex-sprite.png', 44, 64, 8);
        this.load.spritesheet('next_button', 'assets/sprites/next_button.png', 100, 30);
        this.game.load.image('navigation_bg', 'assets/sprites/navigation.png');
        this.game.load.image('sparkle1', 'assets/sprites/sparkle1.png');
        this.game.load.image('sparkle2', 'assets/sprites/sparkle2.png');
        this.game.load.image('sparkle3', 'assets/sprites/sparkle3.png');
        this.game.load.image('transparent_32-160', 'assets/sprites/transparent_32-160.png');
        this.game.load.image('jewel', 'assets/sprites/jewel.png');
        this.game.load.image('jewel_grey', 'assets/sprites/jewel_grey.png');
        this.game.load.image('corgi', 'assets/sprites/corgi.png');
        this.game.load.image('corgi_grey', 'assets/sprites/corgi_grey.png');
        this.game.load.image('crown_grey', 'assets/sprites/crown_grey.png');

        // 50s assets
        this.game.load.image('tv', 'assets/sprites/50s_tv.png');
        this.game.load.image('tv_grey', 'assets/sprites/50s_tv_grey.png');
        this.game.load.image('record', 'assets/sprites/50s_record.png');
        this.game.load.image('record_grey', 'assets/sprites/50s_record_grey.png');
        this.game.load.image('mini', 'assets/sprites/50s_mini.png');
        this.game.load.image('mini_grey', 'assets/sprites/50s_mini_grey.png');
        this.game.load.image('parallax_1950s', 'assets/tiles/parallax_1950s.png');

        // 60s assets
        this.game.load.image('beatles', 'assets/sprites/60s_beatles.png');
        this.game.load.image('beatles_grey', 'assets/sprites/60s_beatles_grey.png');
        this.game.load.image('worldcup', 'assets/sprites/60s_worldcup.png');
        this.game.load.image('worldcup_grey', 'assets/sprites/60s_worldcup_grey.png');
        this.game.load.image('the_sun', 'assets/sprites/60s_the_sun.png');
        this.game.load.image('the_sun_grey', 'assets/sprites/60s_the_sun_grey.png');
        this.game.load.image('parallax_1960s', 'assets/tiles/parallax_1960s.png');

        // 70s assets
        this.game.load.image('parallax_1970s', 'assets/tiles/parallax_1970s.png');
        this.game.load.image('sex_pistols', 'assets/sprites/70s_sex_pistols.png');
        this.game.load.image('sex_pistols_grey', 'assets/sprites/70s_sex_pistols_grey.png');
        this.game.load.image('maggie', 'assets/sprites/70s_maggie.png');
        this.game.load.image('maggie_grey', 'assets/sprites/70s_maggie_grey.png');
        this.game.load.image('starwars', 'assets/sprites/70s_starwars.png');
        this.game.load.image('starwars_grey', 'assets/sprites/70s_starwars_grey.png');

        // 00s assets
        this.game.load.image('ipod', 'assets/sprites/2000s_ipod.png');
        this.game.load.image('ipod_grey', 'assets/sprites/2000s_ipod_grey.png');
        this.game.load.image('idol', 'assets/sprites/2000s_pop_idol.png');
        this.game.load.image('idol_grey', 'assets/sprites/2000s_pop_idol_grey.png');
        this.game.load.image('dome', 'assets/sprites/2000s_dome.png');
        this.game.load.image('dome_grey', 'assets/sprites/2000s_dome_grey.png');

        // 80s assets
        this.game.load.image('parallax_1980s', 'assets/tiles/parallax_1980s.png');
        this.game.load.image('live_aid', 'assets/sprites/80s_live_aid.png');
        this.game.load.image('live_aid_grey', 'assets/sprites/80s_live_aid_grey.png');
        this.game.load.image('charles_diana', 'assets/sprites/80s_charles_diana.png');
        this.game.load.image('charles_diana_grey', 'assets/sprites/80s_charles_diana_grey.png');
        this.game.load.image('mobile_phone', 'assets/sprites/80s_mobile_phone.png');
        this.game.load.image('mobile_phone_grey', 'assets/sprites/80s_mobile_phone_grey.png');

        // 90s assets
        this.game.load.image('parallax_1990s', 'assets/tiles/parallax_1990s.png');
        this.game.load.image('web', 'assets/sprites/90s_web.png');
        this.game.load.image('web_grey', 'assets/sprites/90s_web_grey.png');
        this.game.load.image('spice', 'assets/sprites/90s_spice.png');
        this.game.load.image('spice_grey', 'assets/sprites/90s_spice_grey.png');
        this.game.load.image('harry', 'assets/sprites/90s_harry.png');
        this.game.load.image('harry_grey', 'assets/sprites/90s_harry_grey.png');

        // In-game menu
        this.load.atlas('menu_buttons', 'assets/sprites/menu_buttons.png', 'assets/sprites/menu_buttons.json');
        this.game.load.image('pause', 'assets/sprites/pause.png');
        this.game.load.image('alex_pause', 'assets/sprites/alex_pause.png');

        // Common
        this.load.image('next_level', 'assets/sprites/alexs_time_machine.png');

        // Get some audio up in this shit.
        // this.load.audio('doorOpen_1', 'res/audio/doorOpen_1.ogg');
        // this.load.audio('doorClose_4', 'res/audio/doorClose_4.ogg');

        // Load all of our maps and their components.
        this.loadTileMaps();
    },

    // Many of the maps use the same tile images. We create a map of all these images
    // so that we only load them once.
    loadTileMaps: function() {
        var tileSetMap = {},
            key,
            i;

        for (i = 0; i < Game.Map.MAPS.length; i++) {
            this.addTileSets(Game.Map.MAPS[i], tileSetMap);
        }

        for (key in tileSetMap) {
            if (tileSetMap.hasOwnProperty(key)) {
                this.load.image(key, tileSetMap[key]);
            }
        }
    },

    addTileSets: function(mapKey, tileSetMap) {
        var tileSets = this.cache.getTilemapData(mapKey).data.tilesets,
            value,
            key,
            i;

        for (i = 0; i < tileSets.length; i++) {
            key = tileSets[i].name;
            value = 'assets/maps/' + tileSets[i].image;
            if (key in tileSetMap) continue;
            tileSetMap[key] = value;
        }
    },

    create: function() {
        setTimeout(function() {
            this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
            this.game.state.start('intro_skynews');
            }.bind(this));
        }.bind(this), 500);
    }
};
