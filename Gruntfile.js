module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    httptrap: {
      // configurable paths
      client: 'client',
      server: 'server',
      dist: 'dist'
    },
    bower: {
      install: {
        options: {
          targetDir: 'tmp/grunt'
        }
      }
    },
    ngtemplates:  {
      app:        {
        cwd:      'client/templates',
        src:      '**/*.html',
        dest:     'tmp/grunt/templates.js',
        options:  {
          module: 'httptrap.templates'
        }
      }
    },
    concat: {
      dist: {
        'src': [
          'tmp/grunt/jquery/jquery.js',
          'tmp/grunt/sass-bootstrap/bootstrap.js',
          'tmp/grunt/angular/angular.js',
          'tmp/grunt/angular-bootstrap/ui-bootstrap-tpls.js',
          'tmp/grunt/lodash/lodash.compat.js',
          'tmp/grunt/restangular/restangular.js',
          'client/javascripts/app.js',
          'tmp/grunt/templates.js',
          'client/javascripts/controllers/**/*.js',
          'client/javascripts/directives/**/*.js',
          'client/javascripts/services/**/*.js'
        ],
        'dest': '<%= httptrap.dist %>/js/app.js'
      }
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            flatten: true,
            dest: '<%= httptrap.dist %>/fonts',
            src: [
              'tmp/grunt/sass-bootstrap/glyphicons-*'
            ]
          },
          {
            src: ['<%= httptrap.client %>/index.html'],
            dest: '<%= httptrap.dist %>/index.html'
          }
        ]
      }
    },

    sass: {
      dist: {
        options: {
          includePaths: ['bower_components/sass-bootstrap/lib/']
        },
        files: {
          '<%= httptrap.dist %>/css/app.css': 'client/stylesheets/main.scss'
        }
      }
    },

    useminPrepare: {
      html: '<%= httptrap.client %>/index.html',
      options: {
        dest: '<%= httptrap.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= httptrap.dist %>/{,*/}*.html'],
      css: ['<%= httptrap.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= httptrap.dist %>']
      }
    },

    express: {
      options: {
        // Override defaults here
        port: 5000
      },
      dev: {
        options: {
          script: 'app.js'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['client/javascripts/**/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false
        }
      },
      stylesheets: {
        files: ['client/stylesheets/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      templates: {
        files: ['client/templates/**/*.html'],
        tasks: ['ngtemplates', 'concat'],
        options: {
          spawn: false
        }
      },
      express: {
        files: ['app.js', 'server/**/*.js'],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['bower:install', 'useminPrepare', 'ngtemplates', 'concat', 'sass', 'copy:dist']);

  grunt.registerTask('serve', ['default', 'express:dev', 'watch' ]);
};