/*
 * grunt-funky-browserify
 * https://github.com/davemedema/grunt-funky-browserify
 *
 * Copyright (c) 2013 Dave Medema
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Config
  // ---

  grunt.initConfig({

    // package.json
    pkg: grunt.file.readJSON('package.json'),

    // `clean`
    clean: {
      all: ['tmp']
    },

    // `funky_browserify`
    funky_browserify: {
      test: {
        options: {
          entryFile: 'test/fixtures/app/app.js',
          modulesDir: 'test/fixtures/modules'
        },
        src: [
          'test/fixtures/libs/foo.js',
          'test/fixtures/libs/bar.js'
        ],
        dest: 'tmp/test.js'
      }
    },

    // `jshint`
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ]
    },

    // `nodeunit`
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Load tasks
  // ---

  grunt.loadTasks('tasks');

  // npm tasks
  // ---

  require('load-grunt-tasks')(grunt);

  // Task aliases
  // ---

  grunt.registerTask('default', ['test']);

  grunt.registerTask('release', function(type) {
    grunt.task.run('test');
    grunt.task.run('funky_bump:' + (type || 'patch'));
    grunt.task.run('funky_tag');
  });

  grunt.registerTask('test', ['clean', 'jshint', 'funky_browserify', 'nodeunit']);
  grunt.registerTask('t', ['test']);

};
