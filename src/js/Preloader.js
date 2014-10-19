SpocodeGame.Preloader = function(game) {
    this.ready = false;
}

SpocodeGame.Preloader.prototype = {
    preload: function() {
        this.add.text(200, 200, "Loading");

        // Load the assets we need for the game

        this.load.image('tileset', 'assets/tiles.png');
        this.load.tilemap('map', 'levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet('player', 'assets/player.png', 64, 64, 72);
        this.load.spritesheet('coin', 'assets/coin.png', 40, 43, 4);
        this.load.audio('the_complex', 'assets/The Complex.ogg');
        this.load.audio('coinfx', 'assets/completetask.ogg');

        if (SpocodeGame.FORCE_BUTTONS || !this.game.device.desktop) {
            // Button UI
            this.load.spritesheet('button-a', 'assets/button_a.png');
            this.load.spritesheet('button-b', 'assets/button_b.png');
            this.load.spritesheet('button-left', 'assets/button_left.png');
            this.load.spritesheet('button-right', 'assets/button_right.png');
        }
    },

    create: function() {
        this.state.start('Game');
    }
};
