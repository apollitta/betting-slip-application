module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Gruntfile.js', 'scripts/**/*.js']
        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            dev: {
                files: {
                    'scripts/magic.min.js': ['scripts/magic.js', 'scripts/magic2.js']
                }
            },
            production: {
                files: {
                    'scripts/js/magic.min.js': 'scripts/**/*.js'
                }
            }
        },

        // compile less stylesheets to css -----------------------------------------
        less: {
            build: {
                files: {
                    'css/pretty.css': 'css/pretty.less'
                }
            }
        },

        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'css/pretty.min.css': 'css/pretty.css'
                }
            }
        },

        // configure watch to auto update ----------------
        watch: {

            // for stylesheets, watch css and less files 
            // only run less and cssmin stylesheets: { 
            files: ['css//*.css', 'css//*.less'],
            tasks: ['less', 'cssmin']
        },

        // for scripts, run jshint and uglify 
        scripts: {
            files: 'css/**/*.js',
            tasks: ['jshint', 'uglify']
        },

        nodemon: {
            dev: {
                script: 'server.js'
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'less']);
    grunt.registerTask('dev', ['jshint', 'uglify:dev', 'cssmin', 'less']);
    grunt.registerTask('production', ['jshint', 'uglify:production', 'cssmin', 'less']);
    grunt.registerTask('run', ['nodemon']);

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');

};
