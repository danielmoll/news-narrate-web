'use strict';

var FACTOID_TEXT_PADDING = 10;

Game.Map.Object.Factoid = function(game, textItem) {
	this.game = game;
	this.text = new Phaser.Text(game, 0, 0, textItem.properties.text, { font: '20px silkscreennormal', wordWrap: true, wordWrapWidth: (32 * textItem.properties.tiles), align: 'center'} );
	this.bg = game.add.sprite(textItem.x, textItem.y, this._getBackground());

    this.bg.anchor.set(0.5, 0.5);
    this.text.anchor.set(0.5, 0.5);

    this.bg.visible = false;	

    // this.bg.add(this.bg);
    this.bg.addChild(this.text);

    this.emitter = game.add.emitter(textItem.x, textItem.y, 100);

    this.emitter.makeParticles(['sparkle1', 'sparkle2', 'sparkle3']);
    this.emitter.width = this.text.width;
    this.emitter.height = this.text.height;
    this.emitter.minParticleSpeed.setTo(-50, -50);
    this.emitter.maxParticleSpeed.setTo(50, 50);
    this.emitter.gravity = -600;
    this.emitter.alpha = 0.5;
    this.emitter.minParticleAlpha = 0.7;
    this.emitter.maxParticleAlpha = 1;
    this.emitter.minParticleScale = 0.5;
    this.emitter.maxParticleScale = 1.5;
    // this.bg.addChild(this.emitter);

    // this.emitter.start(false, 1000, 100);
    this.emitter.start(true);
};

Game.Map.Object.Factoid.prototype.reveal = function() {
	this.bg.visible = true;
    this.bg.scale.x = 0.5;
    this.bg.scale.y = 0.5;
    this.bg.alpha = 0;

    this.game.add.tween(this.bg.scale).to( { x: 1 }, 1000, Phaser.Easing.Bounce.Out, true);
    this.game.add.tween(this.bg.scale).to( { y: 1 }, 750, Phaser.Easing.Bounce.Out, true);
    this.game.add.tween(this.bg).to( { alpha : 0.8 }, 1000, Phaser.Easing.Linear.None, true);

    this.emitter.explode(1000, 100);
}

Game.Map.Object.Factoid.prototype._getBackground = function() {
	var width = this.text.width+ 5 + (FACTOID_TEXT_PADDING * 2),
		height = this.text.height + (FACTOID_TEXT_PADDING * 2),
		bmd = this.game.add.bitmapData(width, height);
	 
	bmd.ctx.beginPath();
	bmd.ctx.rect(0, 0, width, height);
	bmd.ctx.fillStyle = '#ffffff';
	bmd.ctx.strokeStyle = '#000000';
	bmd.ctx.lineWidth = 5;

	bmd.ctx.fill();
	bmd.ctx.stroke();



	return bmd;
}