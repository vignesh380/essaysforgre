module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
   clean: {
          docs: ['documentation/']
    },
    jsdoc : {
        dist : {
            src: ['*.js','config/*.js','app/routes/*.js','app/models/*.js'],
            jsdoc: 'node_modules/.bin/jsdoc',
            options: {
                destination: 'documentation',
                configure: 'node_modules/jsdoc/conf.json',
                //template: 'node_modules/ink-docstrap/template'
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-jsdoc');
};