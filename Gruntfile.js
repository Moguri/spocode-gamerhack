module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodewebkit: {
            options: {
                platforms: ['linux64'],
                buildDir: './webkitbuilds',
            },
            src: ['./package.json', './credits.txt', './dist/**/*']
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', '!src/js/phaser.min.js']
        },
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/js/spocode.min.js': ['src/js/**/*.js', '!src/js/phaser.min.js']
                }
            }
        },
        copy: {
            levels: {
                expand: true,
                cwd: 'src/levels',
                src: '*',
                dest: 'dist/levels/'
            },
            assets: {
                expand: true,
                cwd: 'src/assets/',
                src: '*',
                dest: 'dist/assets/'
            },
            scripts: {
                expand: true,
                cwd: 'src/js/',
                src: ['phaser.min.js', 'phaser.map'],
                dest: 'dist/js/'
            },
            html: {
                expand: true,
                cwd: 'src/',
                src: 'index.html',
                dest: 'dist/'
            }
        },
        watch: {
            scripts: {
                files: 'src/**/*.js',
                tasks: ['jshint', 'uglify']
            },
            levels: {
                files: '<%= copy.levels.cwd %>/<%= copy.levels.src %>',
                tasks: ['copy:levels']
            },
            assets: {
                files: '<%= copy.assets.cwd %>/<%= copy.assets.src %>',
                tasks: ['copy:assets']
            },
            html: {
                files: '<<%= copy.assets.cwd %>/%= copy.html.src %>',
                tasks: ['copy:html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['copy', 'jshint', 'uglify']);
};

