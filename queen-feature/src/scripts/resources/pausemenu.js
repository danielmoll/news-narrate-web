Game.PauseMenu = function(game) {
  this.game = game;
  this.addPauseButton();
}

Game.PauseMenu.prototype.addPauseButton = function() {
    this.pauseButton = this.game.add.image(10, 10, 'pause');
    this.pauseButton.fixedToCamera = true;
    this.pauseButton.inputEnabled = true;
    this.pauseButton.events.onInputUp.add(this.showPauseMenu, this);
    this.drawMenu();

    this.game.input.onDown.add(this.handleUnPause, this);
}

Game.PauseMenu.prototype.drawMenu = function() {
    this.menuGroup = new Phaser.Group(this.game)
    this.menuGroup.visible = false;
    var bg = this.game.add.graphics(0, 0);
    bg.fixedToCamera = true;
    bg.beginFill(0X000, 0.8);
    bg.drawRect(this.game.camera.x + 20, this.game.camera.y + 20, this.game.width - 40, this.game.height - 40);
    bg.endFill();
    this.menuGroup.addChild(bg);

    var pauseText = new Phaser.Text(this.game, 240, 40, "Paused", {font: 'helvetica', fontSize: 18, fill: '#ffffff'});
    pauseText.fixedToCamera = true;
    this.menuGroup.add(pauseText);

    this.timeMachineButton = new Phaser.Image(this.game, 40, 80, 'time_machine_button');
    this.timeMachineButton.fixedToCamera = true;
    this.menuGroup.add(this.timeMachineButton);
}

Game.PauseMenu.prototype.didHitElement = function(element) {
    var x = this.game.input.x;
    var y = this.game.input.y;

    var elementX = element.x - this.game.camera.x;
    var elementY = element.y - this.game.camera.y;

    if ( x >= elementX &&
         x <= (elementX + element.width) &&
         y >= elementY &&
         y <= (elementY + element.height)) {
      return true;
    }
    return false;
}

Game.PauseMenu.prototype.handleUnPause = function() {
    if (this.game.paused) {
        this.game.paused = false;

        if (this.didHitElement(this.timeMachineButton)) {
            this.game.state.start('navigation');
          } else {
            this.pauseButton.visible = true;
            this.menuGroup.visible = false;
        }
    }
}

Game.PauseMenu.prototype.showPauseMenu = function() {
    this.game.paused = true;
    this.pauseButton.visible = false;
    this.menuGroup.visible = true;
}
