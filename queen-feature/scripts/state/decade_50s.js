/* global Game */
'use strict';

Game.State.Decade_50s = function() {};
Game.State.Decade_50s.prototype = Game.State.BaseState.prototype;
Game.State.Decade_50s.prototype.levelKey = 'decade_50s';
Game.State.Decade_50s.prototype.nextLevelKey = 'decade_2010s';

Game.State.Decade_50s.prototype.createState = function() {
    
    this.mapBackground.tilemap.setCollisionBetween(76, 84);
    this.banisterLayer = this.mapBackground.createLayer('banisters');
    this.columnLayer = this.mapBackground.createLayer('columns');

    this.collectibleItems.forEach(function(item) {
        if (item && item.properties && item.properties.sprite_key === 'crown') {
            var emitter = this.game.add.emitter(item.x + 16, item.y + 16, 10);
            this.crownSparkleEmitter = emitter;
            emitter.makeParticles(['sparkle1', 'sparkle2', 'sparkle3']);
            emitter.minParticleSpeed.setTo(-50, -50);
            emitter.maxParticleSpeed.setTo(50, 50);
            emitter.gravity = -600;
            emitter.alpha = 0.5;
            emitter.minParticleAlpha = 0.7;
            emitter.maxParticleAlpha = 1;
            emitter.minParticleScale = 0.5;
            emitter.maxParticleScale = 1.5;

            emitter.start(false, 1000, 100);
        }
    }.bind(this));
};

Game.State.Decade_50s.prototype.updateState = function() {
    // Text group movement update.
    this.parallaxTextGroup.x = this.game.world.x * this.TEXT_PARALLAX_SCALE;
    this.parallaxTextGroup.y = this.game.world.y * this.TEXT_PARALLAX_SCALE;
};

Game.State.Decade_50s.prototype.itemCollectedHandler = function(collectible) {
    if (collectible && collectible.properties && collectible.properties.sprite_key === 'crown') {
        this.crownSparkleEmitter.on = false;
    }
};