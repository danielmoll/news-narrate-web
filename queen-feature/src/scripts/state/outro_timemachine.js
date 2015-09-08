/* global Phaser, Game */
'use strict';


Game.State.Outro_TimeMachine = function() {};
Game.State.Outro_TimeMachine.prototype = {
	create: function () {
		this.game.world.width = this.game.width;
		this.game.world.height = this.game.height;

		this.player = this.game.add.sprite(-32, this.game.world.centerY, 'player');
		this.player.animations.add('right', [6,7,6,5], 6, true);
		this.player.animations.play('right');
		this.player.anchor.set(0.5, 0.5);
		this.timeMachine = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 16, 'assets');
        this.timeMachine.frameName = 'alexs_time_machine.png';
		this.timeMachine.anchor.set(0.5, 0.5);

		this.game.add.tween(this.player).to({ x: this.game.world.centerX }, 2500, 'Linear', true).
			onComplete.add(this.disappear, this);

		this.game.sounds = {
            jump: this.game.add.audio('jump'),
            timemachine: this.game.add.audio('timemachine'),
            pop: this.game.add.audio('pop'),
            jewel: this.game.add.audio('jewel')
        };

		this.game.stage.backgroundColor = '#000';

		this.game.fadePlugin.fadeIn(0x000, 750, 0);
	},

	disappear: function() {
		var inTween, outTween, rotateTween, exploder;

        this.player.visible = false;

        inTween = this.game.add.tween(this.timeMachine.scale).to({ x: 2, y: 2 }, 500, Phaser.Easing.Cubic.InOut);
        outTween = this.game.add.tween(this.timeMachine.scale).to({ x: 0, y: 0}, 1500, Phaser.Easing.Cubic.In);
        rotateTween = this.game.add.tween(this.timeMachine).to({ angle: 360 }, 1500, Phaser.Easing.Cubic.In, true, 500);

        inTween.chain(outTween);

        this.game.sounds.timemachine.play();

        exploder = this.game.add.emitter(this.timeMachine.x, this.timeMachine.y, 100);

        exploder.makeParticles(['sparkle1', 'sparkle2', 'sparkle3']);
        exploder.minParticleSpeed.setTo(-200, -300);
        exploder.maxParticleSpeed.setTo(200, 50);
        exploder.alpha = 0.5;
        exploder.minParticleAlpha = 0.7;
        exploder.maxParticleAlpha = 1;
        exploder.minParticleScale = 0;
        exploder.maxParticleScale = 1.5;

        exploder.start(true);

        outTween.onComplete.add(function() {
            exploder.explode(2000, 100);
            this.game.sounds.pop.play();
            setTimeout(function() {
				this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
                	this.game.state.start('navigation');
				});
            }.bind(this), 500);
        }.bind(this));

        inTween.start();
	}

};
