module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jst');
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
		'src/js/model/i18n.js',
        'src/js/templates.js',
        'src/js/model/auth.js',
		'src/js/model/incident.js',
		'src/js/model/media.js',
        'src/js/model/admin-panel-menu.js',
        'src/js/model/admin-menu-item.js',
		'src/js/model/article.js',
		'src/js/model/unit.js',
		'src/js/collection/article-list-collection.js',
		'src/js/collection/unit-list-collection.js',
		'src/js/collection/menu-list-collection.js',
		'src/js/view/empty-view.js',
        'src/js/view/waiting-response-view.js',
        'src/js/view/administration-view.js',
        'src/js/view/facebook-auth-view.js',
        'src/js/view/main-app-view.js',
        'src/js/view/article-item-view.js',
        'src/js/view/unit-item-view.js',
        'src/js/view/menu-item-view.js',
        'src/js/view/admin-panel-view.js',
        'src/js/view/menu-list-collection-view.js',
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
        jst: {
            compile: {
                files: {
                    "src/js/templates.js": ["src/templates/**/*.html"]
                }
            }
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
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/src/css/style.css': 'src/sass/style.scss'
                }
            }
        },
        copy: {
            source: {
                expand: true,
                src: ['src/css/**/*', 'src/locale/**/*', 'src/templates/**/*', 'index.html'],
                dest: 'public'
            }
        },
        concat: {
            local: {
                src: ['src/js/configs/local.js', 'public/src/js/main.js' ],
                dest: 'public/src/js/main.js'
            },
            dev: {
                src: ['src/js/configs/dev.js', 'public/src/js/main.js'],
                dest: 'public/src/js/main.js'
            },
            prod: {
                src: ['src/js/configs/prod.js', 'public/src/js/main.js'],
                dest: 'public/src/js/main.js'
            }
        },
        clean: {
            public: {
                src: [ 'public' ]
            }
        }

    });

    grunt.registerTask('compile', ['clean', 'sass','jst:compile', 'jshint:files','uglify:app','concat:local','copy:source']);
    grunt.registerTask('compile:prod', ['clean', 'sass','jst:compile', 'jshint:files','uglify:app','concat:prod','copy:source']);
    grunt.registerTask('compile:dev', ['clean', 'sass','jst:compile', 'jshint:files','uglify:app','concat:dev','copy:source']);



};
