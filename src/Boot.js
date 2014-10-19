var SpocodeGame = {
    FORCE_BUTTONS: false,
    MUSIC_VOLUME: 1.0,
    SFX_VOLUME: 1.0,
    SHOW_FPS: false
};

SpocodeGame.Boot = function(game) {
};

SpocodeGame.Boot.prototype = {
    init: function() {
        // disable multi-touch
        this.input.maxPointers = 2;

        // do not automatically pause if the browser tab loses focus
        this.stage.disableVisibilityChange = true;

        // resize renderer to match game dimensions
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.refresh();

        // need this to get timing data

        this.time.advancedTiming = true;
    },

    preload: function() {
        // Here we load the assets required for our preloader
    },

    create: function() {
        // By this point the preloader assets have been loaded to the cache, we've set the game settings
        // so now let's start the real preloader
        this.state.start('Preloader');
    }
};
