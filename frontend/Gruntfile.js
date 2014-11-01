module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
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
		'js/model/date.js',
		'js/collection/incident-collection.js',
		'js/view/incident-map-view.js',
		'js/view/incident-list-view.js',
		'js/view/article-modal-view.js',
		'js/view/incident-collection-view.js',
		'js/view/date-view.js',
		'js/app.js'
	];

	grunt.initConfig({

		watch: {
			options: {
				livereload: true
			},
			js: {
				files: [base],
				tasks: ['jshint:files', 'uglify']
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			grunt: 'Gruntfile.js',
			files: ['js/*.js', 'Gruntfile.js']
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
			}
		}
	});

	grunt.registerTask('default', ['jshint:files', 'uglify', 'watch']);
};
