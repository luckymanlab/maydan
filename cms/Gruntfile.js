module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-spritesmith');

	var libs = [
        'src/vendor/jquery-1.11.0.min.js',
        'src/vendor/json2.min.js',
        'src/vendor/underscore-min.js',
        'src/vendor/backbone-min.js',
        'src/vendor/backbone.marionette.min.js',
        'src/vendor/bootstrap.min.js'
    ];

	var base = [
		'src/js/config.js',
		'src/js/model/incident.js',
		'src/js/model/media.js',
		'src/js/model/article.js',
		'src/js/collection/article-list-collection.js',
		'src/js/view/article-item-view.js',
        'src/js/view/article-table-view.js',
        'src/js/view/preview-article-view.js',
		'src/js/app.js'
      

	];



    grunt.initConfig({


        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            grunt: 'Gruntfile.js',
            files: ['src/js/*.js', 'src/js/**/*.js']
        },
        uglify: {
            app: {
                options: {
                    mangle: {
                        except: ['js/**/*.js']
                    },
                    sourceMap: 'public/src/js/main.js.map',
                    sourceMapRoot: '../../js/',
                    sourceMappingURL: 'main.js.map',
                    sourceMapPrefix: 1,
                    semicolons: true,
                    beautify: true
                },
                files: {
                    'public/src/js/main.js': [libs, base]
                }
            },
        },
        copy: {
            source: {
                expand: true,
                src: ['src/css/**/*','index.html'],
                dest: 'public'
            }
        },
        clean: {
            public: {
                src: [ 'public' ]
            }
        },

    });

    grunt.registerTask('compile', ['clean','jshint:files','uglify:app','copy:source']);



};
