var gulp 		= require('gulp');
global._root 	= __dirname;

var paths 		= require("./gulp/paths");
var plugins 	= require("./gulp/plugins");

//todo
//release 

//breaking out complex tasks
require("./gulp/vendor");
require("./gulp/user");
require("./gulp/icons");

/* SASS */
gulp.task('sass', function() {

   return plugins.sass( paths.styles.sass ) 
   		.on('error', function(err){
			gulp.src( paths.misc.noop )
				.pipe( plugins.notify("your CSS broke idiot!" + err));
	    })
	    .pipe(gulp.dest( paths.styles.css ))
	    .pipe(plugins.livereload());
});

/*INJECT*/
gulp.task('inject', function() {

	var target = gulp.src( paths.misc.index );
	var sources = gulp.src( [
		paths.js.compiled + "vendor.js",
		paths.js.compiled + "bundle.js", 
		paths.styles.css + "**/*" 
	], { read: false } );

	return target.pipe( plugins.inject(sources, { relative: true }) )
	    .pipe( gulp.dest( paths.public ) );
});

/* MAIN TASKS TO CALL FROM CLI */
/* WATCH */
gulp.task('watch', ['browserify_watch'], function() {

	var vendorPaths = [ paths.js.lib + '**/*', paths.js.vendor_config ];

	plugins.livereload.listen();

	gulp.watch( paths.misc.bowerJSON, ['bower_update'] );
	gulp.watch( vendorPaths, ['vendor_scripts'] );
	gulp.watch( paths.styles.sass + '**/*', ['sass'] );
	gulp.watch( paths.assets + "icons/**/*", ['iconfont'] );
});

/* BUILD */
gulp.task('build', function(){
	plugins.runSequence(
		'bower_update',
		[ 'vendor_scripts', 'user_scripts_min', 'sass' ],
		'inject'
	)
});  



