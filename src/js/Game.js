SpocodeGame.Game = function(game) {
    this.player = null;
    this.layer = null;
    this.cursors = null;
    this.jump = null;
    this.score = null;
    this.coins = null;
    this.coin_fx = null;
    this.score_text = null;

    this.btn_left_down = false;
    this.btn_right_down = false;
    this.btn_a_down = false;
    this.btn_b_down = false;

    this.MOVE_SPEED = 200;
    this.GRAVITY = 1000;
    this.JUMP_SPEED = 400;
    this.UI_TEXT = "Scrap found: ";

    this.COIN_POS = [
        [1485, 400],
        [1620, 400],
        [930, 555],
        [2300, 400],
        [2200, 800],
        [1200, 800],
        [1630, 700]
    ];
}

SpocodeGame.Game.prototype = {
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = this.GRAVITY;
        this.stage.backgroundColor = "#666666";

        this.music = this.add.audio('the_complex', SpocodeGame.MUSIC_VOLUME, true);
        this.music.play();

        this.coinfx = this.add.audio('coinfx', SpocodeGame.SFX_VOLUME);

        var map = this.add.tilemap('map');
        map.addTilesetImage('Map', 'tileset');
        map.setCollisionBetween(210, 217); // Floor pieces
        map.setCollision([146, 147, 181, 182]); // Crates

        this.layer = map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();

        // Setup player
        this.player = this.add.sprite(100, 120, 'player');
        this.player.animations.add('walk', Phaser.Math.numberArray(4, 11));
        this.player.animations.add('idle', Phaser.Math.numberArray(0, 3));
        this.player.animations.add('jump', Phaser.Math.numberArray(43, 45));
        this.player.animations.add('airborne', Phaser.Math.numberArray(46, 47));
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.anchor.setTo(0.5, 1);
        this.player.body.width *= 0.5;
        this.player.body.maxVelocity.y = 500;
        this.camera.follow(this.player);

        // Place coins
        this.coins = this.add.group();
        for (var i = 0; i < this.COIN_POS.length; i++) {
            var coin = this.coins.create(this.COIN_POS[i][0], this.COIN_POS[i][1], 'coin');
            coin.animations.add('anim');
            coin.animations.play('anim', 4, true);
            this.physics.enable(coin, Phaser.Physics.ARCADE);
            coin.body.immovable = true;
            coin.body.allowGravity = false;
        }

        // Setup keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.jump = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //this.input.onDown.add(this.gofull, this);

        this.add.text(0, 0, "Find the scrap and repair the ship!");
        this.score_text = this.add.text(10, this.game.height - 50, this.UI_TEXT + "0/" + this.COIN_POS.length);
        this.score_text.fixedToCamera = true;

        if (SpocodeGame.FORCE_BUTTONS || !this.game.device.desktop) {
            self = this;
            // Button UI
           var btn_left = this.add.button(32, this.game.height / 2, 'button-left');
           btn_left.fixedToCamera = true;
           btn_left.onInputDown.add(function(){self.btn_left_down = true;});
           btn_left.onInputUp.add(function(){self.btn_left_down = false;});

           var btn_right = this.add.button(128, this.game.height / 2, 'button-right');
           btn_right.fixedToCamera = true;
           btn_right.onInputDown.add(function(){self.btn_right_down = true;});
           btn_right.onInputUp.add(function(){self.btn_right_down = false;});

           var btn_a = this.add.button(this.game.width - 96, this.game.height / 2, 'button-a');
           btn_a.fixedToCamera = true;
           btn_a.onInputDown.add(function(){self.btn_a_down = true;});
           btn_a.onInputUp.add(function(){self.btn_a_down = false;});
        }
    },

    gofull: function () {
        if (!this.scale.isFullScreen) {
            this.scale.startFullScreen(true);
        }
    },

    update: function() {
        var dt = this.time.elapsed;
        this.physics.arcade.collide(this.player, this.layer);
        this.player.body.velocity.x = 0;

        if ((this.jump.isDown || this.btn_a_down) && this.player.body.onFloor()) {
            this.player.animations.play('jump', 7);
            this.player.body.velocity.y = -this.JUMP_SPEED;
        }

        if (!this.player.body.onFloor())
            this.player.animations.play('airborne', 7, true);

        if (this.cursors.left.isDown || this.btn_left_down) {
            this.player.body.velocity.x = -this.MOVE_SPEED;
            this.player.scale.x = -1;
            if (this.player.body.onFloor())
                this.player.animations.play('walk', 15, true);
        }
        else if (this.cursors.right.isDown || this.btn_right_down) {
            this.player.body.velocity.x = this.MOVE_SPEED;
            this.player.scale.x = 1;
            if (this.player.body.onFloor())
                this.player.animations.play('walk', 15, true);
        }
        else if (this.player.body.onFloor()) {
            this.player.animations.play('idle', 7, true);
        }

        var self = this;
        this.physics.arcade.collide(this.player, this.coins, function(player_obj, coin_obj) {
            self.score++;
            self.coinfx.play();
            coin_obj.destroy();
            self.score_text.setText(self.UI_TEXT + self.score + "/" + self.COIN_POS.length);
        });

        if (this.score == this.COIN_POS.length)
            this.state.start('EndGame');
    },

    shutdown: function() {
        this.score = 0;
        this.music.stop();
        this.layer.destroy();
        this.player.destroy();
        this.coins.destroy();
    },

    render: function() {
        if (SpocodeGame.SHOW_FPS)
            this.game.debug.text("FPS: " + this.time.fps, 10, 24);
    },
};
