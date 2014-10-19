module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodewebkit: {
            options: {
                platforms: ['linux64'],
                buildDir: './webkitbuilds',
            },
            src: ['./package.json', './credits.txt', './src/**/*']
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', '!src/js/phaser.min.js']
        }
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-jshint');
};

