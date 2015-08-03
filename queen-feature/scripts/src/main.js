var game = new Phaser.Game(568, 320, Phaser.AUTO, 'main', { preload: preload, create: create, update: update, render: render }),
	map,
	tileset,
	layer,
	p,
	cursors;

function preload() {
	game.load.tilemap('mario', 'assets/tilemaps/maps/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles', 'assets/tilemaps/tiles/super_mario.png');
	game.load.spritesheet('player', 'assets/sprites/queen-sprite.png', 32, 32, 6);
	game.load.bitmapFont('nokia', 'assets/fonts/bitmapFonts/nokia.png', 'assets/fonts/bitmapFonts/nokia.xml');

}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#787878';
    map = game.add.tilemap('mario');

    map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

    //  14 = ? block
    map.setCollisionBetween(14, 15);

    map.setCollisionBetween(15, 16);
    map.setCollisionBetween(20, 25);
    map.setCollisionBetween(27, 29);
    map.setCollision(40);
    // map.setCollision(11); // coin

    map.setTileIndexCallback(11, hitCoin, this);
    
    layer = map.createLayer('World1');

    //  Un-comment this on to see the collision tiles
    // layer.debug = true;

    layer.resizeWorld();

    p = game.add.sprite(32, 32, 'player');

    game.physics.enable(p);

    console.log(map);
   

    game.physics.arcade.gravity.y = 600;

    p.body.bounce.y = 0.2;
    p.body.linearDamping = 1;
    p.body.collideWorldBounds = true;

    game.camera.follow(p);

    cursors = game.input.keyboard.createCursorKeys();

    text1 = game.add.bitmapText(200, 20, 'nokia', '1953: The Coronation', 32);
    console.log(text1);
    // text1.scrollFactorX = 1.15;

    p.animations.add('left', [0, 1], 10, true);
    p.animations.add('right', [3,4], 10, true);
}

function hitCoin(sprite, tile) {
	// console.log(tile);
    tile.index = 1;
    layer.dirty = true;
    // return true;
}
function update() {

	text1.x = (-layer.x / 4) + 100;

    game.physics.arcade.collide(p, layer);
    if (cursors.up.isDown)
    {
        if (p.body.onFloor())
        {
            p.body.velocity.y = -200;
        }
    }

    if (cursors.left.isDown)
    {
        p.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        p.body.velocity.x = 150;
    }

    if (game.input.activePointer.isDown)
    {
       if (game.input.activePointer.x < 284) {
       		p.body.velocity.x = -150;
       		p.animations.play('left', 5, true);
       }
       else {
       		p.body.velocity.x = 150;
       		p.animations.play('right', 5, true);

       }

       if (p.body.onFloor())
        {
            p.body.velocity.y = -300;
        }
    }

    if (p.body.velocity.x === 0) {
    	p.animations.stop();
    }

}

function render() {

    game.debug.bodyInfo(p, 32, 320);

}