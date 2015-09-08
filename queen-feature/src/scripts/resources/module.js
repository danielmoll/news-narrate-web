/* global Game */
'use strict';

Game.Map.Module = function(game, key) {
    this.game = game;
    this.tilemap = game.add.tilemap(key);
    // Add the tilesets
    for (var i = 0; i < this.tilemap.tilesets.length; i++) {
        this.tilemap.addTilesetImage(this.tilemap.tilesets[i].name);
    }
    this.layers = [];
};

Game.Map.Module.prototype = {
    // Pass through to the Phaser.TileMap createLayer function
    createLayer: function() {
        var layer = this.tilemap.createLayer.apply(this.tilemap, arguments);

        this.layers.push(layer);
        return layer;
    },

    // Expects strings for the layer names
    // Returns a map containing the layers
    createLayers: function() {
        var result = {},
            key,
            i;

        for (i = 0; i < arguments.length; i++) {
            key = arguments[i];
            result[key] = this.tilemap.createLayer(key);
        }
        return result;
    },

    // Searches the text layer for text elements to place
    findTextObjects: function() {
        var self = this,
            result = [];

        this.tilemap.objects.text && this.tilemap.objects.text.forEach(function(element) {
            // Phaser uses top left, Tiled bottom left so we have to adjust the y position
            // also keep in mind that the cup images are a bit smaller than the tile which is 16x16
            // so they might not be placed in the exact pixel position as in Tiled
            element.y -= self.tilemap.tileHeight;
            element.properties.text = element.properties.text.replace(/\\n/g,'\n').replace(/\\r/g,'\r');
            element.properties.size = element.properties.size || 20;
            result.push(element);
        });
        return result;
    },

    // Searches the text layer for text elements to place
    findCollectibleObjects: function() {
        var self = this,
            result = [];

        this.tilemap.objects.collectibles && this.tilemap.objects.collectibles.forEach(function(element) {
            // Phaser uses top left, Tiled bottom left so we have to adjust the y position
            // also keep in mind that the cup images are a bit smaller than the tile which is 16x16
            // so they might not be placed in the exact pixel position as in Tiled
            element.y -= self.tilemap.tileHeight;
            result.push(element);
        });
        return result;
    },

    // Searches the object layer for a specific type
    findObjectsByType: function(type) {
        var self = this,
            result = [];

        this.tilemap.objects.objects && this.tilemap.objects.objects.forEach(function(element) {
            if (element.type === type) {
                // Phaser uses top left, Tiled bottom left so we have to adjust the y position
                // also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                // so they might not be placed in the exact pixel position as in Tiled
                element.y -= self.tilemap.tileHeight;
                result.push(element);
            }
        });
        return result;
    },

    getCollisionSprites: function(layer, group, tileX, tileY) {
        tileX = tileX || 0;
        tileY = tileY || 0;

        var self = this,
            result = [],
            sprite;

        this.tilemap.objects[layer].forEach(function(element) {
            element.y -= self.tilemap.tileHeight;
            sprite = group.create(element.x + tileX*32, element.y + tileY*32);
            self.game.physics.arcade.enable(sprite);
            sprite.body.setSize(element.properties.width, element.properties.height);
            sprite.body.immovable = true;
            result.push(sprite);
        });
        return result;
    },

    spriteFromObject: function(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        // Copy all properties to the sprite
        sprite.properties = {};
        Object.keys(element.properties).forEach(function(key){
            sprite.properties[key] = element.properties[key];
        });

        return sprite;
    }
};
