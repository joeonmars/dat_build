var gulp            = require('gulp');
var paths           = require("./paths");
var plugins         = require("./plugins");

gulp.task('iconfont', function(){
  gulp.src([ paths.misc.icons ])
        .pipe(plugins.svgmin())
        .pipe(plugins.iconfont({
          fontName: 'myfont', // required 
          appendCodepoints: true, // recommended option 
          normalize: true
        }))
        .on('codepoints', function(codepoints, options) {
            // CSS templating, e.g. 
            gulp.src( paths.misc.templates + "icons.css" )
            .pipe(plugins.consolidate('lodash', {
                glyphs: codepoints,
                fontName: 'myfont',
                fontPath: '../fonts/',
                className: 's'
            }))
            .pipe(plugins.rename('_icons.scss'))
            .pipe(gulp.dest( paths.styles.sass ));
        })
        .pipe(gulp.dest( paths.styles.fonts ));
});