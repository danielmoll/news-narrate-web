/* global Game, localStorage */
'use strict';

Game.Storage = function(name) {
    this.storageName = name || 'skynews-game';
    this.read();
};

Game.Storage.prototype.save = function () {
    localStorage.setItem(this.storageName, JSON.stringify(this.state));
};

Game.Storage.prototype.read = function () {
    this.state = JSON.parse(localStorage.getItem(this.storageName)) || {};
};

Game.Storage.prototype.set = function (key, value) {
    this.state[key] = value;
    this.save();
};

Game.Storage.prototype.get = function (key) {
    return this.state[key];
};