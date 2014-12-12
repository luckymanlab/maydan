module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-spritesmith');
    var libs = [
        'vendor/jquery-1.11.0.min.js',
        'vendor/underscore-min.js',
        'vendor/backbone-min.js',
        'vendor/infobubble.js',
        'vendor/bootstrap.min.js',
        'vendor/bootstrap-datepicker.js',
        'vendor/jquery.placepicker.js',
        'vendor/bootstrap-datetimepicker.js',
        'vendor/calendarLanguage/*.js'
    ];

    var base = [
        'js/config.js',
        'js/model/incident.js',
        'js/model/media.js',
        'js/model/article.js',
        'js/model/date.js',
        'js/collection/incident-collection.js',
        'js/collection/incident-types-collection.js',
        'js/view/incident-map-view.js',
        'js/view/incident-list-view.js',
        'js/view/article-modal-view.js',
        'js/view/incident-types-select-view.js',
        'js/view/create-article-view.js',
        'js/view/incident-collection-view.js',
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
            main: {
                expand: true,
                cwd: 'sass/vendor',
                src: '**',
                dest: 'public/css/vendor',
                flatten: true,
                filter: 'isFile',
            }
        }
    });

    grunt.registerTask('compile', ['jshint:files', 'sass', 'uglify:app', 'copy']);
    grunt.registerTask('watcher', ['jshint:files', 'sass', 'uglify:app', 'watch']);

    grunt.registerTask('timeline', ['jshint:files', 'uglify:timeline', 'sass']);
};
