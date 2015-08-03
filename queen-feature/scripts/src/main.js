var game = new Phaser.Game(568, 320, Phaser.AUTO, 'main', { preload: preload, create: create, update: update, render: render }),
	map,
	tileset,
	layer,
	p,
	cursors;

function preload() {
	game.load.tilemap('mario', 'assets/tilemaps/maps/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles', 'assets/tilemaps/tiles/super_mario.png');
	game.load.image('player', 'assets/sprites/phaser-dude.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#787878';
    map = game.add.tilemap('mario');

    map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

    //  14 = ? block
    // map.setCollisionBetween(14, 15);

    map.setCollisionBetween(15, 16);
    map.setCollisionBetween(20, 25);
    map.setCollisionBetween(27, 29);
    map.setCollision(40);
    
    layer = map.createLayer('World1');

    //  Un-comment this on to see the collision tiles
    // layer.debug = true;

    layer.resizeWorld();

    p = game.add.sprite(32, 32, 'player');

    game.physics.enable(p);
   

    game.physics.arcade.gravity.y = 600;

    p.body.bounce.y = 0.2;
    p.body.linearDamping = 1;
    p.body.collideWorldBounds = true;

    game.camera.follow(p);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {

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
       }
       else {
       		p.body.velocity.x = 150;
       }

       if (p.body.onFloor())
        {
            p.body.velocity.y = -300;
        }
    }

}

function render() {

    game.debug.bodyInfo(p, 32, 320);

}