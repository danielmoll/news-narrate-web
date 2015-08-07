Game.State.intro_50s = function(game) {};
Game.State.intro_50s.prototype = {
    cursors: null,
    transitionning: false,

    fixedTextOverlays: [
        { text: "1950s", size: 200, x: 20, y: 20, alpha: 0.2 },
        { text: "Post-war Britain started the 1950s hard-up and hurting.\n\nFood rations were in place until 1954, there were unexploded bombs in the\rstreets, and Britain's international standing was shaken by the Suez crisis.\n\nBut by the end of the decade the UK had a new Queen, television sets,\rand rock n'roll.\n\nPrime Minister Harold MacMillan proclaimed 'most of\rour people have never had it so good'.", size: 16, x: 20, y: 20 }
    ],

    create: function () {
        this.transitionning = false;
        this.createState();
        this.game.fadePlugin.fadeIn(0x000, 750, 0);
    },

    createState: function() {
        var bg = this.game.add.graphics(0, 0);
        bg.beginFill(0X000, 1);
        bg.drawRect(this.game.camera.x, this.game.camera.y, this.game.width * 1.5, this.game.height * 1.5);
        bg.endFill();

        this.endTextGroup = this.game.add.group();
        this.endTextGroup.fixedToCamera = false;
        this.endTextGroup.alpha = 1;
        this.fixedTextOverlays.forEach(function(textItem) {
            // var txtElement = new Phaser.BitmapText(this.game, textItem.x, textItem.y, 'nokia', textItem.text, textItem.size);
            var txtElement = new Phaser.Text(this.game, textItem.x, textItem.y, textItem.text, { font: 'helvetica', fontSize: textItem.size, fill: '#ffffff'});
            txtElement.alpha = textItem.alpha || 1;
            this.endTextGroup.add(txtElement);
        }.bind(this));

        this.game.add.button(this.game.width - 120, this.game.height - 50, 'next_button', this.nextLevel, this);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    nextLevel: function () {
        if (!this.transitionning) {
            this.transitionning = true;
            this.game.fadePlugin.fadeOut(0x000, 750, 0, function() {
                this.game.state.start('decade_50s');
            });
        }
    }
};
