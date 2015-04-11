// Generated on 2014-07-30 using generator-webapp-rjs 0.4.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist',
            tmp: '.tmp'
        },

        less: {
            scripts: {
                files: {
                    '<%= yeoman.dist %>/asset/common/css/main.css': '<%= yeoman.app %>/asset/common/css/main.less'
                }
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: [
                    '<%= yeoman.app %>/asset/{,**/}*.js'
                ],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            mainHtml: {
                files: ['<%= yeoman.app %>/index.html'],
                tasks: ['copy:mainHtml', 'replace:mainHtml'],
                options: {
                    livereload: true
                }
            },
            less: {
                files: ['<%= yeoman.app %>/{,**/}*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{**/}*.html',
                    '<%= yeoman.tmp %>/asset/**/*.css',
                    '<%= yeoman.app %>/images/{,**/}*'
                ]
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    open: 'http://localhost:9000',
                    base: [
                        '<%= yeoman.dist %>',
                        '<%= yeoman.tmp %>',
                        '<%= yeoman.app %>'
                    ],
                    middleware: function(connect, options, middlewares) {
                        var bodyParser = require('body-parser');
                        middlewares.unshift(
                            connect().use(bodyParser.urlencoded({ extended: false })),
                            function(req, res, next) {
                                if (!/\.ajax/.test(req.url)) {
                                    return next();
                                }
                                
                                var path = /\/(\w+)\.ajax/.exec(req.url)[1];
                                var mock = require('./app/mock/' + path);
                                res.end(JSON.stringify(mock.index(req.body)));
                            }
                        );
                        return middlewares;
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '<%= yeoman.tmp %>',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            build: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.tmp %>',
                        '<%= yeoman.dist %>/build.txt',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '<%= yeoman.tmp %>',
            dist: '<%= yeoman.dist %>'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/asset/{,**/}*.js',
                '<%= yeoman.app %>/mock/{,**/}*.js',
                'test/spec/{,*/}*.js',
            ]
        },


        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },



        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.tmp %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= yeoman.tmp %>/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/',
                exclude: []
            }
        },

        requirejs: {
            options: {
                paths: {
                    text: '../dep/requirejs-text/text',
                    jquery: '../dep/jquery/jquery',
                    sammy: '../dep/sammy/lib/sammy',
                    underscore: '../dep/underscore/underscore',
                    'jquery-cookie': '../dep/jquery-cookie/jquery.cookie',
                    'bootstrap-transition': '../dep/commonui/common/transition',
                    'bootstrap-modal': '../dep/commonui/modal/index',
                    'bootstrap-alert': '../dep/commonui/alert/index',
                    'bootstrap-popover': '../dep/commonui/popover/index',
                    'mcc-header': '../dep/mcc-header/dist'
                },
                packages: [{
                    'name': 'mini-event',
                    'location': '../dep/mini-event/1.0.0/src',
                    'main': 'main'
                }, {
                    'name': 'etpl',
                    'location': '../dep/etpl/2.0.8/src',
                    'main': 'main'
                }, {
                    'name': 'er',
                    'location': '../dep/er/3.1.0/src',
                    'main': 'main'
                }, {
                    name: 'avalonFrame',
                    location: '../dep/avalonframe'
                }, {
                    name: 'commonUI',
                    location: '../dep/commonui'
                }, {
                    name: 'validator',
                    location: 'common/validator'
                }, {
                    name: 'visitorForTiexin',
                    location: 'http://topo.baidu.com/js',
                    main: 'visitorForTiexin'
                }],
                keepBuildDir: true,
                optimize: 'none'
            },
            all: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    appDir: '<%= yeoman.tmp %>',
                    baseUrl: './asset/',
                    // `name` and `out` is set by grunt-usemin
                    dir: '<%= yeoman.dist %>',
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true,
                    keepBuildDir: false
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            },
            main: {
                options: {
                    baseUrl: '<%= yeoman.tmp %>/asset/',
                    out: '<%= yeoman.dist %>/asset/main.js',
                    name: 'main',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                }
            }
        },


        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*',
                        '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: '<%= yeoman.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            },
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        replace: {
            asset2:{
                options: {
                    patterns: [{
                        match: /asset/g,
                        replacement: 'asset/2.0'
                    }, {
                        match: /\.\.\/dep/g,
                        replacement: '../../dep'
                    }]
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'index.html',
                        'asset/**/*{.js,.html,.css}',
                        '!asset/main.js'
                    ]
                }],
            },
            mainHtml: {
                options: {
                    patterns: [{
                        match: /<{date}>/g,
                        replacement: +(new Date())
                    }]
                },
                files: {
                    '<%= yeoman.dist %>/index.html': '<%= yeoman.dist %>/index.html'
                }
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%= yeoman.dist %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%= yeoman.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%= yeoman.dist %>/scripts/scripts.js': [
        //                 '<%= yeoman.dist %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            requirejsTmp: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.tmp %>',
                    src: [
                        'asset/**/*.{js,html}',
                        'dep/**/*.{js,html}'
                    ]
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'asset/**/*.{ico,png,jpg,gif}',
                        'index.html',
                        'error.html'
                    ]
                }]
            },
            mainHtml: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: ['index.html']
                }]
            }
        },



        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        }
    });


    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:livereload:keepalive']);
        }

        grunt.task.run([
            'clean:dist',
            'less',
            'copy:mainHtml',
            'replace:mainHtml',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function(target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer'
            ]);
        }

        grunt.task.run([
            'connect:test',
            'mocha'
        ]);
    });

    grunt.registerTask('build', function (target){
        if (target === 'dev') {
            grunt.config('requirejs.options.optimize', 'none');
        } else {
            grunt.config('requirejs.options.optimize', 'uglify');
        }

        grunt.task.run([
            'clean:dist',
            'copy:requirejsTmp',
            //'requirejs:all',
            'requirejs:main',
            'clean:build',
            'less',
            'copy:dist',
            'replace:mainHtml'
        ]);
    });
    
    grunt.registerTask('moveAsset2','移动dist/asset到dist/asset/2.0',function(){
        var fs   = require('fs');
        var dist = grunt.config('yeoman.dist');
        grunt.log.debug(dist);
        fs.renameSync( dist + '/asset', dist + '/2.0');
        fs.mkdirSync( dist + '/asset');
        fs.renameSync( dist + '/2.0', dist + '/asset/2.0');

    });

    grunt.registerTask('asset2','1.0 2.0 asset目录处理',[
        'replace:asset2',
        'moveAsset2'
    ]);
    /*
    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'requirejs',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin'
    ]);*/

    grunt.registerTask('default', [
        // 'newer:jshint',
        // 'test',
        // 'build'
        'build:dev'
    ]);
};