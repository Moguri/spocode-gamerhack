SpocodeGame.EndGame = function(game) {
    this.endkey;
    this.msg;
}

SpocodeGame.EndGame.prototype = {
    create: function() {
        if (this.game.device.desktop) {
            this.msg = this.add.text(200, 200, "All scrap collected, press enter to restart.");
        }
        else {
            this.msg = this.add.text(200, 200, "All scrap collected, tap the screen to restart.");
        }

        this.endkey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.input.onDown.add(this.mouse, this);
    },

    mouse: function() {
        this.state.start('Game');
    },

    update: function() {
        if (this.endkey.isDown) {
            this.state.start('Game');
        }
    },

    shutdown: function() {
        this.msg.destroy();
    }
};

