//TODO: Add CSS Minification
//TODO: Add UglifyJS


module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({

    copy: {

      build: {
        cwd: 'source',
        src: [ '**', '!**/*.styl' ],
        dest: 'build',
        expand: true
      },
    },

    stylus: {

      build: {
        options: {
          linenos: false,
          compress: false
        },

        files: [{
          expand: true,
          cwd: 'source',
          src: [ '**/*.styl' ],
          dest: 'build',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {

      build: {
        expand: true,
        cwd: 'build',
        src: [ '**/*.css' ],
        dest: 'build'
      }
    },

      clean: {
          build: {
              src: [ 'build' ]
          },
      },

    watch: {
      options: {
          livereload: true,
          port: 35729,
      },
      stylesheets: {
        files: 'source/**/*.styl',
        tasks: [ 'stylesheets' ]
      },
      copy: {
        files: [ 'source/**', '!source/**/*.styl' ],
        tasks: [ 'copy' ]
      }
    },

      connect: {
          server: {
              options: {
                  port: 4000,
                  base: 'build',
                  hostname: '*'
              }
          }
      },

  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // define the tasks
  grunt.registerTask(
  'stylesheets',
  'Compile the stylesheets, compress images.',
    [ 'stylus', 'autoprefixer' ]
  );

  grunt.registerTask(
  'build',
  'Compile and overwrite all assets to build directory.',
    [ 'copy', 'stylesheets' ]
  );

  grunt.registerTask(
  'default',
  'Watch files, rebuild on change and run server.',
    [ 'build', 'connect', 'watch' ]
  );
};