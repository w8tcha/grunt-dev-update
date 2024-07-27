/*
 * grunt-dev-update
 *
 * Copyright (c) Gilad Peleg
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        },

        devUpdate: {
            main: {
                options: {
                    //just report
                    updateType: 'force',
                    //stick to semver matching in packages
                    semver: false,
                    //don't report ok packages by default
                    reportUpdated: false,
                    //what packages to check
                    packages: {
                        //only devDependencies by default
                        devDependencies: true,
                        dependencies: true
                    },
                    //by default - use matchdep default findup to locate package.json
                    packageJson: null
                }
            }
        }
    });

    // load all npm grunt tasks
    require('load-grunt-tasks')(grunt);

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'devUpdate']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
