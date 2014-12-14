module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-spritesmith');
	var libs = [
		'js/vendor/jquery-1.11.0.min.js',
		'js/vendor/underscore-min.js',
		'js/vendor/backbone-min.js',
		'js/vendor/infobubble.js',
		'js/vendor/bootstrap.min.js',
		'js/vendor/bootstrap-datepicker.js',
		'js/vendor/jquery.placepicker.js',
		'js/vendor/bootstrap-datetimepicker.js',
		'js/vendor/calendarLanguage/*.js'
	];

	var base = [
		'js/config.js',
		'js/model/unit.js',
		'js/model/media.js',
		'js/model/article.js',
		'js/model/date.js',
		'js/collection/unit-collection.js',
		'js/collection/unit-types-collection.js',
		'js/view/unit-map-view.js',
		'js/view/unit-list-view.js',
		'js/view/article-modal-view.js',
		'js/view/unit-types-select-view.js',
		'js/view/create-article-view.js',
		'js/view/unit-collection-view.js',
		'js/view/date-view.js',
		'js/router.js',
		'js/app.js'
	];

	var timeline = [
		'timeline/js/jquery-ui.min.js',
		'timeline/js/timelineTemplateObj.js',
		'timeline/js/timelineDateUtil.js',
		'timeline/js/timeline.js'
	];

	grunt.initConfig({

		watch: {
			options: {
				livereload: true
			},
			js: {
				files: [base],
				tasks: ['jshint:files', 'uglify']
			},
			timelineJS: {
				files: [timeline],
				tasks: ['jshint:files', 'uglify:buildTL']
			},
            style: {
                files: ['timeline/scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
//            sprites: {
//				files: ['timeline/images/sprite/*.{png,jpg,jpeg}'],
//				task: ['sprite:all'],
//				options: {
//                    spawn: false
//                }
//            }
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			grunt: 'Gruntfile.js',
			files: ['js/*.js', 'Gruntfile.js', 'timeline/js/timeline.js', 'timeline/js/timelineTemplateObj.js', 'timeline/js/timelineDateUtil.js']
		},
		uglify: {
			default: {
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
			buildTL: {
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
		imagemin: {
			static: {
				files: [{
					expand: true,
					cwd: 'timeline/images/',
					src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/img'
                }]
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
		sprite: {
            all: {
                src: ['timeline/images/sprite/*.{png,jpg,jpeg}'],
                destImg: 'public/img/sprite.png',
                destCSS: 'timeline/scss/_sprite.scss',
                imgPath: '../img/sprite.png',
                // OPTIONAL: Specify algorithm (top-down, left-right, diagonal [\ format],
                // alt-diagonal [/ format], binary-tree [best packing])
                // Visual representations can be found below
                algorithm: 'binary-tree',
                // algorithm: 'left-right',
                // OPTIONAL: Specify padding between images
                padding: 5,
                // OPTIONAL: Specify engine (auto, phantomjs, canvas, gm)
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

	grunt.registerTask('compile', ['jshint:files', 'sass', 'uglify', 'watch']);
    grunt.registerTask('watcher', ['jshint:files', 'sass', 'uglify', 'watch']);

	grunt.registerTask('timeline', ['jshint:files', 'uglify:buildTL', 'imagemin', 'sprite', 'sass', 'watch']);
};
