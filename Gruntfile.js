module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
          'tmp/grunt/underscore/underscore.js',
          'tmp/grunt/q/q.js',
          'client/javascripts/app.js',
          'tmp/grunt/templates.js',
          'client/javascripts/controllers/**.js',
          'client/javascripts/directives/**.js',
          'client/javascripts/services/**.js'
        ],
        'dest': 'public/js/app.js'
      }
    },
    sass: {
      dist: {
        options: {
          includePaths: ['bower_components/sass-bootstrap/lib/']
        },
        files: {
          'public/css/app.css': 'client/stylesheets/main.scss'
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
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-angular-templates');

  // Default task(s).
  grunt.registerTask('default', ['bower:install', 'ngtemplates', 'concat', 'sass']);

};