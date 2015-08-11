Game.PauseMenu = function(game) {
  this.game = game;
  this.addPauseButton();
}

Game.PauseMenu.prototype.addPauseButton = function() {
    this.pauseButton = this.game.add.sprite(10, 10, 'pause');
    this.pauseButton.fixedToCamera = true;
    this.pauseButton.inputEnabled = true;
    this.pauseButton.events.onInputUp.add(this.showPauseMenu, this);

    this.game.input.onDown.add(this.unPause, this);
}

Game.PauseMenu.prototype.unPause = function() {
    if (this.game.paused /* && this.notClickingOnAnyOfTheMenuItemButtons() */) {
      //this.hidePauseMenu();
      this.game.paused = false;
    }
}

Game.PauseMenu.prototype.showPauseMenu = function() {
    this.game.paused = true;
}
