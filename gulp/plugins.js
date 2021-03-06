//load gulp plugins: they become with plugins.NAME
var plugins = require('gulp-load-plugins')({
	rename: {
		'gulp-ruby-sass': 'sass'
	}
});

//other non gulp- plugins
plugins.browserify 		= require('browserify');
plugins.source 			= require('vinyl-source-stream');
plugins.mainBowerFiles 	= require('main-bower-files');
plugins.del 			= require('del');
plugins.underscore		= require('underscore');
plugins.runSequence		= require('run-sequence');
plugins.watchify 		= require('watchify');

module.exports = plugins;