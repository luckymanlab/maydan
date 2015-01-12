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
		'vendor/jquery.cookie.js',
		'vendor/underscore-min.js',
		'vendor/backbone-min.js',
        'vendor/backbone.marionette.min.js',
		'vendor/infobubble.js',
		'vendor/bootstrap.min.js',
		'vendor/bootstrap-datepicker.js',
		'vendor/jquery.placepicker.js',
		'vendor/bootstrap-datetimepicker.js',
		'vendor/calendarLanguage/*.js'
	];

	var base = [
		'js/model/unit.js',
		'js/model/media.js',
		'js/model/article.js',
        'js/model/i18n.js',
		'js/collection/unit-collection.js',
		'js/collection/unit-types-collection.js',
		'js/view/article-modal-view.js',
		'js/view/unit-types-select-view.js',
		'js/view/create-article-view.js',
        'js/view/control-panel-view.js',
        'js/view/map-view.js',
		'js/router.js',
		'js/app.js'
	];

    var timeline = [
        'timeline/js/timelineTemplateObj.js',
        'timeline/js/timelineDateUtil.js',
        'timeline/js/timeline.js'
    ];

    grunt.initConfig({

        watch: {
            options: {
                livereload: false
            },
            js: {
                files: [base],
                tasks: ['jshint:files', 'uglify:app']
            },
            style: {
                files: ['sass/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            grunt: 'Gruntfile.js',
            files: ['js/*.js', 'js/**/*.js']
        },
        uglify: {
            app: {
                options: {
                    mangle: {
                        except: ['js/**/*.js']
                    },
                    sourceMap: 'public/js/main.js.map',
                    sourceMapRoot: '../../js/',
                    sourceMappingURL: 'main.js.map',
                    sourceMapPrefix: 1,
                    semicolons: true,
                    beautify: true
                },
                files: {
                    'public/js/main.js': [libs, base]
                }
            },
            timeline: {
                options: {
                    mangle: {
                        except: ['timeline/js/*.js']
                    },
                    sourceMap: 'public/js/timeline.js.map',
                    sourceMapRoot: '../../timeline/js/',
                    sourceMappingURL: 'timeline.js.map',
                    sourceMapPrefix: 2,
                    semicolons: true,
                    // report: 'gzip',
                    beautify: true
                },
                files: {
                    'public/js/timeline.js': [timeline]
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/css/timeline.css': 'timeline/scss/timeline.scss',
                    'public/css/style.css': 'sass/style.scss'
                }
            }
        },
        copy: {
            css: {
                expand: true,
                cwd: 'sass/vendor',
                src: '**',
                dest: 'public/css/vendor',
                flatten: true,
                filter: 'isFile'
            },
            source: {
                expand: true,
                src: ['locale/**/*', 'img/*', 'templates/**/*', 'vendor/**/*', 'index.html'],
                dest: 'public'
            }
        },
        clean: {
            public: {
                src: [ 'public' ]
            }
        },
        concat: {
            local: {
                src: ['js/configs/local.js', 'public/js/main.js'],
                dest: 'public/js/main.js',
            },
            dev: {
                src: ['js/configs/dev.js', 'public/js/main.js'],
                dest: 'public/js/main.js',
            },
            prod: {
                src: ['js/configs/prod.js', 'public/js/main.js'],
                dest: 'public/js/main.js',
            }
        },
        sprite: {
            all: {
                src: ['timeline/images/sprite/*.{png,jpg,jpeg}'],
                destImg: 'public/img/sprite.png',
                destCSS: 'timeline/scss/_sprite.scss',
                imgPath: '../img/sprite.png',
                algorithm: 'binary-tree',
                padding: 5,
                engine: 'gm',
                cssFormat: 'scss',
                cssVarMap: function (sprite) {
                    sprite.name = 'sprite-' + sprite.name;
                },
                engineOpts: {
                    imagemagick: false
                },
                imgOpts: {
                    format: 'png',
                    quality: 100
                },
                cssOpts: {
                    functions: false,
                    cssClass: function (item) {
                        return '.sprite-' + item.name;
                    }
                }
            }
        }
    });

    grunt.registerTask('compile', ['clean','jshint:files', 'sass', 'uglify:app', 'concat:local', 'copy:css', 'copy:source']);
    grunt.registerTask('compile:dev', ['clean','jshint:files', 'sass', 'uglify:app', 'concat:dev', 'copy:css', 'copy:source']);
    grunt.registerTask('compile:prod', ['clean','jshint:files', 'sass', 'uglify:app', 'concat:prod', 'copy:css', 'copy:source']);

    grunt.registerTask('watcher', ['jshint:files', 'sass', 'uglify:app', 'concat:local', 'watch']);

    grunt.registerTask('timeline', ['jshint:files', 'uglify:timeline', 'sass']);
    grunt.registerTask('timeline:sprite', 'sprite');
};
