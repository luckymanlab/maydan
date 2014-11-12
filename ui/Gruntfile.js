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
		'js/vendor/bootstrap-datepicker.js'
	];

	var base = [
		'js/model/incident.js',
		'js/model/article.js',
		'js/model/article2.js',
		'js/model/date.js',
		'js/collection/incident-collection.js',
		'js/view/incident-map-view.js',
		'js/view/incident-list-view.js',
		'js/view/article-modal-view.js',
		'js/view/create-article-view.js',
		'js/view/incident-collection-view.js',
		'js/view/date-view.js',
		'js/router.js',
		'js/app.js'
	];

	var timeLine = [
		'timeLine/js/jquery-ui.min.js',
		'timeLine/js/timeLineTemplateObj.js',
		'timeLine/js/timeLineDateUtil.js',
		'timeLine/js/timeLine.js'
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
			timeLineJS: {
				files: [timeLine],
				tasks: ['jshint:files', 'uglify:buildTL']
			},
            style: {
                files: ['timeLine/scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            sprites: {
				files: ['timeLine/images/sprite/*.{png,jpg,jpeg}'],
				task: ['sprite:all'],
				options: {
                    spawn: false
                }
            }
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			grunt: 'Gruntfile.js',
			files: ['js/*.js', 'Gruntfile.js', 'timeLine/js/timeLine.js', 'timeLine/js/timeLineTemplateObj.js', 'timeLine/js/timeLineDateUtil.js']
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
					report: 'gzip',
					beautify: true
				},
				files: {
					'public/js/main.js': [libs, base]
				}
			},
			buildTL: {
				options: {
					mangle: {
						except: ['timeLine/js/*.js']
					},
					sourceMap: 'public/js/timeLine.js.map',
					sourceMapRoot: '../../timeLine/js/',
					sourceMappingURL: 'timeLine.js.map',
					sourceMapPrefix: 2,
					semicolons: true,
					// report: 'gzip',
					beautify: true
				},
                files: {
					'public/js/timeLine.js': [timeLine]
				}
            }
		},
		imagemin: {
			static: {
				files: [{
					expand: true,
					cwd: 'timeLine/images/',
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
					'public/css/timeLine.css': 'timeLine/scss/timeLine.scss'
                }
            }
        },
		sprite: {
            all: {
                src: ['timeLine/images/sprite/*.{png,jpg,jpeg}'],
                destImg: 'public/img/sprite.png',
                destCSS: 'timeLine/scss/_sprite.scss',
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

	grunt.registerTask('default', ['jshint:files', 'uglify', 'watch']);
	grunt.registerTask('timeLine', ['jshint:files', 'uglify:buildTL', 'imagemin', 'sprite', 'sass', 'watch']);
};
